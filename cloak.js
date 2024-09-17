function matchPatterns(value)
{
    const guidPattern = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const domainPattern = /(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
    const ipv4Pattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    if (guidPattern.test(value) || emailPattern.test(value) || domainPattern.test(value) || ipv4Pattern.test(value)) {
        return true;
    }
    return false;
}

function cloakText() {
    const elements = document.querySelectorAll('body *');
    elements.forEach(element => {
        element.childNodes.forEach(child => {
           if (child.nodeType === Node.TEXT_NODE) {
                if (matchPatterns(child.nodeValue)) {
                    element.style.filter = "blur(5px)";
                }
            }
        });
        title = element.getAttribute('title');
        if (title && matchPatterns(title)) {
            element.style.filter = "blur(5px)";
        }
    });
}

cloakText();

// MutationObserver to watch for changes in the DOM
let observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            // Blur the text
            cloakText();
        }
    }
});

// Start observing the whole document for changes
observer.observe(document.body, {
    childList: true, // Watch for added/removed elements
    subtree: true,   // Watch the entire subtree of the document
    characterData: true // Watch for changes in text content
});

// // Function to stop the observer when requested
// chrome.runtime.onMessage.addListener((request) => {
//     if (request.action === "stopObserver") {
//         observer.disconnect();
//         console.log("Observer stopped.");
//     }
// });
