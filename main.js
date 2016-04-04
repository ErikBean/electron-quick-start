'use strict';



const ipc = require('electron').ipcMain;
// Module to control application life.
const app = require('electron').app;
// Module to create native browser window.
const BrowserWindow = require('electron').BrowserWindow;
const nativeImage = require('electron').nativeImage;
const Menu = require('electron').Menu;

const Tray = require('electron').Tray;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray = null;
let contextMenu = null;

var robot = require('robotjs');

ipc.on('tray-click', function(event, arg) {
    console.log('tray-click', arg);
    var posX = mainWindow.getPosition()[0] + mainWindow.getContentSize()[0] / 2;
    var posY = mainWindow.getPosition()[1] + mainWindow.getContentSize()[1] / 2;

    setTimeout(function() {
        console.log('tray-click dismiss tray popup');

        robot.moveMouse(posX, posY);
        robot.mouseClick();  // NOTE: A click back in the mainWindow dismiss the tray popup

        tray.setContextMenu(contextMenu); // NOTE: retore original context menu
        tray.popUpContextMenu();

    }, 1000);

    // NOTE: Tray popUpContextMenu() blocks if  menu is not empty.
    //       Swap with mock empty menu for this test
    var emptyMenu = new Menu()
    tray.setContextMenu(emptyMenu);
    tray.popUpContextMenu();

    event.returnValue = true;
});

ipc.on('toggle-visible', function (event, arg) {
    require('./visibilityToggle')();
});

ipc.on('synchronous-message', function(event, arg) {
  console.log('synchronous-message', arg);
  event.returnValue = 'pong';
});


ipc.on('app-quit', function (event, arg) {
    console.log('app-quit', arg);

    app.focus();
    robot.keyTap ('q', 'command');
    // app.quit();


    event.returnValue = 'true';
});

ipc.on('window-show', function(event, arg) {
  console.log('window-show', arg);
  var win = require('electron').BrowserWindow.getAllWindows()[0];

  win.show();
  event.returnValue = win.isVisible();

});

ipc.on('window-toggle', function (event, arg) {
  console.log('window-toggle', arg);
    var win = require('electron').BrowserWindow.getAllWindows()[0];
    require('./visibilityToggle')();
    event.returnValue = win.isVisible();
});

ipc.on('window-visible', function(event, arg) {
  console.log('window-visible', arg);
  var win = require('electron').BrowserWindow.getAllWindows()[0];
  event.returnValue = win.isVisible();

});


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  const localshortcut = require('electron-localshortcut');
  localshortcut.register('F12', () => {
    // console.log('You pressed F12');
    mainWindow.toggleDevTools();
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createTray() {
    tray = new Tray(nativeImage.createFromDataURL(require('./beanIcon')));
    contextMenu = Menu.buildFromTemplate(require('./menuTemplate'));
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    tray.setHighlightMode(true);  // Higligh tray icon when clicked

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);
app.on('ready', createTray);


// Note: https://github.com/atom/electron/issues/2312
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
