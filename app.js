// Book Class : represents book
class Book {
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class , handles UI tasks
class UI {
    static displayBooks(){
        const books = Store.getBooks();  
        const bookss = Array.from(books);
        bookss.forEach(book => {UI.addBookToList(book)});
        }
        static addBookToList(book){
            const list = document.querySelector('#book-list');
            const row = document.createElement('tr');
            row.innerHTML = `
              <td> ${book.title} </td>
              <td> ${book.author} </td>
              <td> ${book.isbn}</td>
              <td> <a href ="#" class="btn btn-danger btn-sm delete"> X </a> </td>
            `;
            list.appendChild(row);
        
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message , className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        // set time out 3 seconds
        setTimeout(()=>document.querySelector('.alert').remove(), 2000);
    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//Store Class , handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        const bookss = Store.getBooks();
        const books = Array.from(bookss);
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    } 
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index , 1);
            }
        });
    localStorage.setItem('books', JSON.stringify('books'));
    }
}
// event dispay 

document.addEventListener('DOMContentLoaded',UI.displayBooks)

// EVents for adding or removing a book
// Add book

document.querySelector('#book-form').addEventListener('submit',(e)=>{
        // prevent submit
        e.preventDefault();
    
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        // validate 

        if (title === '' || author === '' || isbn === ' '){
            UI.showAlert('Please fill in fields','danger');
        }else{
    // instantiate book 

    const book = new Book(title,author,isbn);
    // Add new book to the UI
    UI.addBookToList(book);

    // add book to strage
    Store.addBook(book);
    // show succuss message
    UI.showAlert('Book added successfully', 'success');
    // clear fileds
    UI.clearFields();
        }
});

// Remove book from UI
 document.querySelector('#book-list').addEventListener('click',(e) =>{
     UI.deleteBook(e.target);

     // remove book from storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
     UI.showAlert('Book removed successfully', 'success');
 })
