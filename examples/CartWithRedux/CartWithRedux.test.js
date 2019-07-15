import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mount, unmount } from 'react-semantic-testing'

import { CartWithRedux } from './CartWithRedux'
import { reducer } from './reduxStuff'

function mountWithRedux(component, { initialState, reducer } = {}) {
  const store = createStore(reducer, initialState)

  return mount(
    <Provider store={ store }>
      { component }
    </Provider>
  )
}

describe('cart with redux', () => {
  let cart

  beforeEach(() => {
    cart = mountWithRedux(<CartWithRedux />, { reducer })
  })

  afterEach(unmount)

  it('can have default products', () => {
    expect(cart.getByDataTest('products')).toHaveText('10')
  })

  it('can add a product', () => {
    cart.getByText('+').click()

    expect(cart.getByDataTest('products')).toHaveText('11')
  })

  it('can remove a product', () => {
    cart.getByText('-').click()

    expect(cart.getByDataTest('products')).toHaveText('9')
  })

  it('can have custom products', () => {
    const cartWithCustomProducts = mountWithRedux(
      <CartWithRedux />,
      { initialState: { products: 5 }, reducer },
    )

    expect(cartWithCustomProducts.getByDataTest('products')).toHaveText('5')
  })
})