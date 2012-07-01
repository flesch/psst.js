((global, exports) ->

  subscriptions = {}

  is_subscribed = (channel) ->
    Object::hasOwnProperty.call subscriptions, channel

  pubsub = exports.pubsub =

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

    publish: (channel, args) ->
      if is_subscribed channel
        callback.apply this, args for i, callback of subscriptions[channel]
      return

) this, (if typeof module isnt "undefined" and module.exports then module.exports else this)
