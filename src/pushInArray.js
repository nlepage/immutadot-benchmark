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

  const benchmark = benchmarkSuite.add(
    'Push values in array',
    [
      ['es2015', () => {
        return {
          ...baseState,
          nested: {
            ...baseState.nested,
            prop: [...baseState.nested.prop, 4, 5, 6],
          },
        }
      }],
      ['immutable', () => {
        immutableState.updateIn(['nested', 'prop'], prop => [...prop, 4, 5, 6])
      }],
      ['seamless', () => Seamless.updateIn(seamlessState, ['nested', 'prop'], prop => [...prop, 4, 5, 6])],
      ['immer', () => immer(baseState, draft => {
        draft.nested.prop.push(4, 5, 6)
      })],
      ['qim', () => qim.set(['nested', 'prop', qim.$end], [4, 5, 6], baseState)],
      ['immutadot1', () => push1(baseState, 'nested.prop', 4, 5, 6)],
      ['immutadot2', () => push2(baseState, 'nested.prop', 4, 5, 6)],
      ['immutadot3', () => push3`${baseState}.nested.prop`(4, 5, 6)],
      ['qim-curried', () => qim.set(['nested', 'prop', qim.$end])([4, 5, 6])(baseState)],
      ['immutadot2-curried', () => push2('nested.prop')(4, 5, 6)(baseState)],
      ['immutadot3-curried', () => push3`.nested.prop`(4, 5, 6)(baseState)],
    ],
  )
}

module.exports = {
  pushInArray,
}
