/**
 * A simple jQuery plugin for creating animated drilldown menus.
 *
 * @name jQuery Drilldown
 * @version 1.1.1
 * @requires jQuery v1.7+
 * @author Aleksandras Nelkinas
 * @license [MIT]{@link http://opensource.org/licenses/mit-license.php}
 *
 * Copyright (c) 2015 Aleksandras Nelkinas
 */

;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($, undefined) {

  'use strict';

  var PLUGIN_NAME = 'drilldown';
  var TRACK_PARENT_ATTR = 'data-next-parent';

  var defaults = {
    event: 'click',
    selector: 'a',
    speed: 100,
    cssClass: {
      container: PLUGIN_NAME + '-container',
      root: PLUGIN_NAME + '-root',
      sub: PLUGIN_NAME + '-sub',
      back: PLUGIN_NAME + '-back'
    }
  };

  var Plugin = (function () {

    function Plugin(element, options) {
      var inst = this;

      this._name = PLUGIN_NAME;
      this._defaults = defaults;

      this.element = element;
      this.$element = $(element);

      this.options = $.extend({}, defaults, options);

      this._history = [];
      this._css = {
        float: 'left',
        width: null
      };

      this.$container = this.$element.find('.' + this.options.cssClass.container);

      this.$element.on(this.options.event + '.' + PLUGIN_NAME, this.options.selector, function (e) {
        handleAction.call(inst, e, $(this));
      });
    }

    Plugin.prototype = {

      /**
       * Destroys plugin instance.
       */
      destroy: function () {
        this.reset();

        this.$element.off(this.options.event + '.' + PLUGIN_NAME, this.options.selector);
      },

      /**
       * Resets drilldown to its initial state.
       */
      reset: function () {
        var iter;

        for (iter = this._history.length; iter > 0; iter--) {
          up.call(this, { speed: 0 });
        }

        this._history = [];
        this._css = {
          float: 'left',
          width: null
        };
      }

    };

    /**
     * Handles user action and decides whether or not and where to drill.
     *
     * @param {jQuery.Event} e
     * @param {jQuery}       $trigger
     * @private
     */
    function handleAction(e, $trigger) {
      var $next = $trigger.nextAll('.' + this.options.cssClass.sub);
      var preventDefault = true;

      if ($next.length) {
        down.call(this, $next);
      } else if ($trigger.closest('.' + this.options.cssClass.back).length) {
        up.call(this);
      } else {
        preventDefault = false;
      }

      if (preventDefault && $trigger.prop('tagName') === 'A') {
        e.preventDefault();
      }
    }

    /**
     * Drills down (deeper).
     *
     * @param {jQuery} $next
     * @param {Object} opts
     * @private
     */
    function down($next, opts) {
      var speed = (opts && opts.speed !== undefined) ? opts.speed : this.options.speed;

      if (!$next.length) {
        return;
      }

      this._css.width = this.$element.outerWidth();
      this.$container.width(this._css.width * 2);

      // Track parent of the opened node
      $next.parent().attr(TRACK_PARENT_ATTR, true);

      $next = $next
          .removeClass(this.options.cssClass.sub)
          .addClass(this.options.cssClass.root);

      this.$container.append($next);

      animateDrilling.call(this, { marginLeft: -1 * this._css.width, speed: speed }, function () {
        var $current = $next.prev();

        this._history.push($current.detach());

        restoreState.call(this, $next);
      }.bind(this));
    }

    /**
     * Drills up (back).
     *
     * @private
     */
    function up(opts) {
      var speed = (opts && opts.speed !== undefined) ? opts.speed : this.options.speed;
      var $next = this._history.pop();

      this._css.width = this.$element.outerWidth();
      this.$container.width(this._css.width * 2);

      this.$container.prepend($next);

      animateDrilling.call(this, { marginLeft: 0, speed: speed }, function () {
        var $current = $next.next();

        $current
            .addClass(this.options.cssClass.sub)
            .removeClass(this.options.cssClass.root);

        // Restore the node at its initial position in the DOM
        this.$container.find('[' + TRACK_PARENT_ATTR + ']').last()
            .removeAttr(TRACK_PARENT_ATTR)
            .append($current);

        restoreState.call(this, $next);
      }.bind(this));
    }

    /**
     * Animates drilling process.
     *
     * @param {Object}   opts
     * @param {Function} callback
     * @private
     */
    function animateDrilling(opts, callback) {
      var $menus = this.$container.children('.' + this.options.cssClass.root);

      $menus.css(this._css);

      $menus.first().animate({ marginLeft: opts.marginLeft }, opts.speed, callback);
    }

    /**
     * Restores initial menu's state.
     *
     * @param {jQuery} $menu
     * @private
     */
    function restoreState($menu) {
      $menu.css({
        float: '',
        width: '',
        marginLeft: ''
      });

      this.$container.css('width', '');
    }

    return Plugin;

  })();

  $.fn[PLUGIN_NAME] = function (options) {
    return this.each(function () {
      var inst = $.data(this, PLUGIN_NAME);
      var method = options;

      if (!inst) {
        $.data(this, PLUGIN_NAME, new Plugin(this, options));
      } else if (typeof method === 'string') {
        if (method === 'destroy') {
          $.removeData(this,  PLUGIN_NAME);
        }
        if (typeof inst[method] === 'function') {
          inst[method]();
        }
      }
    });
  };

}));
