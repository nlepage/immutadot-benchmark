/* eslint-env jest */
const qim = require('qim')
const { default: immer, setAutoFreeze } = require('immer')
const Immutable = require('immutable')
const Seamless = require('seamless-immutable/seamless-immutable.production.min')
const { set: set1 } = require('immutadot1')
const { set: set2 } = require('immutadot2')
const { set: set3 } = require('immutadot3')

function setDeepProp(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested1: {
      arr1: [
        {
          nested2: {
            arr2: [
              {
                nested3: {
                  arr3: [
                    {
                      nested4: {
                        arr4: [
                          {
                            nested5: {
                              arr5: [
                                {
                                  nested6: {
                                    arr6: [
                                      {
                                        prop: 'foo',
                                        otherProp: 'aze',
                                      },
                                    ],
                                    otherProp: 'aze6',
                                  },
                                },
                              ],
                              otherProp: 'aze5',
                            },
                          },
                        ],
                        otherProp: 'aze4',
                      },
                    },
                  ],
                  otherProp: 'aze3',
                },
              },
            ],
            otherProp: 'aze2',
          },
        },
      ],
      otherProp: 'aze1',
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
    'Set a deeply nested property',
    [
      ['es2015', () => ({
        ...baseState,
        nested1: {
          ...baseState.nested1,
          arr1: [{
            ...baseState.nested1.arr1[0],
            nested2: {
              ...baseState.nested1.arr1[0].nested2,
              arr2: [{
                ...baseState.nested1.arr1[0].nested2.arr2[0],
                nested3: {
                  ...baseState.nested1.arr1[0].nested2.arr2[0].nested3,
                  arr3: [{
                    ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0],
                    nested4: {
                      ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4,
                      arr4: [{
                        ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0],
                        nested5: {
                          ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5,
                          arr5: [{
                            ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0],
                            nested6: {
                              ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6,
                              arr6: [{
                                ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0],
                                prop: 'bar',
                              }],
                            },
                          }],
                        },
                      }],
                    },
                  }],
                },
              }],
            },
          }],
        },
      })],
      ['immutable', () => {
        immutableState.setIn(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar')
      }],
      ['seamless', () => Seamless.setIn(seamlessState, ['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar')],
      ['immer', () => immer(baseState, draft => {
        draft.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop = 'bar'
      })],
      ['qim', () => qim.set(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar', baseState)],
      ['immutadot1', () => set1(baseState, 'nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop', 'bar')],
      ['immutadot2', () => set2(baseState, 'nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop', 'bar')],
      ['immutadot3', () => set3`${baseState}.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop`('bar')],
      ['qim-curried', () => qim.set(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'])('bar')(baseState)],
      ['immutadot2-curried', () => set2('nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop')('bar')(baseState)],
      ['immutadot3-curried', () => set3`.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop`('bar')(baseState)],
    ],
  )
}

module.exports = {
  setDeepProp,
}