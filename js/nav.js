document.addEventListener("DOMContentLoaded", () => {
  let elems = document.querySelector(".sidenav");
  M.Sidenav.init(elems);

  const loadNav = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhr.responseText;
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
          elm.addEventListener("click", (event) => {
            M.Sidenav.getInstance(document.querySelector(".sidenav")).close();
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open("GET", "./pages/nav.html", true);
    xhr.send();
  };

  loadNav();

  const loadPage = (page) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let content = document.querySelector("#content");
        if (xhr.status === 200) {
          content.innerHTML = xhr.responseText;
          if (page === "tim") {
            fetchAllTeams();
          } else if (page === "klasemen") {
            fetchStanding();
          } else if (page === "favorit") {
            getFavoriteTeams();
          } else if (page === "home") {
            let connectors = document.querySelectorAll(".connector");
            connectors.forEach((connector) => {
              connector.addEventListener("click", () => {
                loadPage(connector.getAttribute("href").substr(1));
              });
            });
          }
        } else if (xhr.status === 404) {
          content.innerHTML = "<h1> Halaman tidak ditemukan </h1>";
        } else {
          content.innerHTML = "Terjadi kesalahan";
        }
      }
    };
    xhr.open("GET", "./pages/" + page + ".html", true);
    xhr.send();
  };

  let page = window.location.hash.substr(1);
  if (page === "") {
    page = "home";
  }
  loadPage(page);
});
