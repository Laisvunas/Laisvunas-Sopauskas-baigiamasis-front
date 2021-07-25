MRK Diagrammer
=================

MRK diagrammer is a web app which allows for a team to collaborate in creating, editing and sharing of Modernized Reed-Kellogg syntax diagrams. 

Demo
----

View a live demo of MRK Diagrammer in action at 

http://joshreed.github.io/jQuery-ScrollTabs/

Registration and looging-in is required.

Install
-------

There are two installation options:
* Bower - `bower install jquery-scrolltabs`
* Download - Traditional download at http://joshreed.github.io/jQuery-ScrollTabs/

Usage
-----

At it's most basic:

```
$('#tabSet').scrollTabs();
```

And to show the options available:

```
 $('#tabSet').scrollTabs({
    scroll_distance: 350,        // Pixel width for how far to scroll with each single-click
    scroll_duration: 350,        // Milliseconds for how long to animate the scroll
    left_arrow_size: 26,         // Width of the left arrow (if you choose to customize this)
    right_arrow_size: 26,        // Width of the right arrow (if you choose to customize this)
    click_callback: function(e){ 
      // This shows the default callback, which will redirect the page based
      // on the 'rel' attribute.
      var val = $(this).attr('rel');
      if(val){
        window.location.href = val;
      }
    }
  });
```

More Info
-------------

For more information about Modernized Reed-Kellogg diagram system refer to

http://joshreed.github.io/jQuery-ScrollTabs/documentation.html



