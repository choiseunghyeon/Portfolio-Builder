export const isEmpty = value => {
  if (typeof value === "undefined") return true
  else if (value === null) return true
  else if (Array.isArray(value) && value.length === 0) return true

  return false
}
