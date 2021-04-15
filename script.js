let myLibrary = [];
const myBooks = document.querySelector('.books');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {

  myLibrary.push(new Book(title, author, pages, read))

  const li = document.createElement('li');
  li.classList.add('list-item');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = "X";

  const readButton = document.createElement('button');
  readButton.textContent = "read";

  const titleSpan = document.createElement('span');
  titleSpan.textContent = title;

  myBooks.append(li);
  li.append(titleSpan, deleteButton, readButton);

  for (let i = 0; i < myLibrary.length; i++) {
    li.setAttribute("id", i)
  }
  

  deleteButton.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for (let i = 0; i < allLi.length; i++) { 
      allLi[i].removeAttribute("id"); 
      allLi[i].setAttribute("id", i);
    }
    myLibrary.splice(parseInt(li.getAttribute("id")), 1);
    li.remove();
  })

  readButton.addEventListener('click', () => {
    li.style.background = "green";
  })
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