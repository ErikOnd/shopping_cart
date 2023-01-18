const bookRow = document.getElementById('bookRow');
const bookRowCart = document.getElementById('bookRowCart');
const addToCartBtns = document.getElementsByClassName('btn btn-success');
const modalBody = document.getElementsByClassName('modal-body')[0];
const bookCartList = document.getElementById('bookCartList');
const itemCounter = document.getElementById('itemCounter')
let allBooks = [];
let bookCart = [];

window.onload = async () => {
  await getData()
}

let updateCartNumber = () => {
  itemCounter.innerText = bookCart.reduce((a, b) => a + 1, 0)
}

let addToCart = (index) => {
  console.log(index);
  console.log(allBooks[index].asin)
  bookCart.push(allBooks[index])
  console.log(index)
  document.getElementById('asin_' + allBooks[index].asin).querySelector('.card-body').classList.add('green-bg')
  bookCartList.innerHTML +=
    `
    <tr id= 'cartItem_${allBooks[index].asin}'>
    <td>${allBooks[index].title}</td>
    <td>${allBooks[index].price}</td>
    <td><button type="button" class="btn btn-danger" onclick="removeCartBook(${index})">Delete</button></td>
  </tr> 
    `
  updateCartNumber()
}

let removeAllCartItems = () => {
  bookCartList.innerHTML = '';
  bookCart = [];
  updateCartNumber()
}

let removeCartBook = (index) => {
  document.getElementById('cartItem_' + allBooks[index].asin).remove()
  console.log(bookCart)
  bookCart = bookCart.filter(book => book.asin !== allBooks[index].asin);
  updateCartNumber()

}

let removeBook = (index) => {
  document.getElementById('asin_' + allBooks[index].asin).remove()
}

let createCartInput = () => {
  modalBody.innerHTML = 'test'
}

searchImage = (event) => {
  let userInput = event.target.value
  if (userInput.length >= 3) {
    bookRow.innerHTML = '';
    allBooks.filter(book => book.title.toLowerCase().includes(userInput)).map((book) => {
      return bookRow.innerHTML +=
        `
        <div class="col mb-4 p-0" id="asin_${book.asin}">
        <div class="card h-100">
          <img src="${book.img}" class="card-img-top book-img" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success" onclick="addToCart(${allBooks.indexOf(book)})">add to cart</button>
          <button type="button" class="btn btn-danger" onclick="removeBook(${allBooks.indexOf(book)})">skip</button>
        </div>
          </div>
        </div>
        </div>
        `
    });
  }
  if (userInput.length === 0) {
    bookRow.innerHTML = '';
    getData()
  }
}

const getData = async (query = '') => {
  try {
    let response = await fetch('https://striveschool-api.herokuapp.com/books/' + query)
    let books = await response.json()
    console.log(books)
    allBooks = books
    books.map((book) => {
      return bookRow.innerHTML +=
        `
<div class="col mb-4" id="asin_${book.asin}">
<div class="card h-100">
  <img src="${book.img}" class="card-img-top book-img" alt="${book.title}">
  <div class="card-body">
    <h5 class="card-title">${book.title}</h5>
    <div class="btn-group" role="group" aria-label="Basic example">
 <button type="button" class="btn btn-success" onclick="addToCart(${books.indexOf(book)})">add to cart</button>
          <button type="button" class="btn btn-danger" onclick="removeBook(${books.indexOf(book)})">skip</button>
</div>
  </div>
  
</div>
</div>
`
    })
  } catch (err) {
    console.log(err)
  }

}
