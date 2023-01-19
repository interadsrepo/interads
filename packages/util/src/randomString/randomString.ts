export default function randomString(length = 5, string = ''): string {
  string += Math.random().toString(20).substring(2, length)
  if (string.length > length) {
    return string.slice(0, length)
  }
  return randomString(length, string)
}
