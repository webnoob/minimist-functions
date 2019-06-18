module.exports = function (args, opts) {
  let result = require('minimist')(args, opts)

  /**
   * Process functions with the same name as the arg that has been passed.
   * @param minimistFunctionMaps
   *
   */
  result.process = minimistFunctionMaps => {
    for (let arg in minimistFunctionMaps) {
      if (result[arg]) {
        const map = minimistFunctionMaps[arg]
        const val = result[arg]

        if (typeof map === 'function') {
          map(val, () => {
            process.exit(0)
          })
        }
      }
    }

    if (typeof minimistFunctionMaps.default === 'function') {
      minimistFunctionMaps.default()
    }
  }

  return result
}
