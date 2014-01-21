
# psst.js

This is yet another small **Pub/Sub** library, however unlike many other implementations, the **subscribe** method returns an object that describes the channel and callback.

## Installing

```
$ npm install psst
```

```
var psst = require('psst');
```

**psst** can be used in the browser with [browserify](http://browserify.org/).

## Using

### Subscribe/On

```
var subscription = psst.on('topic', function(msg){
  console.log(msg);
});
```

`subscription` is a unique object that contains the channel and callback.


### Subscribe Once

```
var subscription = psst.once('topic', function(msg){
  console.log(msg);
});
```

This `subscription` is removed from the subscriber's list after the callback has been executed.

### Unsubscribe/Off

```
psst.off(subscription);
```

This method requires the subscription created in the `.on` method. Unlike other libraries, you'll remove the subscription from the subscriber list, instead of removing a callback from a topic.

### Publish/Emit

```
psst.emit('topic', 'Hello World!');
```

## License

Released under the MIT License: [http://flesch.mit-license.org](http://flesch.mit-license.org)
