// // Log a message to verify if the service worker is loaded
// console.log("Service worker is loaded!");

// // Ensure context menu is created when the extension is installed
// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");

//   // Create a context menu item for selected text
//   chrome.contextMenus.create({
//     id: "seeSelectedText",  // ID for the menu item
//     title: "See Selected Text",  // Title of the menu item
//     contexts: ["selection"]  // Only show this when text is selected
//   });

//   console.log("Context menu for selected text created");
// });

// // Listen for clicks on the context menu item
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   console.log("Context menu item clicked");  // Log if the event is triggered

//   if (info.menuItemId === "seeSelectedText" && info.selectionText) {
//     console.log("Selected Text:", info.selectionText);  // Log selected text
//     // Show the selected text in an alert
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // if (message.type === 'alert') {
//     //   alert(message.message);  // Show the alert with the selected text
//     // }
//   });

// background.js

// background.js (service worker)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.text)
  console.log(message.langCode)
  if (message.action === 'speak' && message.text) {
    chrome.tts.speak(message.text, {
      rate: 1.0,          // Speed of the speech (1 is normal)
      pitch: 1.0,         // Pitch of the voice
      volume: 1.0,        // Volume (from 0 to 1)
      //voiceName: "Alice",
      lang: message.langCode,      // Language (you can change this to other supported languages)
    });
  }
});

