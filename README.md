jQuery Drilldown
================

A simple jQuery plugin for creating *animated* drilldown menus.


Features
--------

* AMD support
* Multiple menus on a single page
* Pretty flexible, doesn't enforce specific tags
* Lightweight: 1.8 KB when minified (even less after gzip)


Demo
----

View it [here](http://htmlpreview.github.io/?https://github.com/Cinamonas/jquery-drilldown/blob/master/demo.html).


Usage
-----

```js
var options = {};

$('.drilldown').drilldown(options);
```


Available options
-----------------

Shown with their default values:

```javascript
{
  event: 'click', // * View note below
  selector: 'a',  // * View note below
  speed: 100,
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
<div class="drilldown"><!-- required -->
  <div class="drilldown-container"><!-- required -->
  
    <ul class="drilldown-root"><!-- required, but not necessary UL -->
      <li><a href="#">A Lorem ipsum</a></li>
      <li>
        <a href="#">A Dolor sit amet <span>&rarr;</span></a>
        <ul class="drilldown-sub"><!-- required for deeper (non-root) levels -->
          <li class="drilldown-back"><a href="#"><span>&larr;</span> Back</a></li><!-- required to be able to go back -->
          <li><a href="#">A Fusce eget</a></li>
          <li>
            <a href="#">A Quam vel lorem <span>&rarr;</span></a>
            <ul class="drilldown-sub">
              <li class="drilldown-back"><a href="#"><span>&larr;</span> Back</a></li>
              <li><a href="#">A Molestie tincidunt</a></li>
              <li><a href="#">A Pellentesque</a></li>
            </ul>
          </li>
          <li><a href="#">A Sit amet tincidunt</a></li>
        </ul>
      </li>
      <li><a href="#">A Consectetur</a></li>
      <li><a href="#">A Maecenas id</a></li>
      <li>
        <a href="#">A Hendrerit odio <span>&rarr;</span></a>
        <ul class="drilldown-sub">
          <li class="drilldown-back"><a href="#"><span>&larr;</span> Back</a></li>
          <li><a href="#">A Cras tincidunt</a></li>
          <li><a href="#">A Vivamus eu</a></li>
        </ul>
      </li>
    </ul>
    
  </div>
</div>
```


License
-------

[MIT](http://opensource.org/licenses/mit-license.php)
