/* eslint-env jest */
const qim = require('qim')
const { default: immer, setAutoFreeze } = require('immer')
const Immutable = require('immutable')
const Seamless = require('seamless-immutable/seamless-immutable.production.min')
const { set: set1 } = require('immutadot1')
const { set: set2 } = require('immutadot2')
const { set: set3 } = require('immutadot3')

function setProp(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested: {
      prop: 'foo',
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
    'Set a property',
    (key, result) => {
      if (key === 'immutable') return
      expect(result).toEqual({
        nested: {
          prop: 'bar',
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
          prop: 'bar',
        },
      }
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      immutableState.setIn(['nested', 'prop'], 'bar')
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.setIn(seamlessState, ['nested', 'prop'], 'bar')
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      return immer(baseState, draft => {
        draft.nested.prop = 'bar'
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      return qim.set(['nested', 'prop'], 'bar', baseState)
    })
  })

  it('immutadot 1', () => {
    benchmark('immutadot1', () => {
      return set1(baseState, 'nested.prop', 'bar')
    })
  })

  it('immutadot 2', () => {
    benchmark('immutadot2', () => {
      return set2(baseState, 'nested.prop', 'bar')
    })
  })

  it('immutadot 3', () => {
    benchmark('immutadot3', () => {
      return set3`${baseState}.nested.prop`('bar')
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      return qim.set(['nested', 'prop'])('bar')(baseState)
    })
  })

  it('immutadot 2 curried', () => {
    benchmark('immutadot2-curried', () => {
      return set2('nested.prop')('bar')(baseState)
    })
  })

  it('immutadot 3 curried', () => {
    benchmark('immutadot3-curried', () => {
      return set3`.nested.prop`('bar')(baseState)
    })
  })
}

module.exports = {
  setProp,
}
