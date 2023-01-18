import path from "path";
import url from 'url'

// eslint-disable-next-line import/prefer-default-export
export function getWorkspaceRoot() {
  const currentDir = url.fileURLToPath(new URL('.', import.meta.url))
  const workspace = path.resolve(currentDir, '..')
  return workspace
}