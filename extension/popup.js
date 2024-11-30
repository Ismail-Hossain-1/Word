
function filterLanguages() {
    var input, filter, select, options, option, i;
    input = document.getElementById("languageSearch");
    filter = input.value.toLowerCase();
    select = document.getElementById("languageSelect");
    options = select.getElementsByTagName("option");

    for (i = 0; i < options.length; i++) {
        option = options[i];
        if (option.text.toLowerCase().indexOf(filter) > -1) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}


// When the user selects a language, save it to chrome.storage.local
document.addEventListener('DOMContentLoaded', () => {

    const languageSearchInput = document.getElementById('languageSearch');

    // Add the event listener for the 'keyup' event
    languageSearchInput.addEventListener('keyup', filterLanguages);

    document.getElementById('languageSelect').addEventListener('change', (event) => {
        const selectedOption = event.target.selectedOptions[0];

        // Get the key (language code) and value (language name)
        const langCode = selectedOption.value;
        const langName = selectedOption.innerText;

        console.log(langCode, " ", langName)
        chrome.storage.local.set({ 'langCode': langCode });
        chrome.storage.local.set({ 'langName': langName });
        // Send the language code and name to the background script
        chrome.runtime.sendMessage({
            action: 'speak',
            langCode: langCode,
            langName: langName
        });

        // Listen for the change event on the checkbox
        

    })
});
//chrome.storage.local.set('audio', true);
// chrome.storage.local.get(['audio'], function(result) {
//     const audioState = result.audio;
  
//     // Set the toggle to the correct state based on the stored value
//     const toggle = document.getElementById('toggle');
//     const stateLabel = document.getElementById('toggle-state');
  
//     if (audioState === undefined) {
//       // Default to "On" if no stored value is found
//       chrome.storage.local.set({ 'audio': true });
//       toggle.checked = true;
//       stateLabel.textContent = 'Audio On';
//       stateLabel.style.color = '#4caf50';
//     } else {
//       // Apply the stored value
//       toggle.checked = audioState;
//       if (audioState) {
//         stateLabel.textContent = 'Audio On';
//         stateLabel.style.color = '#4caf50';
//       } else {
//         stateLabel.textContent = 'Audio Off';
//         stateLabel.style.color = '#ccc';
//       }
//     }
//   });
// document.getElementById('toggle').addEventListener('change', ()=> {
//     const stateLabel = document.getElementById('toggle-state');
//     if (this.checked) {
//         stateLabel.textContent = 'Audio On';
//         stateLabel.style.color = '#4caf50'; // Green when On
//         chrome.storage.local.set({ 'audio': true });
//     } else {
//         stateLabel.textContent = 'Audio Off';
//         stateLabel.style.color = '#ccc'; // Gray when Off
//         chrome.storage.local.set({ 'audio': false });
//     }
// });

