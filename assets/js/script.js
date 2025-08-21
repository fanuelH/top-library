const tbody = document.querySelector("tbody");
const newBtn = document.querySelector("#new-book-btn");
const modal = document.querySelector("#modal");
const addToLibraryBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");
const titleData = document.querySelector("#title");
const authorData = document.querySelector("#author");
const pagesData = document.querySelector("#pages");

let myLibrary = [];

function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, status) {
  const id = crypto.randomUUID();
  const isRead = status ? "have read it" : "haven't read it";
  let book = new Book(id, title, author, pages, isRead);
  myLibrary.push(book);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(titleData.value, authorData.value, pagesData.value);
  renderLibrary();
  form.reset();
  modal.close();
});

addBookToLibrary("The 48 Laws of Human", "Robert Greene", 606, true);
addBookToLibrary("The Art Of War", "Sun Tzu", 306, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
addBookToLibrary("Brave New World", "Aldous Huxley", 311, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, true);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, false);

newBtn.addEventListener("click", () => {
  modal.showModal();
});

function renderLibrary() {
  tbody.innerText = "";
  for (let book of myLibrary) {
    const tRow = document.createElement("tr");
    tRow.setAttribute("class", "table-row");
    const iCell = document.createElement("td");
    const tCell = document.createElement("td");
    const aCell = document.createElement("td");
    const pCell = document.createElement("td");
    const sCell = document.createElement("td");

    iCell.innerText = `${book.id}`;
    tCell.innerText = `${book.title}`;
    aCell.innerText = `${book.author}`;
    pCell.innerText = `${book.pages}`;
    sCell.innerText = `${book.isRead}`;

    tRow.append(iCell, tCell, aCell, pCell, sCell);
    tbody.appendChild(tRow);
  }
}

renderLibrary();
