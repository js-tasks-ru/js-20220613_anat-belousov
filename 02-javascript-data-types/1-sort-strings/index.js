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
    newArr.sort((a, b) => compareString(a, b));
    break;
  case 'desc':
    newArr.sort((b, a) => compareString(a, b));
    break;
  }
  return newArr;
}
function compareString(a, b) {
  return a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' });
}