import React, { useState } from 'react'

function useProducts(initialProducts) {
  const [ products, setProducts ] = useState(initialProducts)

  const add = () => setProducts(products + 1)
  const remove = () => setProducts(products - 1)

  return [ products, add, remove ]
}

const CartWithHooks = () => {
  const [ products, add, remove ] = useProducts(10)

  return (
    <div data-test="cart">
      <button data-test="remove" onClick={ remove }>-</button>
      <span data-test="products">{ products }</span>
      <button data-test="add" onClick={ add }>+</button>
    </div>
  )
}

export { CartWithHooks }