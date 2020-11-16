const idbPromised = idb.open("team_database", 1, (upgradedDB) => {
  if (!upgradedDB.objectStoreNames.contains("teams")) {
    upgradedDB.createObjectStore("teams", { keyPath: "id" });
  }
});

const dbGetAllTeams = () => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then((db) => {
        const transaction = db.transaction("teams", "readonly");
        return transaction.objectStore("teams").getAll();
      })
      .then((data) => {
        if (data !== undefined) {
          resolve(data);
        } else {
          reject(new Error("Favorit tidak ada"));
        }
      });
  });
};

const dbInsertTeam = (team) => {
  console.log(team);
  return new Promise((resolve, reject) => {
    idbPromised
      .then((db) => {
        const transaction = db.transaction("teams", `readwrite`);
        transaction.objectStore("teams").put(team);
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          M.toast({ html: "Tim berhasil ditambahkan ke list favorit" });
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};

const dbDeleteTeam = (id) => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then((db) => {
        const transaction = db.transaction("teams", `readwrite`);
        transaction.objectStore("teams").delete(id);
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};
