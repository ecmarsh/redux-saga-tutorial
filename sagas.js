import { put, takeEvery, all } from 'redux-saga/effects'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

// "Worker saga" to perform the async increment task
function* incrementAsync() {
  yield delay(1000) // => Promise that blocks generator
  // Sagas equivalent of callback, runs after promise (or whatever async action) is resolved
  // Note `put` returns an object that instructs Saga to dispatch the INCREMENT action
  yield put({ type: 'INCREMENT' })
}

// "Watcher saga" spawn new incrementAsync task on each INCREMENT_ASYNC action
function* watchIncrementAsync() {
  // takeEvery() helper listens for dispatched actions and runs the second arg when receives
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// Only export a rootSaga
// acts as single entry point to start all Sagas at once
// aka all sagas are started in parallel
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
