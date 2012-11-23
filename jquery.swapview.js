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
    this.$container = $(this.container);
    this.$views = $(container).find(this.options.views);

    this.init();

    //if (options.autoplay) {
      //this.play();
    //}
  }

  SwapView.prototype = {
    init: function() {
      var container = this.container,
          $container = $(container),
          $trigger = $container.find(this.options.trigger),
          views = this.options.views,
          $views = $container.find(views),
          self = this;

      // Set the default view visibility
      $views.each(function() {
        $(this).hide();
        if ($(this).hasClass('active')) {
          $(this).show();
        }
      });

      if (this.multipleTriggers()) {
        $trigger.each(function(index) {
          self.bindToSlide($trigger[index]);
        });
      } else {

        // bind the trigger
        $trigger.bind('click.swapview', function(e) {
          e.preventDefault();
          self.options.onBeforeSwap.apply(this);
          self.swap($views);
        });
      }
    },

    bindToSlide: function(item) {
      var self = this;
      self.options.onBeforeSwap.apply(this);
      $(item).on('click', function(e) {
        e.preventDefault();
        var showId = $(item).attr('href');
        // find the active view and hide it
        self.hideView(self.$container.find(self.options.views + '.active'));
        // show the view matching showId
        self.showView(self.$container.find('#' + showId));
      });
    },

    multipleTriggers: function() {
      if (this.$container.find(this.options.trigger).length > 1) {
        return true;
      }
      return false;
    },

    swap: function(views) {
      // default to the first view
      var nextView = 0,
          self = this;

      views.each(function(index, v) {
        if ($(v).hasClass('active')) {
          self.hideView(v);

          if (index < views.length - 1) {
            nextView = index + 1;
          }
        }
      });

      // Show the next view
      self.showView(views[nextView]);

      // run the callback
      this.options.onAfterSwap.apply(this);
    },

    showView: function(view) {
      $(view).addClass('active').show();
    },

    hideView: function(view) {
      $(view).removeClass('active').hide();
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
