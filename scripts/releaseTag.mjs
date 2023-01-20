import childProcess from 'child_process'
import fse from 'fs-extra'
import path from 'path'
import { promisify } from 'util'
import yargs from 'yargs'
import { getWorkspaceRoot } from './util.mjs'

/**
 * Only directly call it with side-effect free commands.
 * Otherwise use the `exec` that's considering whether the context is supposed to be "dry" i.e. have no side-effects.
 */
const execActual = promisify(childProcess.exec)
/**
 * @param {string} command
 * @param {unknown} [options]
 */
function execDry(command, options) {
  // eslint-disable-next-line no-console
  console.log(`exec(\`${command}\`, ${JSON.stringify(options)})`)
}

/**
 * Find the remote pointing to interadsrepo/interads.
 *
 * Conventionally this should be named `upstream` but some collaborators might've used a different naming scheme.
 */
async function findRemote() {
  const { stdout } = await execActual(['git', 'remote', '-v'].join(' '))
  const remoteLines = stdout.trim().split(/\r?\n/)

  return remoteLines
    .map((remoteLine) => {
      const [name, url, method] = remoteLine.split(/\s/)
      return { name, url, method }
    })
    .find((remote) => {
      // test: https://regex101.com/r/fBVJUX/1
      // matching:
      // - https://github.com/interadsrepo/interads
      // - git@github.com:interadsrepo/interads.git
      // but not:
      // - git@github.com:interadsrepo/interads.git
      return /interadsrepo\/interads(\.git)?$/.test(remote.url) && remote.method === '(push)'
    })
}

async function main(argv) {
  const { dryRun } = argv

  const exec = dryRun ? execDry : execActual

  const rootWorkspace = getWorkspaceRoot()
  const rootWorkspaceManifest = await fse.readJSON(path.join(rootWorkspace, 'package.json'))

  const tag = `v${rootWorkspaceManifest.version}`
  const message = `Version ${rootWorkspaceManifest.version}`

  await exec(['git', 'tag', '-a', tag, '-m', `"${message}"`].join(' '))
  // eslint-disable-next-line no-console -- verbose logging
  console.log(`Created tag '${tag}'. To remove enter 'git tag -d ${tag}'`)

  const interadsOrgRemote = await findRemote()
  if (interadsOrgRemote === undefined) {
    throw new TypeError(
      'Unable to find the upstream remote. It should be a remote pointing to "interadsrepo/interads". ' +
        'Did you forget to add it via `git remote add upstream git@github.com:interadsrepo/interads.git`? ' +
        'If you think this is a bug please include `git remote -v` in your report.',
    )
  }

  await exec(['git', 'push', interadsOrgRemote.name, tag].join(' '))

  // eslint-disable-next-line no-console -- verbose logging
  console.log(
    `Pushed tag '${tag}' to . This should not be reversed. In case of emergency enter 'git push --delete ${interadsOrgRemote.name} ${tag}' to remove.`,
  )
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    description: 'Tags the current release and pushes these changes to interadsrepo/interads.',
    builder: (command) => {
      return command.option('dryRun', {
        default: false,
        describe: 'If true, the script will not have any permanent side-effects.',
        type: 'boolean',
      })
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse()
