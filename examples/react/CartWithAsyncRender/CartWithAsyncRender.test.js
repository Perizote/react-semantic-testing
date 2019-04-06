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
    return expect(cart.getByText('loading').willDisappear()).resolves.not.toBeRendered()
  })

  it('can have default products', () => {
    return expect(cart.getByDataTest('products').willRender()).resolves.toHaveText('10')
  })

  it('can add a product', async () => {
    (await cart.getByDataTest('add').willRender()).click()

    expect(cart.getByDataTest('products')).toHaveText('11')
  })

  it('can remove a product', async () => {
    (await cart.getByDataTest('remove').willRender()).click()

    expect(cart.getByDataTest('products')).toHaveText('9')
  })
})