import React, { useState, Fragment } from 'react'

function useProducts(initialProducts) {
  const [ products, setProducts ] = useState(initialProducts)

  const add = () => setProducts(products => products + 1)
  const remove = () => setProducts(products => products - 1)

  return [ products, add, remove ]
}

const CartWithHooks = () => {
  const [ products, add, remove ] = useProducts(10)

  return (
    <Fragment>
      <button onClick={ remove }>-</button>
      <span data-test="products">{ products }</span>
      <button onClick={ add }>+</button>
    </Fragment>
  )
}

export { CartWithHooks }