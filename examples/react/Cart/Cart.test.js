import React from 'react'

import { Cart } from './Cart'
import { mount, unmount } from '../mounting'

describe('cart', () => {
  let cart

  beforeEach(() => {
    cart = mount(<Cart />)
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