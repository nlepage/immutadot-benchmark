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

  benchmarkSuite.add(
    'Set a property',
    [
      ['es2015', () => ({
        ...baseState,
        nested: {
          ...baseState.nested,
          prop: 'bar',
        },
      })],
      ['immutable', () => {
        immutableState.setIn(['nested', 'prop'], 'bar')
      }],
      ['seamless', () => Seamless.setIn(seamlessState, ['nested', 'prop'], 'bar')],
      ['immer', () => immer(baseState, draft => {
        draft.nested.prop = 'bar'
      })],
      ['qim', () => qim.set(['nested', 'prop'], 'bar', baseState)],
      ['immutadot1', () => set1(baseState, 'nested.prop', 'bar')],
      ['immutadot2', () => set2(baseState, 'nested.prop', 'bar')],
      ['immutadot3', () => set3`${baseState}.nested.prop`('bar')],
      ['qim-curried', () => qim.set(['nested', 'prop'])('bar')(baseState)],
      ['immutadot2-curried', () => set2('nested.prop')('bar')(baseState)],
      ['immutadot3-curried', () => set3`.nested.prop`('bar')(baseState)],
    ],
    (key, result) => {
      if (key === 'immutable') return
      // FIXME
      // expect(result).toEqual({
      //   nested: {
      //     prop: 'bar',
      //     otherProp: 'aze',
      //   },
      //   other: { prop: 'baz' },
      // })
    },
  )
}

module.exports = {
  setProp,
}
