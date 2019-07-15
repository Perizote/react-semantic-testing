import React from 'react'

import { CartWithHooks } from './CartWithHooks'
import { mount, unmount } from 'react-semantic-testing'

describe('cart with hooks', () => {
  let cart

  beforeEach(() => {
    cart = mount(<CartWithHooks />)
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
})