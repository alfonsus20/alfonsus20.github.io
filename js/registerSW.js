let subscribeEndpoint = "";
let p256dhKey = "";
let authKey = "";

const vapidKeys = {
  publicKey:
    "BD2NPeJKlbzH1wq4kAAtFjagu3UO8A1mrv5WnIjU8X4EXBM3QGI4og6W0I_tZqn2J0VL1T6cGavHW-pBiEx4Tgo",
  privateKey: "EFJb7YRngREP1kHz3n627gYEPi1SU__5Ga8Y4E60VFc",
};

if ("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log("Browser belum mendukung");
}

function registerServiceWorker() {
  return navigator.serviceWorker
    .register("../service-worker.js")
    .then((registration) => {
      console.log("Registrasi berhasil");
      return registration;
    })
    .catch((err) => {
      console.log("Registrasi service worker gagal");
    });
}

function requestPermission() {
  if (!("Notification" in window)) {
    console.log("Maaf browser tidak mendukung notification");
  } else {
    Notification.requestPermission().then((res) => {
      if (res == "denied") {
        console.log("Fitur notif tidak diijinkan");
        return;
      } else if (res == "default") {
        console.log("User menutup kotak permohonan izin");
        return;
      }
    });

    if ("PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKeys.publicKey),
          })
          .then((subscribe) => {
            console.log(
              "Berhasil melakukan subscribe dengan endpoint: ",
              subscribe.endpoint
            );
            console.log(
              "Berhasil melakukan subscribe dengan p256dh key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              )
            );
            console.log(
              "Berhasil melakukan subscribe dengan auth key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              )
            );
          })
          .catch((e) => {
            console.error("tidak dapat melakukan subscribe", e.message);
          });
      });
    }
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}