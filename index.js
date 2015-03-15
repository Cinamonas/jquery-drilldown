/**
 * A simple jQuery plugin for creating animated drilldown menus.
 *
 * @name jQuery Drilldown
 * @version $VERSION$
 * @requires jQuery v1.7+
 * @author Aleksandras Nelkinas
 * @license [MIT]{@link http://opensource.org/licenses/mit-license.php}
 *
 * Copyright (c) 2013 Aleksandras Nelkinas
 */

;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($, undefined) {

  'use strict';

  var pluginName = 'drilldown',
      defaults;

  defaults = {
    event: 'click',
    selector: 'a',
    speed: 100,
    cssClass: {
      container: pluginName + '-container',
      root: pluginName + '-root',
      sub: pluginName + '-sub',
      back: pluginName + '-back'
    }
  };

  function Plugin(element, options) {
    this._name = pluginName;
    this._defaults = defaults;

    this.element = element;
    this.$element = $(element);

    this.options = $.extend({}, defaults, options);

    this.init();
  }

  Plugin.prototype = {

    /**
     * Initializes plugin.
     */
    init: function () {
      var self = this;

      this.history = [];
      this.css = {
        'float': 'left',
        'width': null
      };

      this.$container = this.$element.find('.' + this.options.cssClass.container);
      this.$element.on(this.options.event, this.options.selector, function (e) {
        self.handleAction.call(self, e, $(this));
      });
    },

    /**
     * Handles user action and decides whether or not and where to drill.
     *
     * @param {jQuery.Event} e
     * @param {jQuery}       $trigger
     */
    handleAction: function (e, $trigger) {
      var $next = $trigger.nextAll('.' + this.options.cssClass.sub),
          preventDefault = true;

      if ($next.length) {
        this.down($next);
      } else if ($trigger.closest('.' + this.options.cssClass.back).length) {
        this.up();
      } else {
        preventDefault = false;
      }

      if (preventDefault && $trigger.prop('tagName') === 'A') {
        e.preventDefault();
      }
    },

    /**
     * Drills down (deeper).
     *
     * @param {jQuery} $next
     */
    down: function ($next) {
      var self = this;

      if (!$next.length) {
        return;
      }

      this.css.width = this.$element.outerWidth();
      this.$container.width(this.css.width * 2);

      $next = $next.clone(true)
          .removeClass(this.options.cssClass.sub)
          .addClass(this.options.cssClass.root);

      this.$container.append($next);

      this.animateDrilling(-1 * this.css.width, function () {
        var $current = $next.prev();

        self.history.push($current.detach());

        self.restoreState.call(self, $next);
      });
    },

    /**
     * Drills up (back).
     */
    up: function () {
      var self = this,
          $next = this.history.pop();

      this.css.width = this.$element.outerWidth();
      this.$container.width(this.css.width * 2);

      this.$container.prepend($next);

      this.animateDrilling(0, function () {
        var $current = $next.next();

        $current.remove();

        self.restoreState.call(self, $next);
      });
    },

    /**
     * Animates drilling process.
     *
     * @param {Number}   marginLeft Target margin-left.
     * @param {Function} callback
     */
    animateDrilling: function (marginLeft, callback) {
      var $menus = this.$container.children('.' + this.options.cssClass.root);

      $menus.css(this.css);

      $menus.first().animate({
        'margin-left': marginLeft
      }, this.options.speed, callback);
    },

    /**
     * Restores initial menu's state.
     *
     * @param {jQuery} $menu
     */
    restoreState: function ($menu) {
      $menu.css({
        'float': '',
        'width': ''
      });

      this.$container.width('auto');
    }

  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      }
    });
  };

}));
