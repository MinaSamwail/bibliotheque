
let userID = "104370469578924429909";

function unrollRead(){
    axios
      .get(
        `https://www.googleapis.com/books/v1/users/${userID}/bookshelves/2/volumes?key=AIzaSyC-ajZu5UYDsyY2kjnN6UQ0YOI1Yd5Ds0k`
      )
      
      .then(function (res){
          const bookDetail = res.data.items;
          console.log(bookDetail);
         bookDetail.forEach(element => {
             const containerBooks = document.querySelector('#container-to-read');
             containerBooks.innerHTML = `<p>${element.volumeInfo.title}</p>`;
         }) 
        }
      )
      .catch((err) => {
          console.log(err);
      })
};

const toRead = document.getElementById('btn-to-read');
toRead.addEventListener('click', unrollRead);

console.log("salut");