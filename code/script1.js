// Створіть сайт з коментарями. Коментарі тут : https://jsonplaceholder.typicode.com/
// Сайт має виглядати так : https://kondrashov.online/images/screens/120.png
// На сторінку виводити по 10 коментарів, у низу сторінки зробити поле пагінації (перемикання сторінок) при перемиканні
// сторінок показувати нові коментарі.
// з коментарів виводити :
// "id": 1,
// "name"
// "email"
// "body":



const elementList = document.querySelector("#list");
const loader = document.querySelector(".box-loader");
const dateText = `Comment Date: <br> ${new Date().getFullYear()}-${
    new Date().getMonth() < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1
  }-${new Date().getDate()}`;


async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
    return data;
  }

async function main() {
    const postsData = await getData();
    let currentPage = 1;
    let rows = 10;
  
    function displayList(arrData, rowPerPage, page) {
      const postsEl = document.querySelector('#comments');
      postsEl.innerHTML = "";
      page--;
  
      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);
  

      paginatedData.forEach((el) => {
        const commentBox = `
        <div class="comment-box">
        <p>${el.id}</p>
  
        <div class="name-box"> 
        <p class="name">${str.ucFirst(el.name)}</p>
        <p class="date">${dateText}</p>
        </div>
  
        <div class="email">
          <p>email</p>
          <a href="mailto:${el.email}">${el.email}</a>
        </div>
        <div class="comment">${str.ucFirst(el.body)}</div>
       </div>`;
  
        document.querySelector("#comments").insertAdjacentHTML("beforeend", commentBox);

      })
    }

    function displayPagination(arrData, rowPerPage) {
      const paginationEl = document.querySelector('.pagination');
      const pagesCount = Math.ceil(arrData.length / rowPerPage);
      const ulEl = document.createElement("ul");
      ulEl.classList.add("pagination__list");
    
      for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl)
      }
      paginationEl.appendChild(ulEl)
    }
  
    function displayPaginationBtn(page) {
      const liEl = document.createElement("li");
      liEl.classList.add('pagination__item')
      liEl.innerText = page
  
      if (currentPage == page) {
        liEl.classList.add('pagination__item--active')
    };
  
      liEl.addEventListener('click', () => {
        currentPage = page
        displayList(postsData, rows, currentPage)
  
        let currentItemLi = document.querySelector('li.pagination__item--active');
        currentItemLi.classList.remove('pagination__item--active');
  
        liEl.classList.add('pagination__item--active');
      })
  
      return liEl;
    }

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
    
  }
  
  main();

// -----------------------------------------------------
class MyString {
    constructor() {
    }
      ucFirst(str){
        let newStr = str[0].toUpperCase() + str.slice(1);
        return newStr;
    };
}
const str = new MyString();

