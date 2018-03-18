# CCRouter

*"A Front-End Router for Web Developers"* <br><br>

CCRouter is a Mini-framework for Front-end developers to create responsive and asynchronous user interfaces. This routing framework is base upon hashes and is currently working on most of the modern web browsers.

## Features of CCRouter
* Customizable colors
* Built-in animated Google-like progress bar on top

## Getting Started 
1. **Bower**
```
bower install ccrouter
```

## How it's working
1. First download the project via `bower` or just download the release Zip file.
2. Link the `dist/ccrouter.js` and `dist/ccrouter.css` files to your HTML file like this,
```
<link rel="stylesheet" href="dist/ccrouter.css">
<script type="text/javascript" src="dist/ccrouter.js"></script>
```
3. Create a display element (an element which displays the pages usually a `div`) Initialize CCRouter Framework through JavaScript.
```
<script type="text/javascript">
    $(document).ready(function() 
    {
        var router = ccrouter();  // Create a new router from ccrouter

        router.initialize("Routes/", "html", {
            color:  "dodgerblue",
            display: "#display"
            height: "2",
            initial: "index"
        }); 
        // Map the change of hashes to the router
        router.listen(); // Listen for the incoming hashchanges
    });
</script>
```

## Initialize Function Arguments
| Order | Argument        | Description           | Default  | Example |
| ------------- |:-------------|:-----|:---------- | :----|
| 1st | Directory or URL where all routes / sub-URLS exist | null | routes, tabs |
| 2nd | Extension of the files / web pages | null | html, php |
| 3rd | Properties for the initialization | null | ... |
| 4th | A Preprocessor function that gets a string input and returns a string output | null | ... |
| 5th | A callback function (that has a route name input) that is called after a route is loaded | null | ... |   

## Properties
| Property        | Description           | Default  | Example |
| ------------- |:-------------|:-----|:---------- |
| color | Color of the loading bar | blue | dodgerblue, red, orangered |
| display | Query selector for the display object that renders the page asynchronously | null | #display, .page-render #page |
| height | Height of the page loader progressbar | 2 | 2, 4, 5 |
| initial | Initial route loaded when the page is loaded for the first time | null | index, home, initial |