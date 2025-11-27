const myLibrary = [
  {
    title: "IT",
    author: "Stephen King",
    pages: 1000,
    read: false,
  },
];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toddleRead = function (itemId) {
  let item = myLibrary.find((item) => item.id === itemId);

  if (item && !item.read) {
    item.read = true;
    displayBooks();
    return true;
  }
};

let formError = false;

function addBookToLibrary(title, author, pages, read) {
  if (title.trim() === "" || author.trim() === "" || pages < 0) {
    formError = true;
    alert("You cannot submit an empty form! Please enter values");
  } else {
    formError = false;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
  }
}

function displayBooks() {
  const parentCont = document.querySelector(".container");
  parentCont.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    bookCard.innerHTML = `
    <div class='if-read ${book.read ? "book-read" : "book-notRead"}'>${
      book.read ? "Completed!" : "Not read yet! Click to change"
    }</div>
    <div class='book-content'>
        <p class='book-info'><span class='label-bookcard'>title: </span>${
          book.title
        }</p>
        <p class='book-info'><span class='label-bookcard'>author: </span> ${
          book.author
        }</p>
        <p class='book-info'><span class='label-bookcard'>pages: </span>${
          book.pages
        }</p>
        <button class='delete-btn'>Delete</button>
    </div>
    `;

    const removeBtn = bookCard
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        let index = myLibrary.findIndex((item) => item.id === book.id);
        if (index !== -1) {
          myLibrary.splice(index, 1);
          displayBooks();
        }
      });

    const toggleBtn = bookCard
      .querySelector(".if-read")
      .addEventListener("click", () => {
        Book.prototype.toddleRead(book.id);
      });

    parentCont.appendChild(bookCard);
  });

  const count = (document.querySelector("#countItems").innerText =
    myLibrary.length);
}

const dialog = document.querySelector("#addNewBook");
document.querySelector(".addBook-btn").addEventListener("click", () => {
  dialog.showModal();
});

const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  console.log("Form Data as Object:", formObject);
  addBookToLibrary(
    formObject.title,
    formObject.author,
    formObject.pages,
    formObject.read || false
  );
  if (!formError) {
    form.reset();
    dialog.close();
    displayBooks();
  } else {
    dialog.close();
  }
});
displayBooks();
