const fast = Boolean(process.env.FAST)

class BenchmarkSuite {
  constructor(reference, contestants) {
    this.reference = reference
    this.contestants = contestants
    this.benchmarks = []
  }

  add(title, tests, assertResult, pMaxTime = 1, pMaxOperations = 1000000000) {
    const benchmark = {
      title,
      tests,
      assertResult,
      maxTime: fast ? pMaxTime / 3 : pMaxTime,
      maxOperations: fast ? Math.round(pMaxOperations / 3) : pMaxOperations
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
        benchmarkResults[key] = this.runTest(key, fn, benchmark.assertResult, benchmark.maxTime, benchmark.maxOperations)
      }
      suiteResults.push([benchmark.title, benchmarkResults])
    }
    return suiteResults
  }

  runTest(key, fn, assertResult, maxTime, maxOperations) {
    const startTime = Date.now()
    const maxTimeMs = Math.round(maxTime * 1000)

    const startingTime = maxTimeMs / 100 // Starting time is a hundredth of max time
    let startingIterations = 1
    let startingOperations = 0

    while (Date.now() - startTime < startingTime) {
      let iterations = startingIterations
      startingIterations *= 2
      startingOperations += iterations

      while (iterations--) fn()
    }

    const maxRunTime = Math.round(maxTimeMs / 10) // Max run time is a tenth of max time
    const limitEndTime = startTime + maxTimeMs

    const getIterations = (measuredOperations, measuredTime) => Math.min(
      // Either enough operations to consume max run time or remaining time
      Math.ceil(Math.min(maxRunTime, Math.max(limitEndTime - Date.now(), 0)) / (measuredTime / measuredOperations)),
      // Or enough operations to reach max operations
      maxOperations - measuredOperations,
    )

    let nbOperations = 0
    let totalTime = 0
    let iterations = getIterations(startingOperations, Date.now() - startTime)

    while (iterations > 0) {
      nbOperations += iterations

      const runStartTime = Date.now()
      while (iterations--) {
        if (assertResult && iterations % 100 === 0)
          assertResult(key, fn())
        else
          fn()
      }
      totalTime += Date.now() - runStartTime

      iterations = getIterations(nbOperations, totalTime)
    }

    return {
      totalTime,
      nbOperations,
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
    const { totalTime, nbOperations } = result
    const opTime = totalTime / nbOperations

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

    const score = Math.round(nbOperations * 100 * reference.totalTime / totalTime / reference.nbOperations)

    return `${score} <br> ${Math.round(nbOperations * 1000 / totalTime)}ops/s (${formattedOpTime}/op)`
  }
}

module.exports = {
  BenchmarkSuite,
}