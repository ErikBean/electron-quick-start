 # electron-webdriverio-native

**Clone and run to see an end-to-end test of an Electron native OS feature**


Adds [webdriver.io](http://webdriver.io/), [mocha](http://mochajs.org/), and [chai](http://chaijs.com/) to the [electron-quick-start](https://github.com/atom/electron-quick-start) project,
 in order to demonstrate how to write cross-platform end-to-end tests of native OS features.
- This POC adds a tray icon to the OS menu bar, which brings up a a context menu when clicked.
- The context menu contains a checkbox to show/hide the main window.
- The e2e test triggers a click on the tray icon and the checkbox.

This is accomplished using [executeAsync](http://webdriver.io/api/protocol/executeAsync.html) from Webdriver.io and [ipc](https://github.com/atom/electron/blob/master/docs/api/ipc-main.md) from Electron.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) as well as [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/ErikBean/electron-webdriverio-native.git
# Go into the repository
cd electron-webdriverio-native

# Install dependencies and rebuild native robotjs components
# Details here: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md
npm install
./node_modules/.bin/electron-rebuild

#Start chromedriver on another terminal:
chromedriver --url-base=wd/hub --port=9515

# run the app
npm run package && npm run e2e
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

#### License [CC0 (Public Domain)](LICENSE.md)
