import React from 'react'

import { CartWithAsyncState as Cart } from './CartWithAsyncState'
import { mount } from '../index'

describe('cart', () => {
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
    expect((await cart.getByDataTest('products').willChange()).getText()).toBe('10')
    cart.getByDataTest('add').click()

    expect(cart.getByDataTest('products').getText()).toBe('11')
  })

  it('can remove a product', async () => {
    (await cart.getByDataTest('remove').willRender()).click()

    expect(cart.getByDataTest('products').getText()).toBe('9')
  })
})