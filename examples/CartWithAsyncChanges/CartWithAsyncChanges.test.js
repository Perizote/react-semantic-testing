import React from 'react'

import { CartWithAsyncChanges as Cart } from './CartWithAsyncChanges'
import { mount } from '../../index'

describe('cart with async changes', () => {
  let cart

  beforeEach(() => {
    cart = mount(<Cart />)
  })

  afterEach(() => {
    cart.unmount()
  })

  it('can have default products', async () => {
    const productsBeforeWaiting = cart.getByDataTest('products').getText()
    expect(productsBeforeWaiting).toBe('0')

    const productsAfterWaiting = (await cart.getByDataTest('products').willChange()).getText()
    expect(productsAfterWaiting).toBe('10')
  })

  it('can add a product', async () => {
    (await cart.willChange()).getByDataTest('add').click()

    expect(cart.getByDataTest('products').getText()).toBe('11')
  })

  it('can remove a product', async () => {
    (await cart.willChange()).getByDataTest('remove').click()

    expect(cart.getByDataTest('products').getText()).toBe('9')
  })
})