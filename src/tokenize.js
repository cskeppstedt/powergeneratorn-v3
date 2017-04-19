module.exports = (input) => {
  if (!input) {
    return []
  }

  return input
    .split(/\s/)
    .filter(word => !!word)
    .map(word => word.trim())
}
