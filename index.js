
// use axios to test if a url sends back anything in the request body

// serve up an html file that lets the user input an url
//   have a check box that analyzes the url to look for the urls after it (if it is for a tv show)
//     look for the pattern 'season-#-episode-#'
//        optionally, have it also search for later seasons and their episodes as well
//   have it ping iteratively until it gets a 404, then it knows how many there are

// have it display a list of the urls
//   beside each url, it will have either a pending symbol or a green checkmark
//   for each url that was successfully requested (with an actual body that is), have it store the html as a string
//   then dynamically create a webpage with its html
//     hopefully there won't be an XSS issue
//     also hopefully it won't have an issue with the lack of the page's php


