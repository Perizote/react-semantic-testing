import React from 'react'
import { mount, unmount } from 'react-semantic-testing'

import { CartWithAsyncChanges as Cart } from './CartWithAsyncChanges'

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
    (await cart.waitUntilItChanges()).getByText('+').click()

    expect(cart.getByDataTest('products')).toHaveText('11')
  })

  it('can remove a product', async () => {
    (await cart.waitUntilItChanges()).getByText('-').click()

    expect(cart.getByDataTest('products')).toHaveText('9')
  })
})