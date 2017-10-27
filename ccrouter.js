// HyperRequestResponse v0.9
var http = function()
{
    this.GET = function(uri, events)
    {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                events.complete(request.responseText);
            } else {
                events.error();
            }
        }
        request.open("GET", uri);
        request.send();
    }

    return this;
}

// CCRouter for Front-end routing on steroids (v1.0)
var ccrouter = function()
{
    var display = null; // Where content is rendered
    var page_loader = null; // Page loader element
    var routes_directory = ""; // Directory for the routes files
    var extension = ""; // Extension of the routes files
    var httpd = null; // The HTTP request client for JavaScript 
    var percent = 0; // Percentage of the completion of the loading of the page

    // A Preprocessor for the html content
    var preprocessor = function(content)
    {
        return content;   
    }
    
    // Initializes the ccrouter instance with routes_directory, and extension for the web documents
    this.initialize = function(routes_dir, ext, properties, preproc = null)
    {
        getLoaderHTML(properties);

        display = document.getElementById("display");
        page_loader = document.getElementById("page-loader");
        routes_directory = routes_dir; // Set the routes directory
        extension = ext; // Initialize the extension
        httpd = http(); // Initialize a new HTTP object

        page_loader.style.opacity = "0"; // Hide the page_loader 

        if (preproc) preprocessor = preproc; // Set the preprocessor

        loadDefault(properties); // Load the default route
    }

    var loadDefault = function(prop)
    {
        var defaultRoute = prop.initial;
        load(routes_directory + defaultRoute + "." + extension);
    }

    var getLoaderHTML = function(properties)
    {
        document.write('<div id="page-loader" style="display:block;opacity:1;position:fixed;width:100%;top:0;left:0;height:' + properties.height + 'px;background-color:white;transition:all 500ms;"><div id="loading-bar" class="bloom" style="width:0%;height:' + properties.height + 'px;background-color:' + properties.color + ';transition:all 500ms;"></div></div>');
    }    
    // Listens for hashchange events and refreshes the page
    this.listen = function()
    {
        window.onhashchange = function(e)
        {
            var hash = e.newURL.split('#')[1];
            load(routes_directory + hash + "." + extension);
        }
    }

    var fadeDisplay = function(out)
    {
        if (out) 
            display.classList.remove("faded"); // Remove the fading
        else
            display.classList.add("faded"); // Remove the fading    
    }
    
    // Loads a url and returns the HTML content from it
    var load = function(url)
    {
        fadeDisplay(false); // Fade out the display
        loader(true); // Show the preloader

        setTimeout(function() {
        httpd.GET(url, {
            complete: function(response) {
                loader(false); // Hide the preloader
                var processedResponse = preprocessor(response); // Preprocess the response
                display.innerHTML = processedResponse; // Display the response

                setTimeout(function() {
                    fadeDisplay(true); // Fade the display back in
                }, 500);
            },
            error : function() {
                loader(false); // Hide the preloader 
                console.error("Route cannot be loaded. Please make sure the file, \"" + url + "\" exists in your file system"); // Display the error

              setTimeout(function() {
                    fadeDisplay(true); // Fade the display back in
                }, 500);
            }
        });
        }, 500);
    }

    var loader = function(show)
    {
        if (show) 
        { 
            page_loader.style.opacity = "1";
            perent = 0; // Set the percentage back to 0
            loaderAnimate(); // Animate the progressbar
        }
        else
        {
            page_loader.style.opacity = "1";
            setTimeout(function() {
                page_loader.style.opacity = "0";
            }, 500);

            percent = -1; // Reset the percentage 
        }
    }

    var loaderAnimate = function()
    {
        if (percent == 0)
            page_loader.children[0].style.width = percent + "%"; // Immediate reset

        setTimeout(function()
        {
            if (percent !== -1)
            {
                if (percent < 99)
                    percent += (100 - percent) / 10; // Increate the percentage only if the percentage is less than 80 percent
                
                page_loader.children[0].style.width = percent + "%";

                loaderAnimate(); // Recursion
            } 
            else 
            {
                page_loader.children[0].style.width = "100%";
                percent = 0; // Stop the animation
            }
        }, Math.random() * 1000);
    }
    
    return this;
}
