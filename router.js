var ccrouter = function()
{
    var display = null; // Where content is rendered
    var page_loader = null; // Page loader element
    var routes_directory = ""; // Directory for the routes files
    var extension = ""; // Extension of the routes files
    
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
        alert(url);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                console.log(this.responseText);
            }else {
                return false;
            }
        }
        
        request.open("GET", url, true);
        request.send();
    }
    
    return this;
}

var router = ccrouter();  // Create a new router from ccrouter
router.initialize("Routes/", "html"); // Map the change of hashes to the router
router.listen(); // Listen for the incoming hashchanges
