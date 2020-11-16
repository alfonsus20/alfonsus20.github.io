let webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BD2NPeJKlbzH1wq4kAAtFjagu3UO8A1mrv5WnIjU8X4EXBM3QGI4og6W0I_tZqn2J0VL1T6cGavHW-pBiEx4Tgo",
  privateKey: "EFJb7YRngREP1kHz3n627gYEPi1SU__5Ga8Y4E60VFc",
};

webPush.setVapidDetails(
  "mailto:alfonschandrawan@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ebQjuJNyTx4:APA91bEpbQx6p-EmcQtgexSVIUm6hEP3MNKu84TbAkuaaLolWvl4kZ4x90yLXrpw1_zf6JsdWKOcTHRI_hkUzTKjZEtdRbqLzZnSq-FiW7s60FcDncAZsRUOCARJQOPnZzZDqgHpK83p",
  keys: {
    p256dh:
      "BKKyzOSmh5+9K1soUlN/lGB0G0pLWTWMhJFgBRBiL4+3YrvUJpFCwmkgc529EkncS6Is3Zv2T1bWyo7ZP+Vj6L4=",
    auth: "AkXx7NASi0AmpWZQraF2bg==",
  },
};

let payload = "Selamat menggunakan UEFA News";

let options = {
  gcmAPIKey: "76198736059",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
