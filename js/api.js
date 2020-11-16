const BASE_URL = "https://api.football-data.org/v2";
const API_KEY = "af62e9b86a32465295113739d791aa32";
const ID_LIGA = 2001;

const ENDPOINT_TEAM = `${BASE_URL}/competitions/${ID_LIGA}/teams`;

const ENDPOINT_STANDING = `${BASE_URL}/competitions/${ID_LIGA}/standings`;

const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Terjadi kesalahan");
        return Promise.reject(new Error(res.statusText));
      } else {
        return Promise.resolve(res);
      }
    })
    .then((res) =>
      res.json().catch((err) => {
        console.log(err);
      })
    );
};

const showTeams = (data) => {
  let teamTable = document.getElementById("team-table");

  data.teams.forEach((team) => {
    teamTable.innerHTML += `
    <tr id=${team.id}>
        <td>${team.shortName}</td>
        <td><img src="${team.crestUrl.replace(
          /^http:\/\//i,
          "https://"
        )}" width="30px" alt="logo_tim" onError="this.onerror=null;this.src='./assets/question_mark.jpg';"/></td>
        <td>${team.area.name}</td>
        <td>${team.founded}</td>
        <td><a href="#favorit"  onclick="insertTeam(${
          team.id
        })" class="likedTeam waves-effect pink lighten-1 btn"><i class="material-icons">favorite</i></a></td>
    </tr>
    `;
  });
};

const showStanding = (data) => {
  let standingTable = document.getElementById("standing-table");
  data.standings[0].table.forEach((standing) => {
    standingTable.innerHTML += `
    <tr>
        <td><img src="${standing.team.crestUrl.replace(
          /^http:\/\//i,
          "https://"
        )}" width="30px"/></td>
        <td>${standing.team.name}</td>
        <td>${standing.won}</td>
        <td>${standing.draw}</td>
        <td>${standing.lost}</td>
        <td>${standing.points}</td>
        <td>${standing.goalsFor}</td>
        <td>${standing.goalsAgainst}</td>
        <td>${standing.goalDifference}</td>
    </tr>
    `;
  });
};

const fetchAllTeams = () => {
  if ("caches" in window) {
    caches.match(ENDPOINT_TEAM).then(function (response) {
      if (response) {
        response.json().then((data) => {
          showTeams(data);
        });
        return;
      }
    });
  }

  fetchAPI(ENDPOINT_TEAM)
    .then((data) => {
      showTeams(data);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

const fetchStanding = () => {
  if ("caches" in window) {
    caches.match(ENDPOINT_STANDING).then(function (response) {
      if (response) {
        response.json().then((data) => {
          showStanding(data);
        });
        return;
      }
    });
  }

  fetchAPI(ENDPOINT_STANDING)
    .then((data) => {
      showStanding(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const insertTeam = (id) => {
  console.log(id);
  let children = document.getElementById(id).childNodes;
  let index = 0;
  const teamData = {
    id,
    name: children[1].textContent,
    logo: children[3].children[0].getAttribute("src"),
    area: children[5].textContent,
    founded: children[7].textContent,
  };
  dbInsertTeam(teamData);
};

const getFavoriteTeams = () => {
  let favoriteTable = document.getElementById("favorite-table");
  dbGetAllTeams().then((res) => {
    res.forEach((team) => {
      favoriteTable.innerHTML += `
       <tr>
          <td>${team.name}</td>
          <td><img src="${team.logo}" width="30px" /></td>
          <td>${team.area}</td>
          <td>${team.founded}</td>
          <td><a href="#favorit"  onclick="deleteTeam(${team.id})" class="likedTeam waves-effect red darken-1 btn"><i class="material-icons">delete</i></a></td>
      </tr>
      `;
    });
  });
};

const deleteTeam = (id) => {
  if (
    confirm("Apakah Anda yakin ingin menghapus tim ini dari list favorit ? ")
  ) {
    dbDeleteTeam(id)
      .then(() => {
        M.toast({ html: "Tim berhasil dihapus dari list favorit" });
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
