const PASSWORD = '$JohnPassword'

export function isLockPage(pathname: string) {
  return /^\/projects\/[^/]+\/locked$/.test(pathname)
}

export function isCorrectCode(code: string) {
  return code === PASSWORD
}
