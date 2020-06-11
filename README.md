# storeget
Gets platform specific .appx links for microsoft store apps  
**Cannot be used to pirate apps!**  
  
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
