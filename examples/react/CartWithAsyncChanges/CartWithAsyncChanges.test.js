import React from 'react'

import { CartWithAsyncChanges as Cart } from './CartWithAsyncChanges'
import { mount, unmount } from '../mounting'

describe('cart with async changes', () => {
  let cart

  beforeEach(() => {
    cart = mount(<Cart />)
  })

  afterEach(unmount)

  it('can have default products', () => {
    expect(cart.getByDataTest('products')).toHaveText('0')

    return expect(cart.getByDataTest('products').waitUntilItChanges()).resolves.toHaveText('10')
  })

  it('can add a product', async () => {
    (await cart.waitUntilItChanges()).getByDataTest('add').click()

    expect(cart.getByDataTest('products')).toHaveText('11')
  })

  it('can remove a product', async () => {
    (await cart.waitUntilItChanges()).getByDataTest('remove').click()

    expect(cart.getByDataTest('products')).toHaveText('9')
  })
})