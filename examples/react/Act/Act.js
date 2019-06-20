import React, { useState, useEffect } from 'react'

const ActEffect = () => {
  const [ ctr, setCtr ] = useState(0)

  useEffect(() => {
    setCtr(1)
  }, [])

  return ctr
}

const ActEvent = () => {
  const [ counter, setCounter ] = useState(0)

  return (
    <button data-test="add" onClick={ () => setCounter(counter => counter + 1) }>
      { counter }
    </button>
  )
}

const ActTimer = () => {
  const [ ctr, setCtr ] = useState(0)

  useEffect(() => {
    setTimeout(() => setCtr(1), 10)
  }, [])

  return ctr
}

const ActPromise = () => {
  const [ data, setData ] = useState(0)

  useEffect(() => {
    new Promise(resolve => {
      setTimeout(() => setData(1), 10)
    })
  }, [])

  return data
}

const ActAsyncAwait = () => {
  const [ data, setData ] = useState(0)

  async function somethingAsync() {
    let response = await new Promise(resolve => resolve(1))
    setData(response)
  }

  useEffect(() => {
    somethingAsync()
  }, [])

  return data
}

export { ActEffect, ActEvent, ActTimer, ActPromise, ActAsyncAwait }