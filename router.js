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
                events.complete();
            } else {
                events.error();
            }
        }
        request.open("GET", uri);
        request.send();
    }
}

// CCRouter for Front-end routing on steroids (v1.0)
var ccrouter = function()
{
    var display = null; // Where content is rendered
    var page_loader = null; // Page loader element
    var routes_directory = ""; // Directory for the routes files
    var extension = ""; // Extension of the routes files
    var httpd = null; // The HTTP request client for JavaScript 
    
    // Initializes the ccrouter instance with routes_directory, and extension for the web documents
    this.initialize = function(routes_dir, ext)
    {
        var display = document.getElementById("message-display");
        var page_loader = document.getElementById("page-loader");
        routes_directory = routes_dir; // Set the routes directory
        extension = ext;

        page_loader.style.display = "none"; // Hide the page_loader 
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
    
    // Loads a url and returns the HTML content from it
    var load = function(url)
    {
        httpd(url, {
            complete: function() {

            },
            error : function() {

            }
        });
    }
    
    return this;
}

var router = ccrouter();  // Create a new router from ccrouter
router.initialize("Routes/", "html"); // Map the change of hashes to the router
router.listen(); // Listen for the incoming hashchanges
