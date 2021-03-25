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

  const benchmark = benchmarkSuite.createBenchmark(
    'Set a deeply nested property',
    (key, result) => {
      if (key === 'immutable') return
      expect(result).toEqual({
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
                                            prop: 'bar',
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
      })
    },
  )

  it('es2015', () => {
    benchmark('es2015', () => {
      return {
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
      }
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      immutableState.setIn(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar')
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.setIn(seamlessState, ['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar')
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      return immer(baseState, draft => {
        draft.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop = 'bar'
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      return qim.set(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar', baseState)
    })
  })

  it('immutadot 1', () => {
    benchmark('immutadot1', () => {
      return set1(baseState, 'nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop', 'bar')
    })
  })

  it('immutadot 2', () => {
    benchmark('immutadot2', () => {
      return set2(baseState, 'nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop', 'bar')
    })
  })

  it('immutadot 3', () => {
    benchmark('immutadot3', () => {
      return set3`${baseState}.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop`('bar')
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      return qim.set(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'])('bar')(baseState)
    })
  })

  it('immutadot 2 curried', () => {
    benchmark('immutadot2-curried', () => {
      return set2('nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop')('bar')(baseState)
    })
  })

  it('immutadot 3 curried', () => {
    benchmark('immutadot3-curried', () => {
      return set3`.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop`('bar')(baseState)
    })
  })
}

module.exports = {
  setDeepProp,
}