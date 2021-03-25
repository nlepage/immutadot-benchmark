const { BenchmarkSuite } = require('./benchmark')
const { pushInArray } = require('./pushInArray')
const { setDeepProp } = require('./setDeepProp')
const { setProp } = require('./setProp')
const { updateTodos } = require('./updateTodos')

const benchmarkSuite = new BenchmarkSuite(
  'es2015',
  [
    ['es2015', 'ES2015 destructuring'],
    ['immutable', 'immutable 4.0.0-rc.12'],
    ['seamless', 'seamless-immutable 7.1.4'],
    ['immer', 'immer 9.0.1'],
    ['qim', 'qim 0.0.52'],
    ['qim-curried', 'qim 0.0.52 curried'],
    ['immutadot1', 'immutadot 1.0.0'],
    ['immutadot2', 'immutadot 2.0.0'],
    ['immutadot2-curried', 'immutadot 2.0.0 curried'],
    ['immutadot3', 'immutadot 3.0.0'],
    ['immutadot3-curried', 'immutadot 3.0.0 curried'],
  ],
)

describe('Benchmark suite', () => {
  describe('Set a property', () => setProp(benchmarkSuite))
  describe('Set a deeply nested property', () => setDeepProp(benchmarkSuite))
  describe('Update small todos list', () => updateTodos(benchmarkSuite, 'Update small todos list (1000 items)', 1000, 100))
  describe('Update medium todos list', () => updateTodos(benchmarkSuite, 'Update medium todos list (10000 items)', 10000, 1000))
  describe('Update large todos list', () => updateTodos(benchmarkSuite, 'Update large todos list (100000 items)', 100000, 10000))
  describe('Push values in an array', () => pushInArray(benchmarkSuite))

  afterAll(() => benchmarkSuite.log())
})
