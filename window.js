





// Using Electron Notification here
var path = require('path');
var options = [
  {
    title: "Basic Notification",
    body: "Short message part"
  },
  {
    title: "Content-Image Notification",
    body: "Short message plus a custom content image",
    icon: path.join(__dirname, 'icon.png')
  }
]

function doNotify(evt) {
  if (evt.srcElement.id == "basicNotification") {
    var notification = new Notification(options[0].title, options[0]);

    notification.onclick = function () {
        console.log('Basic Notification clicked')
    }
  }
  else if (evt.srcElement.id == "imageNotification") {
    var notification = new Notification(options[1].title, options[1]);

    notification.onclick = function () {
        console.log('Image Notification clicked')
    }    
  }
  else if (evt.srcElement.id == "nodeNotifier") {
    // Using node-notifier alternative.  It also works on Windows 7
    const notifier = require('node-notifier');

    notifier.notify({
      title: 'My awesome title',
      message: 'Hello from node, Mr. User!',
      icon: path.join(__dirname, 'icon.png'), // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true // Wait with callback, until user action is taken against notification
    }, function (err, response) {
      // Response is response from notification
    });

    notifier.on('click', function (notifierObject, options) {
      // Triggers if `wait: true` and user clicks notification
      console.log('node-notifier: user clicked callback', arg);
    });

    notifier.on('timeout', function (notifierObject, options) {
      // Triggers if `wait: true` and notification closes
      console.log('node-notifier: nodetifier timeout callback', arg);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basicNotification").addEventListener("click", doNotify);
  document.getElementById("imageNotification").addEventListener("click", doNotify);

  document.getElementById("nodeNotifier").addEventListener("click", doNotify);
})
