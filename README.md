# Lunit SCOPE Diagnostics Extension

### Get Started

- Use yarn build to produce the built files
- Go to Google Chrome extension management ([chrome://extensions/](chrome://extensions/))
- Toggle Developer Mode on
- Select Load Unpacked, and navigate to the build directory
- !important - copy the ID
- Paste the ID into `export const diagnosticsExtID = '';` in const/index.ts folder in the scope demo app

### Usage

- The extension loads the diagnostic config into the background when SCOPE demo is refreshed
- It will follow whichever project is open and display only that
- If many metric points are active it will slow down
- Pro tip: to hold the extension open, use it in another window. Inspecting the extension will also hold it open. 