
export const extractContent = (element) => element.text().split(' ')[1]
export const extractContentAsNumber = (element) => parseInt(element.text().split(' ')[1])