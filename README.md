
Current App Plan below:

NOTE: Below are primewire specific features, but this should also be a general use site
      This app will also function as a superior version of 'is it down right now', not only telling
      you if a site/page is down, but also telling you when it is finally back up.

use axios to test if a url sends back anything in the request body

serve up an html file that lets the user input an url
  have a check box that analyzes the url to look for the urls after it (if it is for a tv show)
    look for the pattern 'season-#-episode-#'
       optionally, have it also search for later seasons and their episodes as well
  have it ping iteratively until it gets a 404, then it knows how many there are

have it display a list of the urls
  beside each url, it will have either a pending symbol or a green checkmark
  for each url that was successfully requested (with an actual body that is), have it store the html as a string
  then dynamically create a webpage with its html
    hopefully there won't be an XSS issue
    also hopefully it won't have an issue with the lack of the page's php
additionally, parse through the html and find the list of links
  This way, they can be accessed directly, so that SHOULD sidestep any XSS issues

==================

General Functionality:

Add a feature to check (automatically) when a new episode of a given show is posted
  Also, create notifications of this:
    Email, Text, Electron App (that runs in the background)

Users can elect to be notified of a change for when a page is up or down




