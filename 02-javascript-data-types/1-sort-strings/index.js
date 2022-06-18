/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];
  switch (param) {
  case 'asc':
    newArr.sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' }));
    break;
  case 'desc':
    newArr.sort((b, a) => a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' }));
    break;
  }
  return newArr;
}
