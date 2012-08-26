((name, definition) ->
  return define definition if typeof define is "function"
  return module.exports = definition() unless typeof module is "undefined"
  this[name] = definition()
) "pubsub", ->

  subscriptions = {}

  is_subscribed = (channel) ->
    Object::hasOwnProperty.call subscriptions, channel

  {

    subscribe: (channel, callback) ->
      if callback instanceof Function
        subscriptions[channel] = [] unless is_subscribed channel
        subscriptions[channel].push callback
        return channel:channel, callback:callback
      return

    unsubscribe: (subscription) ->
      if is_subscribed subscription.channel
        for i, callback of subscriptions[subscription.channel]
          subscriptions[subscription.channel].splice(i, 1) if callback is subscription.callback
      return

    publish: (channel) ->
      if is_subscribed channel
        callback.apply this, Array::slice.call(arguments, 1) for i, callback of subscriptions[channel]
      return

  }
