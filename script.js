const submitBtn = document.querySelector(".submit");
const nameInput = document.querySelector(".name-input");
const authorInput = document.querySelector(".author-input");
const bookStatus = document.querySelector(".book-status");
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
    toggleStatus(statusBtn);
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

function addBook() {
    let newBook = new Books(nameInput.value, authorInput.value, bookStatus.value);
    myLibrary.push(newBook);
    checkBookDuplicate() === true ? myLibrary.pop() : displayBook(newBook);
}

function checkBookDuplicate() {
    const uniqueValues = new Set(myLibrary.map(value => value.name));
    return (uniqueValues.size < myLibrary.length) ? true : false;
}

function validateForm() {
    const nameValue = nameInput.value.trim().length;
    const authorValue = authorInput.value.trim().length;

    if (nameValue !== 0 && authorValue !== 0) {
        addBook();
        clearForm();

    } else if (authorValue === 0 && nameValue === 0) {
        nameInput.style.border = "solid red";
        authorInput.style.border = "solid red";

    } else if (nameValue !== 0 && authorValue === 0) {
        nameInput.style.border = "solid #393939";
        authorInput.style.border = "solid red";

    } else if (authorValue !== 0 && nameValue === 0) {
        authorInput.style.border = "solid #393939";
        nameInput.style.border = "solid red";
    }
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
            createCell(text, row);
        }
    });
}

function createCell(text, row) {
    let cell = document.createElement("td");
    let textNode = document.createTextNode(text);
    cell.appendChild(textNode);
    row.appendChild(cell);
}

function createStatusCell(book, row) {
    let cellForStatusBtn = document.createElement("td");
    let statusButton = document.createElement("button");
    statusButton.setAttribute("class", "status-btn");
    statusButton.textContent = book.status;
    cellForStatusBtn.appendChild(statusButton);
    row.appendChild(cellForStatusBtn);
}

function createDeleteCell(row) {
    let cellForDeleteBtn = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.textContent = "Delete";
    table.appendChild(row);
    row.appendChild(cellForDeleteBtn);
    cellForDeleteBtn.appendChild(deleteBtn);
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
    bookIndex = -1;
    const rowIndex = document.querySelectorAll("tr");
    rowIndex.forEach(book => {
        book.setAttribute("book-index", bookIndex++);
    });
}

function toggleStatus(e) {
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
    nameInput.style.border = "solid #393939";
    authorInput.style.border = "solid #393939";
}

displayAllBooks();

