const myLibrary = [];

const container = document.querySelector("#container");

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  
    this.info = function(){
      return title+"\n"+author+"\n"+pages+"\n"+read;
    }
  }
  
  const hobbit = new Book("The Hobbit","J.R.R Tolkien",295,"not read yet");
  const book2 =  new Book("Book2","Book2",20,"Read");
  
  myLibrary.push(hobbit,book2);

  

  function createCard(){
    

    myLibrary.forEach((book) => {
                                const div = document.createElement('div');
                                div.setAttribute('style',`
                                                        height:250px;
                                                        width:250px;
                                                        border: 1px solid black;
                                                        `);
                               div.setAttribute('id',book.title);
                               div.innerText = book.info();

                               
                               container.append(div);
                               createDeleteBtn(div,book.title);
                               
                              }
                    );
    
  }

  function createDeleteBtn(div, id){
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('style', `height: 20px;
                                     width: 50px;
                                     background: white;
                                     padding: 3px;
                                     margin: 0;`
                          );
    deleteBtn.textContent = "Delete"
    deleteBtn.setAttribute('id','delete')
    div.append(deleteBtn);

    deleteBtn.addEventListener('click',deleteBook(id));
  }

  function deleteBook(d){
    return function(){
      const id = document.getElementById(d)
      id.parentNode.removeChild(id);
      const index = myLibrary.findIndex(object => {
        return object.title === d;
      });
      console.log(d +" index:" +index);

      if(index > -1){
        myLibrary.splice(index,1);
      }

      console.log(myLibrary);
    }
  }

  createCard();

  const showDialogBtn = document.getElementById("showDialog");
  const addBookDialog = document.getElementById("addBookDialog");
  const titleInput = addBookDialog.querySelector("#title");
  const authorInput = addBookDialog.querySelector("#author");
  const pagesInput = addBookDialog.querySelector("#pages");
  const readInput = addBookDialog.querySelector("#read");

  const confirmBtn = addBookDialog.querySelector("#addBtn");

  
  showDialogBtn.addEventListener('click', ()=>{
    addBookDialog.showModal();
  });

  confirmBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = (readInput.checked) ? "Read" : "Not read";

    addBookToLibrary(title,author,pages,read);

    addBookDialog.close();
  });

  addBookDialog.addEventListener("close", (e) => {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
  });

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  container.innerHTML = "";
  createCard();
}