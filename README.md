@minimist-functions
===

> This is a small wrapper for [minimist](https://github.com/substack/minimist) that will automatically call functions
> based on the args passed.

# Install

With yarn

```bash
yarn add minimist-functions
``` 

Or NPM

```bash
npm install minimist-functions
``` 

# Uninstall

With yarn

```bash
yarn remove minimist-functions
``` 

Or NPM

```bash
npm uninstall minimist-functions
``` 


# Usage

Use minimist as normal but instead of `require('minimist')` you must use `require('minimist-functions')`. 

```bash
const args = require('minimist-functions')(process.argv.slice(2), {
  alias: {
    h: 'help',
    s: 'showMyValue',
    t: 'test'
  },
  default: {
    dir: process.cwd()
  }
})
```

Then define / attach your functions:

```bash
const help = (val, stop) => {
  console.log('Some help')
  
  // Stop exuction of subsequent args
  stop()
}

const showMyValue = (val, stop) => {
  console.log('You entered ' + val)
}

const test = (val, stop) => {
  console.log('Test called with arg: ' + arg)
}

args.process({
  help,
  showMyValue,
  test,
  default: () => {
    console.log('Will be called providing stop() hasn't been called in the arg chain')
  }
})
```

With the above setup, the following would be output:

```bash
C:\> yourcli -h
// Some help

C:\> yourcli -s SomeVal -t HelloWorld
// You entered SomeVal
// Test called with arg: HelloWorld
// Will be called providing stop() hasn't been called in the arg chain
```

## minimist-functions API

Run just like minimist (substituting `minimist` for `minimist-functions`)

```js
const args = require('minimist-functions')(args, opts)
```

See: [minimist methods](https://github.com/substack/minimist) for parameter information. 

### `args.process(functionMaps)`

This will read your function maps and automatically call them based on the parameters passed through.

* `functionMaps` (Object): Functions which map to your verbose arguments.

See [usage](#Usage) for examples.

# Roadmap
* Automatic -h, --help functions based on JSDoc data against functions.

## License

MIT ©2019 - present - Allan Gaunt
