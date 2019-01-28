jQuery Drilldown
================

A simple jQuery plugin for creating *animated* drilldown menus.

*Since v1.0.0, project follows [Semantic Versioning](http://semver.org/).*


Features
--------

* [UMD](https://github.com/umdjs/umd) (AMD, Node/CommonJS) support
* Multiple menus on a single page
* Pretty flexible, doesn't enforce specific tags
* Lightweight: 2 KB when minified (even less after gzip)

Demo
----

View it [here](http://cinamonas.github.io/jquery-drilldown/demo.html).


Usage
-----

```js
var options = {};

$('.drilldown').drilldown(options);
```


Options
-----------------

Shown with their default values:

```javascript
{
  event: 'click', // * View note below
  selector: 'a',  // * View note below
  speed: 100,
  // direction: 'rtl',
  cssClass: {
    container: 'drilldown-container',
    root: 'drilldown-root',
    sub: 'drilldown-sub',
    back: 'drilldown-back'
  }
}
```

\* Note: `selector` and `event` will be used for binding drilldown-initiating action in this manner:

```js
$('.drilldown').on(event, selector, function () { /* ... */ });
```

API
---

- `$('.drilldown').drilldown('reset')` resets drilldown to its initial state
- `$('.drilldown').drilldown('destroy')` destroys plugin instance


CSS & HTML
----------

```css
.drilldown {
  overflow: hidden;
}
.drilldown-sub {
  display: none;
}
```

```html
<div class="drilldown"> <!-- required -->
  <div class="drilldown-container"> <!-- required -->
  
    <ul class="drilldown-root"> <!-- required, but not necessarily UL -->
      <li><a>A Lorem ipsum</a></li>
      <li>
        <a>A Dolor sit amet</a>
        <ul class="drilldown-sub"> <!-- required for deeper (non-root) levels -->
          <li class="drilldown-back"><a>Back</a></li> <!-- required to be able to go back -->
          <li><a>A Fusce eget</a></li>
          <li>
            <a>A Quam vel lorem</a>
            <ul class="drilldown-sub">
              <li class="drilldown-back"><a>Back</a></li>
              <li><a>A Molestie tincidunt</a></li>
              <li><a>A Pellentesque</a></li>
            </ul>
          </li>
          <li><a>A Sit amet tincidunt</a></li>
        </ul>
      </li>
      <li><a>A Consectetur</a></li>
      <li><a>A Maecenas id</a></li>
      <li>
        <a>A Hendrerit odio</a>
        <ul class="drilldown-sub">
          <li class="drilldown-back"><a>Back</a></li>
          <li><a>A Cras tincidunt</a></li>
          <li><a>A Vivamus eu</a></li>
        </ul>
      </li>
    </ul>
    
  </div>
</div>
```


License
-------

[MIT](http://opensource.org/licenses/mit-license.php)
