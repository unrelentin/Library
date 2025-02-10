const myLibrary = [];

function Book (title, author, page, readStatus) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.readStatus = readStatus;
    
    this.announceBook = function () {
        console.log(`${this.name}` + ", " + `${this.author}` + ", " + `${this.page}` + ", " + `${this.readStatus}`)
    }
}

function addBookToLibrary () {
    /*take some arguments, create a book from those arguments, and store the new book object into an array */
    const title = document.querySelector("#book_title").value;
    const author = document.querySelector("#book_author").value;
    const page = document.querySelector("#book_page").value;
    const readStatus = document.querySelector(`input[name="book_status"]:checked`).value;           //here's how you get the radio button

    const newBook = new Book (title, author, page, readStatus);

    myLibrary.push(newBook);

}

//DISPLAYING THE BOOK
const theBook = document.querySelector(".main_content");

function displayBook () {
    
    theBook.innerHTML = "";

    myLibrary.forEach((book) => {                                          //use forEach to iterate through every instance
        const bookCard = document.createElement("div");
        bookCard.classList.add("book_card");

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("book_title");
        bookTitle.textContent = `Title: ${book.title}`;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement("div");
        bookAuthor.classList.add("book_author");
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookPage = document.createElement("div");
        bookPage.classList.add("book_page");
        bookPage.textContent = `Book's pages: ${book.page}`;
        bookCard.appendChild(bookPage);

        const bookStatus = document.createElement("div");
        bookStatus.classList.add("book_status");
        bookStatus.textContent = `Book's status: ${book.readStatus}`;
        bookCard.appendChild(bookStatus);


        theBook.appendChild(bookCard);
    });
}

// ACCEPT THE FORM'S INPUT
document.querySelector(".book_add_form").addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayBook();
    document.querySelector(".book_add_form").reset();
    modal.close(); //added another modal closing function to the submit button
});

//MAKE THE FORM A MODAL
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");

openModal.addEventListener("click", () => {
    modal.showModal();
});