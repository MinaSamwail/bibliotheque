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
      <div class="first-child-picture">
      <img src="${el.volumeInfo.imageLinks.smallThumbnail}" alt="Book picture">
      <p class="test">${el.volumeInfo.title}</p>
      </div>
      <div>
            <p>${el.volumeInfo.authors}</p>
            <p>${el.volumeInfo.publisher}</p>
            <p>${el.volumeInfo.description}</p>
            <p>${el.volumeInfo.pageCount}</p>
            <p>${el.saleInfo.listPrice.amount}</p><span>${el.saleInfo.listPrice.currencyCode}</span>
        </div>
        <div>
      <button id="${el._doc._id}" class="fa fa-trash salut" name ="test"></button>
      </div>
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
// window.addEventListener("load", () => {
//   const btnDelete = document.querySelectorAll(".fa-trash");
//   document;
//   btnDelete.forEach((btn) => {
//     btn.addEventListener("click", deleteAlreadyReadBook);
//   });
// });
//test to click on btn delete on page read
// function listenToReadButton(){
//   const buttonDelete = document.querySelectorAll(".fa fa-trash .salut");
//   buttonDelete.forEach((button) =>{
//     button.addEventListener("click", deleteToReadBooks);
//   });
// };

// window.addEventListener("load", () =>{
//   const deletebutton = document.querySelectorAll(".salut");
//   document;
//   deletebutton.forEach((btnn) =>{
//     btnn.addEventListener("click", deleteToReadBooks);
//   });
// });

listenAddToReadButton();
listenToReadButton();
