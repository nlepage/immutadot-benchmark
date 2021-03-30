const { performance } = require('perf_hooks')

const fast = Boolean(process.env.FAST)
class BenchmarkSuite {
  constructor(reference, contestants) {
    this.reference = reference
    this.contestants = contestants
    this.benchmarks = []
  }

  add(title, tests, pMaxDuration = 1000, pMaxIterations = 1000000) {
    const benchmark = {
      title,
      tests,
      maxDuration: fast ? pMaxDuration / 3 : pMaxDuration,
      maxIterations: fast ? Math.round(pMaxIterations / 3) : pMaxIterations
    }

    this.benchmarks.push(benchmark)
  }

  runAndLog() {
    this.log(this.run())
  }

  run() {
    const suiteResults = []
    for (const benchmark of this.benchmarks) {
      const benchmarkResults = {}
      for (const [key, fn] of benchmark.tests) {
        benchmarkResults[key] = this.runTest(fn, benchmark.maxDuration, benchmark.maxIterations)
      }
      suiteResults.push([benchmark.title, benchmarkResults])
    }
    return suiteResults
  }

  runTest(fn, maxDuration, maxIterations) {
    const maxDuration10th = maxDuration / 10

    let totalIterations = 0
    let iterations = 1

    const startTime = performance.now()
    const endTime = startTime + maxDuration

    while (iterations > 0) {
      totalIterations += iterations

      while (iterations--) fn()

      const remainingDuration = endTime - performance.now()
      const nextBatchTime = Math.min(maxDuration10th, remainingDuration)
      const elapsedTime = performance.now() - startTime
      const averageIterationTime = elapsedTime / totalIterations
      // either approximately enough iterations to use a tenth of max duration
      const enoughIterationsForMaxDuration = nextBatchTime / averageIterationTime
      // or enough iterations to reach max iterations...
      const enoughIterationsForMaxIterations = maxIterations - totalIterations
      iterations = Math.floor(Math.min(enoughIterationsForMaxDuration, enoughIterationsForMaxIterations))
    }

    const totalTime = performance.now() - startTime

    return {
      totalTime,
      totalIterations,
    }
  }

  log(suiteResults) {
    console.log([
      `|  | ${this.contestants.map(([, title]) => title).join(' | ')} |`,
      `| --- | ${this.contestants.map(() => '---').join(' | ')} |`,
      suiteResults.map(benchmarkResults => this.printBenchmarkResults(benchmarkResults)).join('\n'),
    ].join('\n'))
  }

  printBenchmarkResults([title, results]) {
    const reference = results[this.reference]
    return `| ${title} | ${this.contestants.map(([key]) => results[key]).map(result => this.printResult(result, reference)).join(' | ')} |`
  }

  printResult(result, reference) {
    if (result === undefined) return 'No run'
    const { totalTime, totalIterations } = result
    const opTime = totalTime / totalIterations

    let formattedOpTime
    if (opTime < 0.001) {
      const nanoTime = opTime * 1000000
      formattedOpTime = `${(nanoTime).toFixed(3 - Math.ceil(Math.log10(nanoTime)))}ns`
    } else if (opTime < 1) {
      const microTime = opTime * 1000
      formattedOpTime = `${(microTime).toFixed(3 - Math.ceil(Math.log10(microTime)))}µs`
    } else {
      formattedOpTime = `${(opTime).toFixed(3 - Math.ceil(Math.log10(opTime)))}ms`
    }

    const score = Math.round(totalIterations * 100 * reference.totalTime / totalTime / reference.totalIterations)

    return `${score} <br> ${Math.round(totalIterations * 1000 / totalTime)}ops/s (${formattedOpTime}/op)`
  }
}

module.exports = {
  BenchmarkSuite,
}