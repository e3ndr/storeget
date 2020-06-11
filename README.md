# storeget
Gets platform specific .appx links for microsoft store apps  
**Cannot be used to pirate apps!**  
  
[Github Pages](https://e3ndr.github.io/storeget/storeget.html)
  
Example JS  
```javascript
console.log("Is Supported: " + isSupported()); // Relies on fetch and Promise.

// Types: x86, x64, arm, arm64
var links = await getLinks("https://www.microsoft.com/en-us/p/netflix/9wzdncrfj3tj", "x86");

if (Object.entries(links).length == 0) {
  // None
} else {
  // Object format: "name":"url"
  // await getAnchors(links) will return a list of anchor links (for display)
  // downloadAll(links) will automatically download everything
}
```
  
## Relies on  
`store.rg-adguard.net`: Fetches html content for a given link.  
`cors-anywhere.herokuapp.com`: Used to make CORS request to the store "api" Editable, see CORS_PROXY variable.  
`yacdn.org/proxy`: Used to make CORS downloads (Browsers don't allow file renames on CORS urls) Editable, see DOWNLOAD_PROXY variable.  
  
## Why two proxies?  
Well cors-anywhere supports post, whereas yacdn does not.  
And yacdn doesn't have origin header requirements.  
  
