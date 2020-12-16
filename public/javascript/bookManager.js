// let userID = "104370469578924429909"; // A definir car ici c'est juste un ID prédefini
//function to read
// function unrollToRead() {
//   axios
//     .get(
//       `https://www.googleapis.com/books/v1/users/${userID}/bookshelves/2/volumes?key=AIzaSyC-ajZu5UYDsyY2kjnN6UQ0YOI1Yd5Ds0k`
//     )

//     .then(function (res) {
//       const bookDetail = res.data.items;
//       console.log(bookDetail);
//       const containerBooks = document.querySelector("#container");
//       containerBooks.innerHTML = "";
//       bookDetail.forEach((element) => {
//         containerBooks.innerHTML += `<p>${element.volumeInfo.title}</p>`;
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// //function allreday read
// function unrollRead() {
//   axios
//     .get(
//       `https://www.googleapis.com/books/v1/users/${userID}/bookshelves/4/volumes?key=AIzaSyC-ajZu5UYDsyY2kjnN6UQ0YOI1Yd5Ds0k`
//     )

//     .then(function (res) {
//       const bookDetail = res.data.items;
//       console.log(bookDetail);
//       const containerBooks = document.querySelector("#container");
//       containerBooks.innerHTML = "";
//       bookDetail.forEach((element) => {
//         containerBooks.innerHTML += `<p>${element.volumeInfo.title}</p>`;
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//Function button allready read to add book from index to dashboard

//btn to add to dashboard

//Btn to read
// const toRead = document.getElementById("btn-to-read");
// toRead.addEventListener("click", unrollToRead);

// //btn allreday read
// const read = document.getElementById("btn-read");
// read.addEventListener("click", unrollRead);

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
    axios.post("/api/dashboard/delete/" + currentId);
    getFullList();
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
      const data = response.data;
      const charContainer = document.querySelector("#data-container");
      charContainer.innerHTML = "";

      data[0].forEach((elemt) => {
        charContainer.innerHTML += `
      
        
          <p class="test">${elemt.volumeInfo.title}</p>
 
    `;
      });
      data[1].forEach((elemt) => {
        charContainer.innerHTML += `
      <button id="${elemt._id}" class="fa fa-trash" name ="test"></button>

      
  `;
      });
      console.log("refresh");
      listenToAlreadyReadDeleteButton();
    })
    .catch((err) => {
      console.log(`Error while deleting: ${err}`);
    });
}

function listenToAlreadyReadDeleteButton() {
  const btnDelete = document.querySelectorAll(".fa-trash");
  btnDelete.forEach((e) => {
    e.onclick = deleteAlreadyReadBook;
  });
}

window.addEventListener("load", () => {
  const btnDelete = document.querySelectorAll(".fa-trash");
  document;
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", deleteAlreadyReadBook);
  });
});

listenAddToReadButton();
listenToReadButton();
