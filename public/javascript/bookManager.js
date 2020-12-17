function pushAlreadyReadBook(evt) {
  const currentId = evt.target.id;
  try {
    axios.post("/api/alreadyread/" + currentId);
  } catch (err) {
    console.error(err);
  }
}

function pushReadBook(evt) {
  const currentId = evt.target.id;
  try {
    axios.post("/api/read/" + currentId);
  } catch (err) {
    console.error(err);
  }
}

function deleteAlreadyReadBook(evt) {
  const currentId = evt.target.id;
  try {
    axios.post("/api/dashboard/alreadyRead/delete/" + currentId);
    getFullList();
  } catch (err) {
    console.error(err);
  }
}
function deleteToReadBooks(evt) {
  const currentId = evt.target.id;
  try {
    axios.post("/api/dashboard/read/delete/" + currentId);
    fullListOfRead();
  } catch (err) {
    console.error(err);
  }
}

function listenAddToReadButton() {
  const btnRead = document.querySelectorAll(".alreadyread");

  btnRead.forEach((e) => {
    e.onclick = pushAlreadyReadBook;
  });
}

function listenToReadButton() {
  const btnRead = document.querySelectorAll(".read");

  btnRead.forEach((e) => {
    e.onclick = pushReadBook;
  });
}

function getFullList() {
  axios
    .get("/api/dashboard/alreadyread")
    .then((response) => {
      const data = response.data[0];
      const charContainer = document.querySelector("#data-container");
      console.log(data);
      charContainer.innerHTML = "";

      data.forEach((elemt) => {
        charContainer.innerHTML += `
        <div id="data-container">
        <div class="alreadyRead-card">
        <img src=${elemt.volumeInfo.imageLinks.smallThumbnail}>
          <p class="test">${elemt.volumeInfo.title}</p>
      <button id="${elemt._doc._id}" class="fa fa-trash yo" name ="test"></button>
      
  `;
      });
      console.log("refresh");
      listenToAlreadyReadDeleteButton();
    })
    .catch((err) => {
      console.log(`Error while deleting: ${err}`);
    });
}

// read part
function fullListOfRead() {
  axios.get("/api/dashboard/read").then((response) => {
    const dataTop = response.data[0];
    const charContainerTop = document.querySelector(
      ".book-read-container-test"
    );
    charContainerTop.innerHTML = "";
    dataTop.forEach((el) => {
      charContainerTop.innerHTML += `
      <div class="book-read-container-test">
      <div class="container-read">
      <img src="${el.volumeInfo.imageLinks.smallThumbnail}" alt="Book picture">
      <p class="test">${el.volumeInfo.title}</p>
      <button id="${el._doc._id}" class="fa fa-trash salut" name ="test"></button>
      </div>
      </div>
      `;
      
    });

    console.log("refresh");
    listenToReadDeleteButton();
  });
}
function listenToAlreadyReadDeleteButton() {
  const btnDelete = document.querySelectorAll(".yo");
  btnDelete.forEach((e) => {
    e.onclick = deleteAlreadyReadBook;
  });
}

function listenToReadDeleteButton() {
  const btnDelete = document.querySelectorAll(".salut");
  btnDelete.forEach((e) => {
    e.onclick = deleteToReadBooks;
  });
}
listenToReadDeleteButton();
listenToAlreadyReadDeleteButton();

listenAddToReadButton();
listenToReadButton();
