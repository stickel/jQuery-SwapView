/*!
 * jQuery SwapView plugin
 * Original author: @stickel
 * Licensed under the MIT license
 */

;(function($, window, document, undefined) {
  var pluginName = 'SwapView',
      defaults = {
        trigger: '.js-swapview-trigger',
        views: '.js-swapview',
        onBeforeSwap: function() {},
        onAfterSwap: function() {}
      };

  function SwapView(container, options) {
    this.container = container;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  SwapView.prototype = {
    init: function() {
      var container = this.container,
          $container = $(container),
          $trigger = $container.find(this.options.trigger),
          views = this.options.views,
          $views = $container.find(views),
          $this = this;

      // Set the default view visibility
      $views.each(function() {
        $(this).hide();
        if ($(this).hasClass('active')) {
          $(this).show();
        }
      });

      // bind the trigger
      $trigger.bind('click.swapview', function(e) {
        e.preventDefault();
        $this.options.onBeforeSwap.apply(this);
        $this.swap($views);
      });
    },

    swap: function(views) {
      // default to the first view
      var nextView = 0;

      views.each(function(index, v) {
        if ($(v).hasClass('active')) {
          $(v).removeClass('active').hide();

          if (index < views.length - 1) {
            nextView = index + 1;
          }
        }
      });

      // Show the next view
      $(views[nextView]).show().addClass('active');

      // run the callback
      this.options.onAfterSwap.apply(this);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
               new SwapView(this, options));
      }
    });
  };
})(jQuery, window, document);
