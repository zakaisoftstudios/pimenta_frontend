const removeEmpty = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && Array.isArray(val) && val.length === 0) {
      delete obj[key]
    } else if (val && typeof val === 'object') {
      removeEmpty(val)
    } else if (val == null || val == undefined || val === '') delete obj[key]
  })

const extractValues = objectArr =>
  objectArr ? objectArr.map(object => object.value) : null

const extractIds = objectArr =>
  objectArr ? objectArr.map(object => object.id) : null

const extractValue = object => (object ? object.value : null)

export { removeEmpty, extractValues, extractIds, extractValue }
