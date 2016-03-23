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
                    args: ['auto-open-devtools-for-tabs']           // Optional, perhaps 'app=' + /path/to/your/app/
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
            .timeoutsAsyncScript(1000)
            .executeAsync(clickTray)
            .debug()
            .timeoutsAsyncScript(1000)
            .executeAsync(toggleVisible)
            .debug()
            .timeoutsAsyncScript(1000)
            .executeAsync(clickTray)
            .debug()
            .timeoutsAsyncScript(1000)
            .executeAsync(toggleVisible)
            .debug()
            //.timeoutsAsyncScript(1000)
            //.executeAsync(clickTray)
            //.then(function (res) {
            //    console.log("res: ", res.value);
            //})
            .end();
    });
    it("should setup and assert", function () {
        expect(true).to.be.true;
    });
});
