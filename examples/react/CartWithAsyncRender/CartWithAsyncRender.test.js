import React from 'react'

import { CartWithAsyncRender as Cart } from './CartWithAsyncRender'
import { mount } from '../mount'

describe('cart with async render', () => {
  let cart

  beforeEach(() => {
    cart = mount(<Cart />)
  })

  afterEach(() => {
    cart.unmount()
  })

  it('can have default products', async () => {
    expect((await cart.getByDataTest('products').willRender()).getText()).toBe('10')
  })

  it('can add a product', async () => {
    (await cart.getByDataTest('add').willRender()).click()

    expect(cart.getByDataTest('products').getText()).toBe('11')
  })

  it('can remove a product', async () => {
    (await cart.getByDataTest('remove').willRender()).click()

    expect(cart.getByDataTest('products').getText()).toBe('9')
  })
})