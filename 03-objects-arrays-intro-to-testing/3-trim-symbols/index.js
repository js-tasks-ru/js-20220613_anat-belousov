/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }
  let lastChar = '';
  let numChar = 0;
  const result = string
    .split('')
    .filter(currChar => {
      numChar = lastChar === currChar ? numChar += 1 : 1;
      lastChar = currChar;
      return numChar <= size;
    })
    .join('');
  return result;
}