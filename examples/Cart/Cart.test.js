import React from 'react'

import { Cart } from './Cart'
import { mount } from '../mount'

describe('cart with async render', () => {
  let cart

  beforeEach(() => {
    cart = mount(<Cart />)
  })

  afterEach(() => {
    cart.unmount()
  })

  it('can have default products', () => {
    expect(cart.getByDataTest('products').getText()).toBe('10')
  })

  it('can add a product', () => {
    cart.getByDataTest('add').click()

    expect(cart.getByDataTest('products').getText()).toBe('11')
  })

  it('can remove a product', () => {
    cart.getByDataTest('remove').click()

    expect(cart.getByDataTest('products').getText()).toBe('9')
  })
})