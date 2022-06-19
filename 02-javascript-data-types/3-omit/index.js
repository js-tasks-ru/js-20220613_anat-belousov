/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  fields.forEach(item => {
    deepDeleteProps(item, newObj);
  });
  return newObj;
};
function deepDeleteProps (prop, obj) {
  if (obj.hasOwnProperty(prop)) {
    delete obj[prop];
    return;
  } 
  if ((typeof prop === 'object' || typeof prop === 'function') && prop !== null) {
    deepDeleteProps(prop, obj.prototype);
  }
}