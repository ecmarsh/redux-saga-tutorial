import test from 'tape'

import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay } from './sagas'

test('incrementAsync Saga test', assert => {
  const gen = incrementAsync()

  // 1. gen.next() => { done: false, value: <result of calling delay(1000)> }
  // 2. gen.next() => { done: false, value: <result of calling put({type: 'INCREMENT'})> }
  // 3. gen.next() => { done: true, value: undefined }

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
})