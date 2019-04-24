const compareText = (text, textToCompare) => {
  if (typeof text === 'string' || typeof text === 'number') {
    return text === textToCompare
  }

  return text.test(textToCompare)
}

export { compareText }