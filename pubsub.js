 
var is_subscribed, subscriptions;
subscriptions = {};
is_subscribed = function(channel) {
  return Object.prototype.hasOwnProperty.call(subscriptions, channel);
};

var pubsub = {
  subscribe: function(channel, callback) {
    if (callback instanceof Function) {
      if (!is_subscribed(channel)) {
        subscriptions[channel] = [];
      }
      subscriptions[channel].push(callback);
      return {
        channel: channel,
        callback: callback
      };
    }
  },
  unsubscribe: function(subscription) {
    var callback, i, _ref;
    if (is_subscribed(subscription.channel)) {
      _ref = subscriptions[subscription.channel];
      for (i in _ref) {
        callback = _ref[i];
        if (callback === subscription.callback) {
          subscriptions[subscription.channel].splice(i, 1);
        }
      }
    }
  },
  publish: function(channel) {
    var callback, i, _ref;
    if (is_subscribed(channel)) {
      _ref = subscriptions[channel];
      for (i in _ref) {
        callback = _ref[i];
        callback.apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  }
};

module.exports = pubsub;