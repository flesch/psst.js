'use strict';

(function(){

  var psst = function(){
    if (!(this instanceof psst)) {
      return new psst();
    }
    this.subscriptions = {};
  };

  var bind = function(context, func){
    return function(){
      return func.apply(context, arguments);
    }
  };

  psst.prototype.on = psst.prototype.subscribe = function(channel, callback){
    if (channel && Object.prototype.toString.call(callback) === '[object Function]') {
      if (!Object.prototype.hasOwnProperty.call(this.subscriptions, channel)) {
        this.subscriptions[channel] = [];
      }
      this.subscriptions[channel].push(callback);
      return {
        channel: channel,
        callback: callback
      };
    }
  };

  psst.prototype.once = function(channel, callback){
    var once = this.on(channel, function(){
      this.off(once);
      callback.apply(this, arguments);
    });
    return once;
  };

  psst.prototype.off = psst.prototype.unsubscribe = function(subscription){
    if (subscription && Object.prototype.hasOwnProperty.call(subscription, 'channel')) {
      for (var i = 0, len = this.subscriptions[subscription.channel].length; i < len; i++) {
        if (this.subscriptions[subscription.channel][i] === subscription.callback) {
          this.subscriptions[subscription.channel].splice(i, 1);
        }
      }
    }
  };

  psst.prototype.emit = psst.prototype.trigger = psst.prototype.publish = function(channel){
    if (channel && Object.prototype.hasOwnProperty.call(this.subscriptions, channel)) {
      for (var i = 0, len = this.subscriptions[channel].length; i < len; i++) {
        this.subscriptions[channel][i].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  };

  // Support the v1 way of using psst.js
  var __psst__ = new psst();
  psst.on = psst.subscribe = bind(__psst__, psst.prototype.on);
  psst.once = bind(__psst__, psst.prototype.once);
  psst.off = psst.unsubscribe = bind(__psst__, psst.prototype.off);
  psst.emit = psst.trigger = psst.publish = bind(__psst__, psst.prototype.emit);

  // Export psst for CommonJS, AMD and the browser.
  if (typeof exports === 'object') {
    module.exports = psst;
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return psst;
    });
  } else {
    window.psst = psst;
  }

})();
