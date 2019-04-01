const compareText = (text, textToCompare) => {
  if (typeof text === 'string') {
    return text === textToCompare
  }

  return text.test(textToCompare)
}

export { compareText }