# jQuery SwapView

jQuery plugin for swapping visibility of DOM elements.

# Installation

Download the plugin from https://github.com/stickel/jQuery-SwapView and copy the file to your application/website. Load the file into whatever pages will be using the plugin with this:

`<script src="path/to/jquery.swapview.js" type="text/javascript"></script>`


# How to Use jQuery.SwapView

The first thing you'll need to decide is whether you'll have multiple triggers (or thumbnails) to swap the views.

## Single Trigger

In the case you'll only be using one trigger (or link) to change the views:

1. Create a container element for the views. I find it easiest to use an unordered list (`ul`) with a class of `.swap-views` or `.swap-view-container`
2. Add the class `.js-swapview` to all the elements/views you'd like to cycle through.
3. Add the class `.js-swapview-trigger` to the element you'd like to trigger the view swapping.
4. Just before the closing body tag, call the plugin with: `$('.swap-views').SwapView();`
