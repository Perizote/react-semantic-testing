import React from 'react'

import { AppWithRouter } from './AppWithRouter'
import { mountWithRouter, unmount } from '../mounting'
import { withTools } from 'dom-test-tools'

describe('app with router', () => {
  afterEach(unmount)

  it('should be at home page', () => {
    const app = mountWithRouter(<AppWithRouter />)

    expect(app).toHaveText(/wellcome to shopping online/i)
  })

  it('should navigate to my products page', () => {
    const app = mountWithRouter(<AppWithRouter />)

    app.getByText(/my products/i).click()

    expect(app).toHaveText(/This is the list of products you usually buy/i)
  })

  it('should redirect to the not found page when the route is unknown', () => {
    const app = mountWithRouter(<AppWithRouter />, { route: 'a-not-found-route' })

    expect(app).toHaveText(/404 page not found/i)
  })

  it('should ', () => {
    const route = 'a-route'
    const app = mountWithRouter(<AppWithRouter />, { route })

    expect(app.getByDataTest('with-router')).toHaveText(`You are now at ${ route }`)
  })
})