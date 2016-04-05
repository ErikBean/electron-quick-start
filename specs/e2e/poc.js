var expect = require("chai").expect;
var path = require('path');


describe("POC", function () {
    var client = null;

    after(function () {
      this.timeout(3000);
        function sendMessage(event, arg) {
            // browser context - you may access neither client nor console
            var ipc = require('electron').ipcRenderer;
            var retMsg = ipc.send(event, arg);
            return retMsg;
        }

        console.log("In POC after()");

        return client
            .execute(sendMessage, 'app-quit', 'unused')
            .then(function (ret) {
                // node.js context - client and console are available
                return client;
            })
            .pause(1000)
            .end();
    });


    before(function () {
        this.timeout(0);
        const webdriverio = require('webdriverio');
        const mlog = require('mocha-logger');
        var os = require('os');
        var options = {
            host: "localhost", // Use localhost as chrome driver server
            port: 9515,        // "9515" is the port opened by chrome driver.
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    binary: (os.platform() == 'darwin')
                      ? path.resolve('POC-darwin-x64', 'POC.app', 'Contents', 'MacOS', 'Electron')
                      : path.resolve('POC-win32-x64', 'POC.exe'), // Path to your Electron binary.
                    args: []           // Optional, perhaps 'app=' + /path/to/your/app/
                }
            }
        };

        console.log("In POC before()");

        client = webdriverio.remote(options);
        // client.captureConsole = true;


        function clickTray(done) {
            var ipc = require('electron').ipcRenderer;
            ipc.send('tray-click');
            done('success');
        }

        function toggleVisible(done) {
            var ipc = require('electron').ipcRenderer;
            ipc.send('toggle-visible');
            done('success');
        }


        return client.init();

        /***

         return client
         .init()
         .pause(2000)
         .executeAsync(clickTray)
         .debug()
         .executeAsync(toggleVisible)
         .debug()
         .executeAsync(clickTray)
         .debug()
         .executeAsync(toggleVisible)
         .debug()
         .end();
         ****/
    });


    it("should toggle menu bar", function () {
      this.timeout(5000);

      function menuBarVisible(flag) {
        // browser context - you may access neither client nor console
        var win = require('electron').remote.BrowserWindow.getAllWindows()[0];

        // win.focus();
        win.setMenuBarVisibility(flag)
        return win.isMenuBarVisible();
      }


      return client
        .execute(menuBarVisible, true)
        .then(function () {
            // node.js context - client and console are available
            return client;
        })
        .pause(1000)
        .execute(menuBarVisible, false)
        .then(function () {
            // node.js context - client and console are available
          return client;
        })
        .pause(1000);
    });


    it("should minize then restore main window ", function () {
      this.timeout(5000);

      function winMinimize () {
          // browser context - you may access neither client nor console
          var win = require('electron').remote.BrowserWindow.getAllWindows()[0];
          win.minimize();
          return win.isMinimized();
      }

      function winRestore () {
          // browser context - you may access neither client nor console
          var win = require('electron').remote.BrowserWindow.getAllWindows()[0];
          win.restore();
          return win.isMinimized();
      }

      return client
        .execute(winMinimize, 'window-minimize', 'unused')
        .then(function (ret) {
            expect(ret.value).to.be.true; // Window should be minimized
            return client;
        })
        .pause(500)
        .execute(winRestore, 'window-restore', 'unused')
        .then(function (ret) {
            expect(ret.value).to.be.false; // Window should be restored
            return client;
        })
        .pause(500);
    });

    it("should toggle window visibility", function () {
      this.timeout(5000);

      function sendMessage(event, arg) {
          // browser context - you may access neither client nor console
          var ipc = require('electron').ipcRenderer;
          var retMsg = ipc.sendSync(event, arg);
          return (retMsg);
      }

      return client
          .execute(sendMessage, 'window-visible', 'unused')
          .then(function (ret) {
              // node.js context - client and console are available
              expect(ret.value).to.be.true; // Window should be visible initially
              return client;
          })
          .pause (1000)
          .execute(sendMessage, 'window-toggle', 'unused')
          .then(function (ret) {
              // node.js context - client and console are available
              expect(ret.value).to.be.false; // Window should be invisible now
              return client;
          })
          .pause (1000)
          .execute(sendMessage, 'window-toggle', 'unused')
          .then(function (ret) {
              // node.js context - client and console are available
              expect(ret.value).to.be.true; // Window should be visible again
              return client;
          });
    });

    it("should have title Hello World!", function () {
      this.timeout(5000);

      function sendMessage(event, arg) {
          // browser context - you may access neither client nor console
          var ipc = require('electron').ipcRenderer;
          var retMsg = ipc.sendSync(event, arg);
          return retMsg;
      }

      // var shortcutQuit = Keys.chord(Keys.COMMAND, "q");
      return client
          .getTitle().then( function (title) {
              expect(title).to.equal('Hello World!');
              return client;
          });
    });

    // click "More Info" button and verify text in expanded element
    it('should click basic notification', function () {
      this.timeout(3000);

      return client
        .click("#basicNotification").then (function () {
          //console.log('Clicked Basic Notification');
          return client;
        })
        .pause(1000);
    });

    it('should click image notification button', function () {
      this.timeout(3000);
      return client
        .click("#imageNotification").then (function () {
          //console.log('Clicked Image Notification');
          return client;
        })
        .pause(1000);
    });


    it('should click node-notfier button', function () {
      this.timeout(3000);

      return client
        .click("#nodeNotifier").then (function () {
          //console.log('Clicked Image Notification');
          return client;
        })
        .pause(1000);
    });


    it("should show tray menu", function () {
      this.timeout(5000);

      function sendMessage(event, arg) {
          // browser context - you may access neither client nor console
          var ipc = require('electron').ipcRenderer;
          var retMsg = ipc.sendSync(event, arg);
          return retMsg;
      }

      // var shortcutQuit = Keys.chord(Keys.COMMAND, "q");
      return client
          .execute(sendMessage, 'tray-click', 'unused')
          .then(function (ret) {
              // node.js context - client and console are available
            expect(ret.value).to.be.true; // Tray menu should be visible
            return client;
          })
          .pause(1000)
          .getTitle().then( function (title) {
              expect(title).to.equal('Hello World!');
              return client;
          });

    });

});
