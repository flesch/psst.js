
# psst.js

This is yet another small **Pub/Sub** library, however unlike many other implementations, the **subscribe** method returns an object that describes the channel and callback.

## Installing

```bash
$ npm install psst
```

```javascript
var psst = require('psst');
```
or

```html
<script src="https://rawgit.com/flesch/psst.js/master/index.js"></script>
```

## Using

**psst.js** supports both a single global listener (`psst.on`), or many independent listeners (`new psst()`).

```javascript
var listener = new psst();
```

### Subscribe/On

```javascript
var subscription = listener.on('topic', function(msg){
  console.log(msg);
});
```

```javascript
var subscription = psst.on('topic', function(msg){
  console.log(msg);
});
```

`subscription` is a unique object that contains the channel and callback.


### Subscribe Once

```javascript
var subscription = listener.once('topic', function(msg){
  console.log(msg);
});
```

```javascript
var subscription = psst.once('topic', function(msg){
  console.log(msg);
});
```

This `subscription` is removed from the subscriber's list after the callback has been executed.

### Unsubscribe/Off

```javascript
listener.off(subscription);
```
```javascript
psst.off(subscription);
```

### Publish/Emit

```javascript
listener.emit('topic', 'Hello World!');
```

```javascript
psst.emit('topic', 'Hello World!');
```

## License

Released under the MIT License: [http://flesch.mit-license.org](http://flesch.mit-license.org)
