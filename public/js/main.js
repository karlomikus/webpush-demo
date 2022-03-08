/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
var csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('Content');

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js");
  });
}

if (!('Notification' in window)) {
  alert("This browser does not support notifications.");
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function enablePushNotifications() {
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager.getSubscription().then(function (subscription) {
      if (subscription) {
        console.log('Subscription already exists.');
        return subscription;
      }

      var serverKey = urlBase64ToUint8Array("BORHxOa1jW5JDb258N1_B_RFH7FZW-PXVsKcYx-8wA-x5PEGYPJ57NXqu6ok4jYJkVqN-X0CUrZrWDIs5NAjAfI");
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverKey
      });
    }).then(function (subscription) {
      if (!subscription) {
        alert("Error occured while subscribing");
        return;
      }

      subscribe(subscription);
    });
  });
}

function disablePushNotifications() {
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager.getSubscription().then(function (subscription) {
      if (!subscription) {
        console.log('No subscription found.');
        return;
      }

      console.log('Found subscription, unsubscribing...');
      subscription.unsubscribe().then(function () {
        fetch('/notifications/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrftoken
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint
          })
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log('Success:', data);
        })["catch"](function (error) {
          console.error('Error:', error);
        });
      });
    });
  });
}

function subscribe(sub) {
  var key = sub.getKey('p256dh');
  var token = sub.getKey('auth');
  var contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
  var data = {
    endpoint: sub.endpoint,
    public_key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
    auth_token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
    encoding: contentEncoding
  };
  fetch('/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrftoken
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Success:', data);
  })["catch"](function (error) {
    console.error('Error:', error);
  });
}

document.getElementById('enable-push').addEventListener('click', function () {
  enablePushNotifications();
});
document.getElementById('disable-push').addEventListener('click', function () {
  disablePushNotifications();
});
/******/ })()
;