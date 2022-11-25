export const undestroyedItems = items =>
  items.filter(item => !item.hasOwnProperty('_destroy'))

export const removeItem = (items, id) => {
  const toRemove = items.find(item => item.id === id)
  const itemWithDestroy = { ...toRemove, _destroy: true }

  const unmodifiedItems = items.filter(item => item.id !== id)

  return [...unmodifiedItems, itemWithDestroy]
}

export const removeNewItem = (items, indexToRemove) =>
  items.filter((_, index) => index !== indexToRemove)
