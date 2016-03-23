module.exports = function () {
    var win = require('electron').BrowserWindow.getAllWindows()[0];
    win.isVisible()? win.hide() : win.show();
}