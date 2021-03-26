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

setProp(benchmarkSuite)
setDeepProp(benchmarkSuite)
updateTodos(benchmarkSuite, 1000, 100)
updateTodos(benchmarkSuite, 10000, 1000)
updateTodos(benchmarkSuite, 100000, 10000)
pushInArray(benchmarkSuite)

benchmarkSuite.runAndLog()
