// content.js

// Function to create the floating popup

// content.js

let session;

let selectedLanguage=""
// || "Spanish";
let langCode=""
// || "es-ES";
// langCode= langCode || "hi-IN"
// selectedLanguage=selectedLanguage || "Hindi" 

// Function to create the floating popup
async function createPopup(text) {

  const popup = document.createElement('div');
  
  // Professional and clean design styles
  popup.style.position = 'absolute';
  popup.style.zIndex = '99999';
  popup.style.backgroundColor = '#333'; // Dark grey background for a professional look
  popup.style.color = '#fff'; // White text color for good contrast
  popup.style.padding = '15px 20px'; // Padding for better spacing
  popup.style.borderRadius = '8px'; // Rounded corners for a modern feel
  popup.style.fontSize = '16px'; // Slightly larger font size for readability
  popup.style.fontFamily = "'Helvetica Neue', Arial, sans-serif"; // Modern, clean font
  popup.style.maxWidth = '320px'; // Slightly larger max width
  popup.style.wordWrap = 'break-word';
  popup.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Smooth transition for fade and movement
  popup.style.opacity = '0'; // Initial opacity for fade-in effect
  popup.style.lineHeight = '1.6'; // Comfortable line height for readability
  popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'; // Subtle shadow for depth effect
  popup.style.transform = 'scale(0.95)'; // Slightly scaled down to create a smooth transition on appearance
  popup.style.border = '2px solid rgba(255, 255, 255, 0.3)';
  // Display loading text
  popup.textContent = "Processing...";

  document.body.appendChild(popup);

  const selection = window.getSelection();
  const rect = selection.getRangeAt(0).getBoundingClientRect();

  popup.style.top = `${rect.top + window.scrollY - popup.offsetHeight - 12}px`;
  popup.style.left = `${rect.left + window.scrollX}px`;

  // Fade in the popup with smooth transition and scaling effect
  setTimeout(() => {
    popup.style.opacity = '1';
    popup.style.transform = 'scale(1)'; // Scale back to normal size
  }, 100);

  // Send text to backend and get response
  const translatedText = await sendTextToBackend(text);
  const formattedText = translatedText.trim().replace(/\n/g, '<br>');  // Preserve line breaks in response

  // Update popup content with the translated text or error message
  popup.innerHTML = formattedText || "Error processing the text";  

  // Trigger speech for the translated text
  chrome.runtime.sendMessage({ action: 'speak', text: translatedText, langCode: langCode });

  // Close popup when clicked with smooth fade-out and remove
  popup.addEventListener('click', () => {
    popup.style.opacity = '0';
    popup.style.transform = 'scale(0.95)';  // Apply slight scale-down effect
    setTimeout(() => {
      popup.remove();
    }, 100); // Wait for transition to complete before removing
  });
}


// Send the selected text to the backend and return the response
async function sendTextToBackend(text) {
  try {
    //return "It is the sample translation Text"
    const response = await fetch('https://wordfusion.vercel.app/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        langName: selectedLanguage
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from backend');
    }

    const data = await response.json();
    console.log("backend response: ", data.translation);
    return data.translation
  } catch (error) {
    console.error('Error:', error);
    return 'Error translating text'; // Default error message if the backend fails
  }
}

// Listen for text selection and show the popup
// Listen for text selection and show the popup
document.addEventListener('mouseup', () => {
  chrome.storage.local.get(['langCode'], (res)=>{
    langCode=res.langCode || 'en-US';
  });
  chrome.storage.local.get(['langName'], (result)=>{
 
    selectedLanguage= result.langName || 'English'
  });
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 0) {

    createPopup(selectedText);
  }
});


/*[
  {
    "voice_id": 0,
    "name": "Microsoft David - English (United States)",
    "lang": "en-US",
    "extension_id": "undefined",
    "event_types": ["start", "end", "word", "sentence", "marker", "pause", "resume"]
  },
  {
    "voice_id": 1,
    "name": "Microsoft Hazel - English (United Kingdom)",
    "lang": "en-GB",
    "extension_id": "undefined",
    "event_types": ["start", "end", "word", "sentence", "marker", "pause", "resume"]
  },
  {
    "voice_id": 2,
    "name": "Microsoft Susan - English (United Kingdom)",
    "lang": "en-GB",
    "extension_id": "undefined",
    "event_types": ["start", "end", "word", "sentence", "marker", "pause", "resume"]
  },
  {
    "voice_id": 3,
    "name": "Microsoft George - English (United Kingdom)",
    "lang": "en-GB",
    "extension_id": "undefined",
    "event_types": ["start", "end", "word", "sentence", "marker", "pause", "resume"]
  },
  {
    "voice_id": 4,
    "name": "Microsoft Mark - English (United States)",
    "lang": "en-US",
    "extension_id": "undefined",
    "event_types": ["start", "end", "word", "sentence", "marker", "pause", "resume"]
  },
  {
    "voice_id": 5,
    "name": "Microsoft Zira - English (United States)",
    "lang": "en-US",
    "extension_id": "undefined",
    "event_types": ["start", "end", "word", "sentence", "marker", "pause", "resume"]
  },
  {
    "voice_id": 6,
    "name": "Google Deutsch",
    "lang": "de-DE",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 7,
    "name": "Google US English",
    "lang": "en-US",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 8,
    "name": "Google UK English Female",
    "lang": "en-GB",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 9,
    "name": "Google UK English Male",
    "lang": "en-GB",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 10,
    "name": "Google español",
    "lang": "es-ES",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 11,
    "name": "Google español de Estados Unidos",
    "lang": "es-US",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 12,
    "name": "Google français",
    "lang": "fr-FR",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 13,
    "name": "Google हिन्दी",
    "lang": "hi-IN",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 14,
    "name": "Google Bahasa Indonesia",
    "lang": "id-ID",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 15,
    "name": "Google italiano",
    "lang": "it-IT",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 16,
    "name": "Google 日本語",
    "lang": "ja-JP",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 17,
    "name": "Google 한국의",
    "lang": "ko-KR",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 18,
    "name": "Google Nederlands",
    "lang": "nl-NL",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 19,
    "name": "Google polski",
    "lang": "pl-PL",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 20,
    "name": "Google português do Brasil",
    "lang": "pt-BR",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 21,
    "name": "Google русский",
    "lang": "ru-RU",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 22,
    "name": "Google 普通话（中国大陆）",
    "lang": "zh-CN",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 23,
    "name": "Google 粤語（香港）",
    "lang": "zh-HK",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  },
  {
    "voice_id": 24,
    "name": "Google 國語（臺灣）",
    "lang": "zh-TW",
    "extension_id": "neajdppkdcdipfabeoofebfddakdcjhd",
    "event_types": ["start", "end", "interrupted", "cancelled", "error"]
  }
]
*/