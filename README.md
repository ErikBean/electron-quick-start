# electron-quick-start

**Clone and run for a quick way to see an Electron native OS feature end-to-end tested.**


Adds [webdriver.io](http://webdriver.io/), [mocha](http://mochajs.org/), and [chai](http://chaijs.com/) to the [electron-quick-start](https://github.com/atom/electron-quick-start) project,
 in order to demonstrate how to end-to-end test native OS features. For this POC, a tray icon was added to the OS menu bar which brings up a a context menu when clicked.
  The context menu contains a checkbox to show/hide the main window. The e2e test triggers a click on the tray icon and the checkbox.

A basic Electron application needs just these files:

- `index.html` - A web page to render.
- `main.js` - Starts the app and creates a browser window to render HTML.
- `package.json` - Points to the app's main file and lists its details and dependencies.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) as well as [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/ErikBean/electron-webdriverio-native.git
# Go into the repository
cd electron-webdriverio-native
#Start chromedriver on another terminal:
chromedriver --url-base=wd/hub --port=9515
# Install dependencies and run the app
npm install && npm run e2e
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

#### License [CC0 (Public Domain)](LICENSE.md)
