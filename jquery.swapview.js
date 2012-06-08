/*!
 * jquery lightweight plugin boilerplate
 * original author: @ajpiano
 * further changes, comments: @addyosmani
 * licensed under the mit license
 */

;(function($, window, document, undefined) {
  var pluginName = 'SwapView',
      defaults = {
      };

  function SwapView(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function() {
    },
    swap: function() {
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
               new Plugin(this, options));
      }
    });
  }
})(jquery, window, document);
