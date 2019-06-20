const ACTION_TYPES = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

const add = () => ({ type: ACTION_TYPES.ADD })
const remove = () => ({ type: ACTION_TYPES.REMOVE })

function reducer(state = { products: 10 }, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD:
      return {
        products: state.products + 1,
      }

    case ACTION_TYPES.REMOVE:
      return {
        products: state.products - 1,
      }

    default:
      return state
  }
}

export { add, remove, reducer }