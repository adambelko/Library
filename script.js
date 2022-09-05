const submitBtn = document.querySelector(".submit");
const nameInput = document.querySelector(".name-input");
const authorInput = document.querySelector(".author-input");
const bookStatus = document.querySelector(".book-status");
const table = document.querySelector("table");

submitBtn.addEventListener("click", e => {
    addBookToLibrary(e);
    clearForm();
});

table.addEventListener("click", e => {
    let targetDeleteBtn = e.target.closest(".delete-btn");
    
    if (!targetDeleteBtn) return;
    if (!table.contains(targetDeleteBtn)) return;
    deleteBook(targetDeleteBtn);
})

table.addEventListener("click", e => {
    let targetStatusBtn = e.target.closest(".status-btn");
    
    if (!targetStatusBtn) return;
    if (!table.contains(targetStatusBtn)) return;
    toggleStatus(targetStatusBtn);
})

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

function displayAllBooks() {
    myLibrary.forEach(book => {
        displayBook(book);
    });
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
    table.appendChild(row);
    row.appendChild(cellForBtn);
    cellForBtn.appendChild(deleteBtn);
}

function deleteBook(e) {
    console.log(e)
    const targetRow = e.parentNode.parentNode;
    targetRow.remove();
    const index = targetRow.getAttribute("book-index");
    console.log(index);
    myLibrary.splice(index, 1);
    bookIndex = -1;
    const rowIndex = document.querySelectorAll("tr");

    rowIndex.forEach(book => {
        book.setAttribute("book-index", bookIndex++);
    })
    console.log(myLibrary);
}

function toggleStatus(e) {
    console.log(e)
    const targetRow = e.parentNode.parentNode;
    const index = targetRow.getAttribute("book-index");
    const bookObj = myLibrary[index];
    
    if (e.textContent === "read") {
        e.textContent = "not read";
        bookObj.status = "not read";
        console.log(bookObj);
        

    } else {
        e.textContent = "read";
        bookObj.status = "read";
        console.log(bookObj);
    }
    console.log(myLibrary);
}

function clearForm() {
    nameInput.value = "";
    authorInput.value = "";
}

displayAllBooks();

