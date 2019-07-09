import React from 'react'

import { ActEffect, ActEvent, ActTimer, ActPromise, ActAsyncAwait } from './Act'
import { mount, unmount } from '../mounting'

describe('act', () => {
  afterEach(unmount)

  it('should work with effects', () => {
    const actEffect = mount(<ActEffect />)

    expect(actEffect).toHaveText('1')
  })

  it('should work with events', () => {
    const actEvent = mount(<ActEvent />)

    actEvent.getByDataTest('add').click()

    expect(actEvent).toHaveText('1')
  })

  it('should work with timers', () => {
    const actTimer = mount(<ActTimer />)

    expect(actTimer).toHaveText('0')
    return expect(actTimer.waitUntilItChanges()).resolves.toHaveText('1')
  })

  it('should work with promises', () => {
    const actPromise = mount(<ActPromise />)

    expect(actPromise).toHaveText('0')
    return expect(actPromise.waitUntilItChanges()).resolves.toHaveText('1')
  })

  it('should work with async/await', () => {
    const actAsyncAwait = mount(<ActAsyncAwait />)

    expect(actAsyncAwait).toHaveText('0')
    return expect(actAsyncAwait.waitUntilItChanges()).resolves.toHaveText('1')
  })
})