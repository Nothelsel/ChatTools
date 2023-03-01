# ChatTools

This is a simple web extension that allows you to easily hide or show your conversation history on chatGPT.
# Installation

   [Firefox extension](https://addons.mozilla.org/fr/firefox/addon/chattools/)
   
   Chrome : (soon)

# Usage

Once installed, you will notice a new button added to your Google Meet interface. Clicking on this button will toggle the visibility of your browsing history.

The button is labeled with "Afficher l'historique" when the history is hidden, and "Cacher l'historique" when it's visible. You can also hover over the button to see a tooltip with the same labels.

By default, the history will be hidden when you first join a meeting. However, you can change this behavior by modifying the setTimeout function call in the init function.

# Test

    - Clone the repository or download the zip file and extract its content to a folder.
    - Open Chrome and go to chrome://extensions or about:debugging (Firefox).
    - Enable the "Developer mode" toggle at the top-right corner.
    - Click on "Load unpacked" and select the folder containing the extension files.
    - The extension should now be installed and ready to use.
    
    
![Screenshot](./assets/chattools.png)
