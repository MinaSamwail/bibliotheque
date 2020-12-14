
let userID = "104370469578924429909"; // A definir car ici c'est juste un ID prédefini
//function to read
function unrollToRead(){
    axios
      .get(
        `https://www.googleapis.com/books/v1/users/${userID}/bookshelves/2/volumes?key=AIzaSyC-ajZu5UYDsyY2kjnN6UQ0YOI1Yd5Ds0k`
      )
      
      .then(function (res){
          const bookDetail = res.data.items;
          console.log(bookDetail);
         bookDetail.forEach(element => {
             const containerBooks = document.querySelector('#container');
             containerBooks.innerHTML = "";
             containerBooks.innerHTML += `<p>${element.volumeInfo.title}</p>`;
         }) 
        }
      )
      .catch((err) => {
          console.log(err);
      })
};
//function allreday read
function unrollRead(){
    axios
      .get(
        `https://www.googleapis.com/books/v1/users/${userID}/bookshelves/4/volumes?key=AIzaSyC-ajZu5UYDsyY2kjnN6UQ0YOI1Yd5Ds0k`
      )
      
      .then(function (res){
          const bookDetail = res.data.items;
          console.log(bookDetail);
         bookDetail.forEach(element => {
             const containerBooks = document.querySelector('#container');
             containerBooks.innerHTML = "";
             containerBooks.innerHTML += `<p>${element.volumeInfo.title}</p>`;
         }) 
        }
      )
      .catch((err) => {
          console.log(err);
      })
};
//Btn to read
const toRead = document.getElementById('btn-to-read');
toRead.addEventListener('click', unrollToRead);

//btn allreday read
const read = document.getElementById('btn-read');
read.addEventListener('click', unrollRead);
