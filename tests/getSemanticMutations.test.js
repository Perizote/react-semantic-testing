import React, { Component } from 'react'
import { mount, unmount } from '../src'

describe('getSemanticMutations', () => {
  const initialText = 'an initial text'
  const changedText = 'a changed text'

  class Mutator extends Component {
    state = {
      initialText,
      hasAppeared: false,
      hasDisappeared: false,
    }

    makeItChangeAsync = () => setTimeout(() => this.setState({ initialText: changedText }))
    makeItAppearAsync = () => setTimeout(() => this.setState({ hasAppeared: true }))
    makeItDisappearAsync = () => setTimeout(() => this.setState({ hasDisappeared: true }))
    render = () => {
      return (
        <div>
          { !this.state.hasDisappeared && <span>{ this.state.initialText }</span> }
          <button onClick={ this.makeItChangeAsync }>make it change async</button>
          <button onClick={ this.makeItAppearAsync }>make it appear async</button>
          <button onClick={ this.makeItDisappearAsync }>make it disappear async</button>
          { this.state.hasAppeared && <p>another node</p> }
        </div>
      )
    }
  }
  let mutator

  beforeEach(() => {
    mutator = mount(<Mutator />)
  })

  afterEach(unmount)

  async function testThatObserverThrowsError(observerName, errorMessage) {
    jest.useFakeTimers()
    const observer = mutator[observerName]()

    jest.advanceTimersByTime(3100)

    await expect(observer).rejects.toBe(errorMessage)
    jest.useRealTimers()
  }

  it('should observe changes', () => {
    expect(mutator).toHaveText(initialText)

    mutator.getByText('make it change async').click()

    return expect(mutator.waitUntilItChanges()).resolves.toHaveText(changedText)
  })

  it('should throw an error when nothing changes', () => {
    testThatObserverThrowsError('waitUntilItChanges', 'Timeout waiting for node to change')
  })

  it('should observe new renders', () => {
    expect(mutator.getByText('another node')).not.toBeRendered()

    mutator.getByText('make it appear async').click()

    return expect(mutator.getByText('another node').waitUntilItAppears()).resolves.toBeRendered()
  })

  it('should throw an error when nothing new is rendered', () => {
    testThatObserverThrowsError('waitUntilItAppears', 'Timeout waiting for node to render')
  })

  it('should observe disappearances', () => {
    expect(mutator.getByText(initialText)).toBeRendered()

    mutator.getByText('make it disappear async').click()

    return expect(mutator.getByText(initialText).waitUntilItDisappears()).resolves.not.toBeRendered()
  })

  it('should throw an error when nothing disappears', () => {
    testThatObserverThrowsError('waitUntilItDisappears', 'Timeout waiting for node to disappear')
  })
})