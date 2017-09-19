/**
 * Module Dependencies
 */

var Hook = require('koa-middleware-hook')
var Debug = require('debug')
var chalk = require('chalk')
var ms = require('ms')

/**
 * Export `Timer`
 */

module.exports = Timer

/**
 * Colors
 */

var log_medium = chalk.yellow
var log_fast = chalk.green
var log_slow = chalk.red

/**
 * Export `Timer`
 *
 * @param {Object} options
 * @return {Function}
 */

function Timer (options) {
  // setup the hooks
  var hook = Hook(marker, reducer(options))

  return function timer (generator) {
    return hook(generator)
  }
}


/**
 * Marker
 *
 * @return {Date}
 */

function marker () {
  return new Date()
}

/**
 * Reduce
 *
 * @param {String} name
 * @param {Date} top_start
 * @param {Date} top_end
 * @param {Date} bottom_start
 * @param {Date} bottom_end
 */

function reducer (options) {
  options = options || {}
  var debug = Debug(options.debug || 'koa:timer')
  var threshold = options.threshold || false
  var verbose = options.verbose || false
  var duration = speed(options.slow ? ms(options.slow) : 75)

  return function _reducer (name, top_start, top_end, bottom_start, bottom_end) {
    var top = top_end - top_start

    var bottom = null
    if (bottom_start && bottom_end) {
      bottom = bottom_end - bottom_start
    }

    if (!threshold || threshold < top + bottom) {
      if (verbose) {
        bottom !== null
          ? debug('%s: ↓%s | ↑%s', name || 'mw', duration(top), duration(bottom))
          : debug('%s: ⇵ %s', name || 'mw', duration(top))
      } else {
        debug('%s: ⇵ %s', name || 'mw', duration(top + bottom))
      }
    }
  }
}

function speed (slow) {
  var medium = slow / 2
  return function (actual) {
    return actual > slow
      ? log_slow(ms(actual))
      : actual > medium
      ? log_medium(ms(actual))
      : log_fast(ms(actual))
  }
}
