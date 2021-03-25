/* eslint-env jest */
const qim = require('qim')
const { default: immer, setAutoFreeze } = require('immer')
const Immutable = require('immutable')
const Seamless = require('seamless-immutable/seamless-immutable.production.min')
const { set: set1 } = require('immutadot1')
const { set: set2 } = require('immutadot2')
const { set: set3 } = require('immutadot3')

function updateTodos(benchmarkSuite, title, listSize, modifySize) {
  // Prepare base state
  const baseState = []
  for (let i = 0; i < listSize; i++) {
    baseState.push({
      todo: `todo_${i}`,
      done: false,
      someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    })
  }

  // Prepare immutable state
  const todoRecord = Immutable.Record({
    todo: '',
    done: false,
    someThingCompletelyIrrelevant: [],
  })
  const immutableState = Immutable.List(baseState.map(todo => todoRecord(todo)))

  // Prepare seamless state
  const seamlessState = Seamless.from(baseState)

  // Disable immer auto freeze
  setAutoFreeze(false)

  const unmodifiedSize = listSize - modifySize
  const randomBounds = () => {
    const start = Math.floor(Math.random() * unmodifiedSize)
    return [start, start + modifySize]
  }

  const benchmark = benchmarkSuite.createBenchmark(
    title,
    (key, result) => {
      if (key === 'immutable') return
      let trues = 0, falses = 0
      result.forEach(todo => todo.done ? trues++ : falses++)
      expect(trues).toBe(modifySize)
      expect(falses).toBe(unmodifiedSize)
      trues = falses = 0
      baseState.forEach(todo => todo.done ? trues++ : falses++)
      expect(trues).toBe(0)
      expect(falses).toBe(listSize)
    },
  )

  it('es2015', function es2015() {
    benchmark('es2015', () => {
      const [start, end] = randomBounds()
      const stateCopy = [...baseState]
      for (let i = start; i < end; i++) {
        stateCopy[i] = { ...stateCopy[i], done: true }
      }
      return stateCopy
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      const [start, end] = randomBounds()
      immutableState.withMutations(state => {
        for (let i = start; i < end; i++) state.setIn([i, 'done'], true)
      })
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      const [start, end] = randomBounds()
      return seamlessState
        .slice(0, start)
        .concat(
          seamlessState.slice(start, end)
            .map(todo => todo.set('done', true)),
          seamlessState.slice(end),
        )
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      const [start, end] = randomBounds()
      return immer(baseState, draft => {
        for (let i = start; i < end; i++) draft[i].done = true
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      const [start, end] = randomBounds()
      return qim.set([qim.$slice(start, end), qim.$each, 'done'], true, baseState)
    })
  })

  it('immutadot 1', () => {
    benchmark('immutadot1', () => {
      const [start, end] = randomBounds()
      return set1(baseState, `[${start}:${end}].done`, true)
    })
  })

  it('immutadot 2', function immutadot2() {
    benchmark('immutadot2', () => {
      const [start, end] = randomBounds()
      return set2(baseState, `[${start}:${end}].done`, true)
    })
  })

  it('immutadot 3', () => {
    benchmark('immutadot3', () => {
      const [start, end] = randomBounds()
      return set3`${baseState}[${start}:${end}].done`(true)
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      const [start, end] = randomBounds()
      return qim.set([qim.$slice(start, end), qim.$each, 'done'])(true)(baseState)
    })
  })

  it('immutadot 2 curried', () => {
    benchmark('immutadot2-curried', () => {
      const [start, end] = randomBounds()
      return set2(`[${start}:${end}].done`)(true)(baseState)
    })
  })

  it('immutadot 3 curried', () => {
    benchmark('immutadot3-curried', () => {
      const [start, end] = randomBounds()
      return set3`[${start}:${end}].done`(true)(baseState)
    })
  })
}

module.exports = {
  updateTodos,
}
