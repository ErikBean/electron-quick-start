var expect = require("chai").expect;
var path = require('path');
describe("POC", function () {
    beforeEach(function () {
        this.timeout(0);
        const webdriverio = require('webdriverio');
        var options = {
            host: "localhost", // Use localhost as chrome driver server
            port: 9515,        // "9515" is the port opened by chrome driver.
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    binary: path.resolve('POC-darwin-x64','POC.app','Contents','MacOS','Electron'), // Path to your Electron binary.
                    args: []           // Optional, perhaps 'app=' + /path/to/your/app/
                }
            }
        };

        var client = webdriverio.remote(options);

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
    });
    it("should setup and assert", function () {
        expect(true).to.be.true;
    });
});
