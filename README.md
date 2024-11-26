# Smooth Scroll Handler: Fix for PageUp, PageDown, Home, and End Keys In ChatGPT

If you're frustrated by PageUp, PageDown, Home, and End keys not working in web applications like ChatGPT, this script is the solution! Enhance your scrolling experience with smooth animations and dynamic speed control.

## Why Use This Script?

- **Fix Broken Scrolling**: Resolves issues where scrolling keys fail to work properly in web apps like ChatGPT.
- **Smooth Scrolling**: Adds animations for a better visual experience.
- **Dynamic Speed Control**: Accelerates scrolling with rapid key presses for efficient navigation.
- **Respect Native Input Behavior**: Allows default functionality for `input`, `textarea`, and `contenteditable` elements.
- **Boundary Protection**: Prevents scrolling beyond the top or bottom of scrollable areas.

---

## Installation Guide

### Install Using Browser Extensions

This script works seamlessly with popular browser extensions that allow custom JavaScript.

#### Chrome/Edge (Tampermonkey or Violentmonkey)
1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) from the Chrome Web Store or Edge Add-ons.
2. Open the extension and create a new script.
3. Copy the content of `smooth_scroll_handler.js` into the editor.
4. Set the script to run on specific pages, like `https://chat.openai.com/*`.
5. Save the script, reload the page, and enjoy enhanced scrolling!

#### Firefox (Tampermonkey or Violentmonkey)
1. Install [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/).
2. Follow the same steps as for Chrome/Edge to add and configure the script.

#### Safari (Tampermonkey)
1. Install [Tampermonkey](https://www.tampermonkey.net/?browser=safari) for Safari.
2. Add the script using the same process as above.

---

### Run Directly in Chrome DevTools
If you prefer not to use extensions, run the script directly in your browser:

1. Open the page you want to fix (e.g., ChatGPT).
2. Press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac) to open Chrome DevTools.
3. Navigate to the [Console](https://developer.chrome.com/docs/devtools/console/javascript?hl=pl).
4. Copy and paste the content of `smooth_scroll_handler.js` into the console and press `Enter`.
5. The script will immediately enhance scrolling on the current page.

---

## Perfect for Web Apps Like ChatGPT

Many modern web apps disable or override native key scrolling, making navigation frustrating. This script solves that problem for:
- **ChatGPT**: Ensure Home, End, PageUp, and PageDown keys work as expected.
- **Web Apps with Custom Interfaces**: Fix scrolling in apps that don’t natively support these keys.

---

## How It Works

1. Detects when you press scrolling keys (PageUp, PageDown, Home, End).
2. Dynamically calculates the target scroll position and animates scrolling smoothly.
3. Increases scroll speed for rapid key presses.
4. Preserves default behavior for text inputs, textareas, and contenteditable elements.

---

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it. See the LICENSE file for details.

---

### Keywords for Discoverability:
- Fix PageUp PageDown keys ChatGPT
- Smooth scrolling for web apps
- ChatGPT scrolling fix
- JavaScript PageUp PageDown solution
- Web app scrolling enhancements
