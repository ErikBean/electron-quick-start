 # electron-webdriverio-native

**Clone and run to see an end-to-end test of an Electron native OS feature**


Adds [webdriver.io](http://webdriver.io/), [mocha](http://mochajs.org/), and [chai](http://chaijs.com/) to the [electron-quick-start](https://github.com/atom/electron-quick-start) project,
 in order to demonstrate how to write cross-platform end-to-end tests of native OS features.
- This POC adds a tray icon to the OS menu bar, which brings up a a context menu when clicked.
- This POC also shows WebdriverIO (WebContent automation), RobotJS (Desktop UI automation), and mocha-bamboo integration.
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

# Robot is a nodedesktop automation module. It controls native keyboard and mouse on Mac, Windows, Linux
# https://github.com/octalmage/robotjs

# For Window, RobotJS has dependencies on VS2013 and Python 2.7.3.  Install Windows X86-64 MSI Installer
# from https://www.python.org/download/releases/2.7.3/

# For Mac, RobotJS has a dependency on Xcode Command Line Tools.  Install that
# from: http://docwiki.embarcadero.com/RADStudio/XE4/en/Installing_the_Xcode_Command_Line_Tools_on_a_Mac

# Install node dependencies and rebuild native robotjs components.
# Details here: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md
npm install
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try: .\node_modules\.bin\electron-rebuild.cmd

#Start chromedriver on another terminal:
chromedriver --url-base=wd/hub --port=9515

# Package and run mocha e2e tests
npm run package && npm run e2e

# Package and run mocha-bamboo e2e tests. Produces a ./mocha.json results file for Atlassian Bamboo's Node.js plugin
# npm run package && npm run e2e-bamboo
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

#### License [CC0 (Public Domain)](LICENSE.md)
