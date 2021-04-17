let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

const addBooks = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
const myBooks = document.querySelector('.books');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  createHTML(title, author, pages, read);
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  let title = document.querySelector('.title').value;
  let author = document.querySelector('.author').value;
  let pages = document.querySelector('.pages').value;
  let read = document.querySelector('.read').checked;

  addBookToLibrary(title, author, pages, read);

  document.querySelector('.title').value = "";
  document.querySelector('.author').value = "";
  document.querySelector('.pages').value = "";
  document.querySelector('.read').checked = false;
})

const createHTML = (title, author, pages, read) => {
  const li = document.createElement('li');
  li.classList.add('list-item');

  const container = document.createElement('div');
  container.classList.add('container');
  read ? container.style.background = 'green' : container.style.background = "red";
   
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('remove-btn');
  deleteButton.textContent = "Remove";

  const readButton = document.createElement('button');
  readButton.classList.add('read-btn');
  read ? readButton.textContent = "Not Read" : readButton.textContent = "Read";

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-div');

  const titleHeading = document.createElement('h3');
  titleHeading.textContent = `"${title}"`;

  const authorText = document.createElement('h4');
  authorText.textContent = `Author: ${author}`;
  authorText.style.marginBottom = "1rem";

  const pagesText = document.createElement('h5');
  pagesText.textContent = `${pages} pages`;

  myBooks.append(li);
  buttonDiv.append(deleteButton, readButton);
  container.append(titleHeading, authorText, pagesText, buttonDiv);
  li.append(container);

  for (let i = 0; i < myLibrary.length; i++) {
    li.setAttribute("id", i)
  }
  
  const assignID = () => {
    let allLi = document.querySelectorAll('li');
    for (let i = 0; i < allLi.length; i++) { 
      allLi[i].removeAttribute("id"); 
      allLi[i].setAttribute("id", i);
    }
  }

  deleteButton.addEventListener('click', () => {
    assignID();
    myLibrary.splice(parseInt(li.getAttribute("id")), 1);
    addBooks();
    li.remove();
  })

  addBooks();

  readButton.addEventListener('click', () => {
    assignID();
    let readStatus = myLibrary[parseInt(li.getAttribute("id"))].read;
    if (readStatus) myLibrary[parseInt(li.getAttribute("id"))].read = false;
    else myLibrary[parseInt(li.getAttribute("id"))].read = true;

    readButton.textContent === 'Read' ? readButton.textContent = 'Not Read' : readButton.textContent = 'Read';
    container.style.background === 'red'? container.style.background = 'green' : container.style.background = 'red';
    
    addBooks();
  })
}

myLibrary.forEach(book => {
  createHTML(book.title, book.author, book.pages, book.read);
})