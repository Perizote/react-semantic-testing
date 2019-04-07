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

  it('should stop loading as soon as it gets the products', () => {
    expect(cart.getByText('loading')).toBeRendered()
    return expect(cart.getByText('loading').waitUntilItDisappears()).resolves.not.toBeRendered()
  })

  it('can have default products', () => {
    return expect(cart.getByDataTest('products').waitUntilItAppears()).resolves.toHaveText('10')
  })

  it('can add a product', async () => {
    (await cart.getByDataTest('add').waitUntilItAppears()).click()

    expect(cart.getByDataTest('products')).toHaveText('11')
  })

  it('can remove a product', async () => {
    (await cart.getByDataTest('remove').waitUntilItAppears()).click()

    expect(cart.getByDataTest('products')).toHaveText('9')
  })
})