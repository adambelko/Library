const submitBtn = document.querySelector(".submit");
const nameInput = document.querySelector(".name-input");
const authorInput = document.querySelector(".author-input");
const bookStatus = document.querySelector(".book-status");
const myTable = document.querySelector(".my-table");

submitBtn.addEventListener("click", e => addBookToLibrary(e));


let myLibrary = [
    {name: "Karma", author: "SadhGuru", status: "read"},
    {name: "12 rules of life", author: "Jordan Peterson", status: "read"}, 
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
    
    displayBooks(newBook);
}

function displayBooks(book) {
    let row = document.createElement('tr');

     Object.values(book).forEach(text => {
        let cell = document.createElement('td');
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
    })
    myTable.appendChild(row);
}

function displayAllBooks() {
    myLibrary.forEach(book => {
        displayBooks(book);
    });
}

displayAllBooks();

