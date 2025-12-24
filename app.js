const libary = [];
const bookDisplay = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book");
const form = document.querySelector("dialog");
const formClose = document.querySelector(".close");
const formSubmit = document.querySelector(".submit");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

addBookButton.addEventListener("click", (e) => {
  form.showModal();
});

formClose.addEventListener("click", (e) => {
  console.log("hi");
  form.close();
});

formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibary(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );
  form.close();
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.checked = false;
  displayBooks();
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibary(title, author, pages, read) {
  libary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  while (bookDisplay.firstChild) {
    bookDisplay.firstChild.remove();
  }
  for (const book of libary) {
    const card = document.createElement("div");
    card.classList.add("card");
    if (book.read) {
      card.classList.add("read");
    }

    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;
    card.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = book.author;
    card.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);

    const readIndicator = document.createElement("div");
    readIndicator.textContent = book.read ? "Read" : "Unread";
    readIndicator.classList.add("read-indicator");
    card.appendChild(readIndicator);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttons");

    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.setAttribute("type", "button");
    readButton.textContent = book.read ? "Mark as unread" : "Mark as read";
    readButton.addEventListener("click", (e) => {
      book.read = !book.read;
      displayBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Delete";

    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);
    card.appendChild(buttonContainer);

    bookDisplay.appendChild(card);
  }
}

addBookToLibary("idk", "safds", 1232, true);
addBookToLibary("idk2", "safdsafds", 210, false);

displayBooks();
