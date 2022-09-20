const submitBtn = document.querySelector(".main__submit-form-btn");
const nameInput = document.querySelector(".main__name-input");
const authorInput = document.querySelector(".main__author-input");
const bookStatus = document.querySelector(".main__book-status");
const table = document.querySelector("table");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateForm();
});

table.addEventListener("click", (e) => {
    let deleteBtn = e.target.closest(".delete-btn");
    if (!deleteBtn) return;
    if (!table.contains(deleteBtn)) return;
    deleteBook(deleteBtn);
});

table.addEventListener("click", (e) => {
    let statusBtn = e.target.closest(".status-btn");
    if (!statusBtn) return;
    if (!table.contains(statusBtn)) return;
    toggleBookStatus(statusBtn);
});

let bookIndex = 0;
let myLibrary = [
    {name: "Karma", author: "SadhGuru", status: "read"},
    {name: "12 Rules Of Life", author: "Jordan Peterson", status: "read"},
    {name: "Atomic Habits", author: "James Clear", status: "not read"},
];

class Books {
    constructor(name, author, status) {
        this.name = name;
        this.author = author;
        this.status = status;
    }
}

function validateForm() {
    const nameValue = nameInput.value.trim().length;
    const authorValue = authorInput.value.trim().length;

    if (nameValue !== 0 && authorValue !== 0) {
        addBook();
        clearForm();

    } else if (nameValue === 0 && authorValue === 0) {
        nameInput.dataset.state = "invalid";
        authorInput.dataset.state = "invalid";

    } else if (nameValue !== 0 && authorValue === 0) {
        nameInput.dataset.state = "valid";
        authorInput.dataset.state = "invalid";

    } else if (nameValue === 0 && authorValue !== 0) {
        nameInput.dataset.state = "invalid";
        authorInput.dataset.state = "valid";
    }
}

function addBook() {
    let newBook = new Books(nameInput.value, authorInput.value, bookStatus.value);
    myLibrary.push(newBook);
    checkBookDuplicate() === true ? myLibrary.pop() : displayBook(newBook);
}

function checkBookDuplicate() {
    const uniqueName = new Set(myLibrary.map(value => value.name.toLocaleLowerCase()));
    return (uniqueName.size < myLibrary.length) ? true : false;
}

function displayAllBooks() {
    myLibrary.forEach(book => {
        displayBook(book);
    });
}

function displayBook(book) {
    let row = document.createElement("tr");
    row.setAttribute("book-index", bookIndex++);
    returnBookValues(book, row);
    createDeleteCell(row);
}

function returnBookValues(book, row) {
    Object.values(book).forEach((text, index) => {

        if (index === 2) {
            createStatusCell(book, row);

        } else {
            createTableCell(text, row);
        }
    });
}

function createTemplateCell(row, tdClassName, btnClassName, btnText) {
    let cell = document.createElement("td");
    cell.setAttribute("class", `${tdClassName}`);
    let btn = document.createElement("button");
    btn.setAttribute("class", `${btnClassName}`);
    btn.textContent = btnText;
    cell.appendChild(btn);
    row.appendChild(cell);
    table.appendChild(row);
    return {cell, btn};
}

function createTableCell(text, row) {
    let cell = document.createElement("td");
    let textNode = document.createTextNode(text);
    cell.appendChild(textNode);
    row.appendChild(cell);
}

function createStatusCell(book, row) {
    const stat = createTemplateCell(row, "td-status", "status-btn", book.status);
}

function createDeleteCell(row) {
    const del = createTemplateCell(row ,"td-delete", "delete-btn", "Delete");
}

function getBookData(e) {
    const targetRow = e.parentNode.parentNode;
    const index = targetRow.getAttribute("book-index");
    return {targetRow, index};
}

function deleteBook(e) {
    const book = getBookData(e);
    book.targetRow.remove();
    myLibrary.splice(book.index, 1);
    resetBookIndex();
}

function resetBookIndex() {
    bookIndex = -1;
    const tableRowIndex = document.querySelectorAll("tr");
    tableRowIndex.forEach(book => {
        book.setAttribute("book-index", bookIndex++);
    });
}

function toggleBookStatus(e) {
    const book = getBookData(e);
    const bookObj = myLibrary[book.index];

    if (bookObj.status === "not read") {
        bookObj.status = "read";
        e.textContent = bookObj.status;

    } else {
        bookObj.status = "not read";
        e.textContent = bookObj.status;
    }
}

function clearForm() {
    nameInput.value = "";
    authorInput.value = "";
    nameInput.dataset.state = "valid";
    authorInput.dataset.state = "valid";
}

displayAllBooks();

