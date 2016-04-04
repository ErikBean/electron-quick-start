

module.exports = [
    {
        label: 'Show Window',
        type: 'checkbox',
        checked: true,
        click: function () {
          {
            var win = require('electron').BrowserWindow.getAllWindows()[0];
            win.isVisible()? win.hide() : win.show();
          }
        }
    },
    {
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:',
    }
];
