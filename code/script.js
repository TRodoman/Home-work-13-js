// Виконати запит на https://swapi.dev/api/people (https://starwars-visualguide.com) отримати 
// список героїв зіркових воєн.

// Вивести кожного героя окремою карткою із зазначенням. картинки Імені, статевої приналежності, 
// ріст, колір шкіри, рік народження та планету на якій народився.
           
// Створити кнопку зберегти на кожній картці. 
// При натисканні кнопки записуйте інформацію у браузері


const elementList = document.querySelector('#list');
const elementUl = elementList.querySelector('ul');
const elementBtn = elementList.querySelector(".btn");
const loader = document.querySelector(".box-loader");


document.getElementById("btnGet").onclick = function () {
  function getServer(url, callback = () => {}) {
    loader.classList.add("show");
    const ajax = new XMLHttpRequest();
    ajax.open("get", url);
    ajax.send();
    ajax.addEventListener("readystatechange", () => {
      if (ajax.readyState === 4 && ajax.status >= 200 && ajax.status < 300) {
        callback(JSON.parse(ajax.response));
        loader.classList.remove("show");
      } else if (ajax.readyState === 4) {
        throw new Error(
          `Помилка у запиті на сервер : ${ajax.status} / ${ajax.statusText}`
        );
      }
    });
  }



  function showExchange(data = []) {
    console.log(data);
    let peoples = data.results;
    peoples.forEach(({name, gender, height, skin_color, birth_year, homeworld }, i) => {
    
      const peopleBox = `
      <li><span class="title">
      <img class="photo"src="https://starwars-visualguide.com/assets/img/characters/${i+1}.jpg" alt="">
      <h2>${name}</h2></span>
      <span>Стать:&nbsp; ${gender}</span>
      <span>Зріст:&nbsp; ${height}</span>
      <span>Колір шкіри: &nbsp; ${skin_color}</span>
      <span>Рік народження:&nbsp; ${birth_year}</span>
      <a href="${homeworld}" target="_blank">Народився на планеті</a>
      <button class="btn" onclick="localStorageBox ()">Зберігти</button> </li>`
      

      document.querySelector("#peoples").insertAdjacentHTML("beforeend", peopleBox);

      loader.classList.remove("show");
    });
    
  }
  
  getServer("https://swapi.dev/api/people/?format=json", showExchange);
};


function updateStorage() {
  const data = [];
  for (let element of elementUl.querySelectorAll('li')) {
    data.push(element.textContent);
  }
  localStorage['items'] = JSON.stringify(data);
}


function localStorageBox (){
const elementsLi = elementUl.querySelectorAll('li');
  updateStorage();
}


window.onstorage = event => {
  updateUl(JSON.parse(event.newValue));
}

