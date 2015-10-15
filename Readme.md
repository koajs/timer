
# koa-timer

  time your middleware

  ![img](https://cldup.com/E2OA3LEane.png)

## Install

```
npm install koa-timer
```

## Example

See the [example](examples/index.js).

## API

#### `timer = Timer(options)`

Initialize a timer with the following options:

- slow (default 75): set what "slow" middleware means to your app
- debug (default "koa:timer"): the debug namespace you want to use
- threshold (default: false): only display middleware that's slower than the threshold
- verbose (default: false): setting to true will show the timing before and after `yield next`

Then to instrument the middleware, you do the following:

```js
app.use(timer(middleware()))
```

## License

MIT
