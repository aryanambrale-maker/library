const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleBookRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

function displayBooks() {
  const grid = document.getElementById('library-grid');
  grid.innerHTML = '';

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p>${book.pages} pages</p>
      </div>
      <div class="card-buttons">
        <button class="btn toggle-read-btn ${book.read ? 'status-read' : 'status-unread'}">
          ${book.read ? 'Read' : 'Not Read'}
        </button>
        <button class="btn remove-btn">Remove</button>
      </div>
    `;

    card.querySelector('.toggle-read-btn').addEventListener('click', () => {
      toggleBookRead(book.id);
    });

    card.querySelector('.remove-btn').addEventListener('click', () => {
      removeBook(book.id);
    });

    grid.appendChild(card);
  });
}

// Modal and Form Controls
const dialog = document.getElementById('book-dialog');
const newBookBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel-btn');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => dialog.close());

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  dialog.close();
});

// Starter books so the display is visible right away
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Atomic Habits', 'James Clear', 320, false);