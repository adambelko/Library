const submitBtn = document.querySelector(".submit");
const nameInput = document.querySelector(".name-input");
const authorInput = document.querySelector(".author-input");
const bookStatus = document.querySelector(".book-status");
const myTable = document.querySelector(".my-table");
submitBtn.addEventListener("click", e => {
    addBookToLibrary(e);
    getDeleteBtn();
    toggleStatus();
    clearForm();
});

let bookIndex = 0;

let myLibrary = [
    {name: "Karma", author: "SadhGuru", status: "read"},
    {name: "12 Rules Of Life", author: "Jordan Peterson", status: "read"}, 
    {name: "Atomic Habits", author: "James Clear", status: "not read"}, 
];

function Books(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
}

function addBookToLibrary(e) {
    e.preventDefault();

    let newBook = new Books(nameInput.value, authorInput.value, bookStatus.value);
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayBook(newBook);
}

function displayBook(book) {
    let row = document.createElement("tr");
    row.setAttribute("book-index", bookIndex++);

    Object.values(book).forEach((text, index) => {
        if (index === 2) {
            let cell = document.createElement("td");
            let button = document.createElement("button");
            button.setAttribute("class", "status-btn");
            button.textContent = book.status;
            cell.appendChild(button);
            row.appendChild(cell);
        } else {
            let cell = document.createElement("td");
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        }
    })

    let cellForBtn = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.textContent = "Delete";
    myTable.appendChild(row);
    row.appendChild(cellForBtn);
    cellForBtn.appendChild(deleteBtn);
}

function displayAllBooks() {
    myLibrary.forEach(book => {
        displayBook(book);
    });
}

function deleteBook(e) {
    e.remove();
    let index = e.getAttribute("book-index");
    console.log(index);
    myLibrary.splice(index, 1);
    bookIndex = -1;
    const rowIndex = document.querySelectorAll("tr");
    rowIndex.forEach(book => {
        book.setAttribute("book-index", bookIndex++);
    })
    console.log(myLibrary);
}

function getDeleteBtn() {
    const allDeleteBtns = document.querySelectorAll(".delete-btn");
    allDeleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => deleteBook(e.target.parentNode.parentNode))
    });
}

function toggleStatus() {
    const statusBtn = document.querySelectorAll(".status-btn");
    statusBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "read") {
                btn.textContent = "not read";
                // need to change status property in an object

            } else {
                btn.textContent = "read";
            }
        })
    })
}

function clearForm() {
    nameInput.value = "";
    authorInput.value = "";
}

displayAllBooks();
getDeleteBtn();
toggleStatus();


