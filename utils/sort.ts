export const sortAscendingNumber = <T extends Record<K, any>, K extends string>
(itemArray: T[],key?: K) => {
  if (!itemArray || !key) {
    return null
  }
  return [ ...itemArray ].sort((a, b) => a[key] - b[key])
}

export const sortDescendingNumber = <T extends Record<K, any>, K extends string>
(itemArray: T[], key?: K) => {
  if (!itemArray || !key) {
    return null
  }
  return [ ...itemArray ].sort((a, b) => b[key] - a[key])
}
