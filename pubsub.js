var pubsub = {
  
  subscriptions: {},

  is_subscribed: function(channel){
    return Object.prototype.hasOwnProperty.call(this.subscriptions, channel);
  },

  on: function(channel, callback){
    if (callback instanceof Function) {
      if (!this.is_subscribed(channel)) {
        this.subscriptions[channel] = [];
      }
      this.subscriptions[channel].push(callback);
      return {
        channel: channel,
        callback: callback
      };
    }
  },
  
  once: function(channel, callback){
    var once = this.on(channel, function(){
      this.off(once);
      callback.apply(this, arguments);
    });
    return once;
  },
  
  off: function(subscription){    
    if (this.is_subscribed(subscription.channel)) {
      for (var i in this.subscriptions[subscription.channel]) {
        if (this.subscriptions[subscription.channel][i] === subscription.callback) {
          this.subscriptions[subscription.channel].splice(i, 1);
        }
      }
    }
  },
  
  emit: function(channel){   
    if (this.is_subscribed(channel)) {
      for (var i = 0, len = this.subscriptions[channel].length; i < len; i++) {
        this.subscriptions[channel][i].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  }
  
};

pubsub.subscribe = pubsub.on;
pubsub.unsubscribe = pubsub.off;
pubsub.publish = pubsub.emit;

module.exports = pubsub;
