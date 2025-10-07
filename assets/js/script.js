const tbody = document.querySelector("tbody");
const newBtn = document.querySelector("#new-book-btn");
const modal = document.querySelector("[data-modal]");
const addToLibraryBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");
const titleData = document.querySelector("#title");
const authorData = document.querySelector("#author");
const pagesData = document.querySelector("#pages");

let myLibrary = [];

class Book {
  constructor(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  addBookToLibrary(title, author, pages, status) {
    const id = crypto.randomUUID();
    const isRead = status;
    let book = new Book(id, title, author, pages, isRead);
    myLibrary.push(book);
  }
}

let b = new Book();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  b.addBookToLibrary(titleData.value, authorData.value, pagesData.value);
  renderLibrary();
  form.reset();
  modal.close();
});

b.addBookToLibrary("The 48 Laws of Human", "Robert Greene", 606, true);
b.addBookToLibrary("The Art Of War", "Sun Tzu", 306, false);
b.addBookToLibrary("1984", "George Orwell", 328, true);
b.addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
b.addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
b.addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
b.addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
b.addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
b.addBookToLibrary("Brave New World", "Aldous Huxley", 311, true);
b.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
b.addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, true);
b.addBookToLibrary("The Alchemist", "Paulo Coelho", 208, false);

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
    const dCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    const toggleBtn = document.createElement("button");

    toggleBtn.setAttribute("data-status", book.isRead);
    toggleBtn.classList.add("toggle-btn");
    deleteBtn.classList.add("delete-btn");

    iCell.innerText = `${book.id}`;
    tCell.innerText = `${book.title}`;
    aCell.innerText = `${book.author}`;
    pCell.innerText = `${book.pages}`;
    toggleBtn.innerText = book.isRead ? "have read it" : "haven't read it";

    book.isRead
      ? toggleBtn.classList.add("read")
      : toggleBtn.classList.remove("read");

    sCell.appendChild(toggleBtn);
    dCell.appendChild(deleteBtn);

    deleteBtn.innerText = `delete`;

    tRow.setAttribute("data-id", book.id);
    tRow.append(iCell, tCell, aCell, pCell, sCell, dCell);
    tbody.appendChild(tRow);
  }
}

modal.addEventListener("click", (e) => {
  const dialogDimension = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimension.left ||
    e.clientX > dialogDimension.right ||
    e.clientY > dialogDimension.bottom ||
    e.clientY < dialogDimension.top
  ) {
    modal.close();
  }
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    const id = row.dataset.id;
    myLibrary = myLibrary.filter((book) => book.id !== id);
    renderLibrary();
  }
  if (e.target.classList.contains("toggle-btn")) {
    const row = e.target.closest("tr");
    const id = row.dataset.id;
    const myBook = myLibrary.find((book) => book.id === id);
    myBook.isRead = !myBook.isRead;

    const button = e.target.closest("button");
    if (button.dataset.status === "true") {
      button.innerText = "haven't read it";
      button.classList.remove("read");
      button.dataset.status = "false";
    } else {
      button.innerText = "have read it";
      button.classList.add("read");
      button.dataset.status = "true";
    }
  }
});

renderLibrary();
