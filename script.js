const bookRow = document.getElementById('bookRow');
const bookRowCart = document.getElementById('bookRowCart');
const addToCartBtns = document.getElementsByClassName('btn btn-success');
let allBooks = [];
let bookCart = [];

window.onload = async () => {
    await getData()
    }

function addToCart(asin){
    bookCart.push(asin)
    document.getElementById(asin).querySelector('.card-body').classList.add('green-bg')
}

let removeBook = (asin) =>{
    document.getElementById(asin).remove()
}

let goToCart = () => {
    
    window.location.href = "http://127.0.0.1:5500/cart.html#";
    console.log(bookCart)
    let filteredBooks = allBooks.filter(book => book.asin === bookCart.map((bookAsin)=>{bookAsin}))
    console.log(filteredBooks)

    allBooks.map((book)=> book.asin === bookCart.map((book)=>{
        return bookRowCart.innerHTML += 
        `
        <div class="col mb-4" id="${book.asin}">
        <div class="card h-100">
          <img src="${book.img}" class="card-img-top book-img" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success" onclick="addToCart(${book.asin})">add to cart</button>
          <button type="button" class="btn btn-danger" onclick="removeBook(${book.asin})">skip</button>
        </div>
          </div>
        </div>
        </div>
        `
    })); 
}

searchImage = (event) => {
let userInput = event.target.value
if(userInput.length >= 3){
    bookRow.innerHTML = '';
    allBooks.filter(book => book.title.toLowerCase().includes(userInput)).map((book)=>{
        return bookRow.innerHTML += 
        `
        <div class="col mb-4" id="${book.asin}">
        <div class="card h-100">
          <img src="${book.img}" class="card-img-top book-img" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success" onclick="addToCart(${book.asin})">add to cart</button>
          <button type="button" class="btn btn-danger" onclick="removeBook(${book.asin})">skip</button>
        </div>
          </div>
        </div>
        </div>
        `
    });
}
if(userInput.length === 0){
    bookRow.innerHTML = '';
    getData()
}
}

const getData = async (query = '') => {
    try {
        let response = await fetch('https://striveschool-api.herokuapp.com/books/'+ query)
    let books = await response.json()
    console.log(books)
    allBooks = books
        books.map((book)=> {
return bookRow.innerHTML += 
`
<div class="col mb-4" id="${book.asin}">
<div class="card h-100">
  <img src="${book.img}" class="card-img-top book-img" alt="${book.title}">
  <div class="card-body">
    <h5 class="card-title">${book.title}</h5>
    <div class="btn-group" role="group" aria-label="Basic example">
 <button type="button" class="btn btn-success" onclick="addToCart(${book.asin})">add to cart</button>
          <button type="button" class="btn btn-danger" onclick="removeBook(${book.asin})">skip</button>
</div>
  </div>
  
</div>
</div>
`
        })
} catch(err){
    console.log(err)
}

}
