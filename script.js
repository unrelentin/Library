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

    myLibrary.forEach((book, index) => {                                          //use forEach to iterate through every instance
        const bookCard = document.createElement("div");
        bookCard.classList.add("book_card");
        bookCard.setAttribute("data_index", index);                         //gotta set before you get

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

        const bookStatus = document.createElement("button");
        bookStatus.classList.add("book_status");
        bookStatus.textContent = `${book.readStatus}`;
        bookCard.appendChild(bookStatus);

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove_button");
        removeButton.textContent = `Remove`;
        bookCard.appendChild(removeButton);


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

//REMOVE BUTTON
theBook.addEventListener("click", (event)=> {
    if (event.target.classList.contains("remove_button")) {
        const bookIndex = event.target.parentElement.getAttribute("data_index");
        myLibrary.splice(bookIndex, 1);
        displayBook();
    }
});

//READ STATUS BUTTON

Book.prototype.toggleReadStatus = function() {
    this.readStatus = this.readStatus === "Read" ? "Not Read" : "Read";
};

theBook.addEventListener("click", (event) => {
    if (event.target.classList.contains("book_status")) {
        const bookIndex = event.target.parentElement.getAttribute("data_index");
        myLibrary[bookIndex].toggleReadStatus();                           // call it on the card which is found by the index
        displayBook();
    }
});