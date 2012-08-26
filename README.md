# pubsub.coffee

A super simple **Pub/Sub** pattern written in Coffeescript, without any external dependencies. (If anything, this demonstrates how easy Coffeescript makes things.)

If you're using **Node**, just `require "pubsub"`, otherwise `pubsub` is available in the global context in the browser.

### Subscribe

```coffeescript
handle = pubsub.subscribe "/channel/topic", (msg) ->
  console.log msg
```

### Unsubscribe

```coffeescript
pubsub.unsubscribe handle
```

### Publish

```coffeescript
pubsub.publish "/channel/topic", "a", "b", "c"
```
