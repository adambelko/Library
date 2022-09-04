const submitBtn = document.querySelector(".submit");
const nameInput = document.querySelector(".name-input");
const authorInput = document.querySelector(".author-input");
const bookStatus = document.querySelector(".book-status");
const myTable = document.querySelector(".my-table");
submitBtn.addEventListener("click", e => {
    addBookToLibrary(e);
    getDeleteBtn();
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
    let cellForBtn = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.textContent = "Delete";
    
    Object.values(book).forEach(text => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })

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
    myLibrary.splice(index, 1);
    console.log(myLibrary);
}

function getDeleteBtn() {
    const allDeleteBtns = document.querySelectorAll(".delete-btn");
    allDeleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => deleteBook(e.target.parentNode.parentNode))
    });
}

function clearForm() {
    nameInput.value = "";
    authorInput.value = "";
}

displayAllBooks();
getDeleteBtn();


