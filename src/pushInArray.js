/* eslint-env jest */
const qim = require('qim')
const { default: immer, setAutoFreeze } = require('immer')
const Immutable = require('immutable')
const Seamless = require('seamless-immutable/seamless-immutable.production.min')
const { push: push1 } = require('immutadot1')
const { push: push2 } = require('immutadot2')
const { push: push3 } = require('immutadot3')

function pushInArray(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested: {
      prop: [1, 2, 3],
      otherProp: 'aze',
    },
    other: { prop: 'baz' },
  }

  // Prepare immutable state
  const immutableState = Immutable.fromJS(baseState)

  // Prepare seamless state
  const seamlessState = Seamless.from(baseState)

  // Disable immer auto freeze
  setAutoFreeze(false)

  const benchmark = benchmarkSuite.createBenchmark(
    'Push values in array',
    (key, result) => {
      if (key === 'immutable') return
      expect(result).toEqual({
        nested: {
          prop: [1, 2, 3, 4, 5, 6],
          otherProp: 'aze',
        },
        other: { prop: 'baz' },
      })
    },
  )

  it('es2015', () => {
    benchmark('es2015', () => {
      return {
        ...baseState,
        nested: {
          ...baseState.nested,
          prop: [...baseState.nested.prop, 4, 5, 6],
        },
      }
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      immutableState.updateIn(['nested', 'prop'], prop => [...prop, 4, 5, 6])
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.updateIn(seamlessState, ['nested', 'prop'], prop => [...prop, 4, 5, 6])
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      return immer(baseState, draft => {
        draft.nested.prop.push(4, 5, 6)
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      return qim.set(['nested', 'prop', qim.$end], [4, 5, 6], baseState)
    })
  })

  it('immutadot 1', () => {
    benchmark('immutadot1', () => {
      return push1(baseState, 'nested.prop', 4, 5, 6)
    })
  })

  it('immutadot 2', () => {
    benchmark('immutadot2', () => {
      return push2(baseState, 'nested.prop', 4, 5, 6)
    })
  })

  it('immutadot 3', () => {
    benchmark('immutadot3', () => {
      return push3`${baseState}.nested.prop`(4, 5, 6)
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      return qim.set(['nested', 'prop', qim.$end])([4, 5, 6])(baseState)
    })
  })

  it('immutadot 2 curried', () => {
    benchmark('immutadot2-curried', () => {
      return push2('nested.prop')(4, 5, 6)(baseState)
    })
  })

  it('immutadot 3 curried', () => {
    benchmark('immutadot3-curried', () => {
      return push3`.nested.prop`(4, 5, 6)(baseState)
    })
  })
}

module.exports = {
  pushInArray,
}
