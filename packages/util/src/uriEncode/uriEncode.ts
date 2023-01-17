function getPairs(obj: Record<string, unknown>, keys: unknown[] = []) {
  return Object.entries(obj).reduce<unknown[]>((pairs, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      pairs.push(...getPairs(value as Record<string, unknown>, [...keys, key]))
    } else {
      pairs.push([[...keys, key], value])
    }
    return pairs
  }, [])
}

export function uriEncode(obj: Record<string, unknown>) {
  const encodedUri = getPairs(obj)
    .map(
      ([[key0, ...keysRest], value]: any) =>
        `${key0}${keysRest.map((a: unknown) => `[${a}]`).join('')}=${value}`,
    )
    .join('&')

  return encodedUri
}

export default uriEncode
