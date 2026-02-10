// json 
const snacks = [
  {
    id: 1,
    title: "Попкорн карамельный",
    description: "Сладкий попкорн. Размеры S / M / L",
    price: 1100,
    image: "../images/popcorn.jpg"
  },
  {
    id: 2,
    title: "Начос",
    description: "Хрустящие чипсы с томатным соусом",
    price: 1690,
    image: "../images/nachos.jpg"
  },
  {
    id: 3,
    title: "Мороженое",
    description: "Множество выбора на каждый вкус!",
    price: 1200,
    image: "../images/icecream.jpg"
  }
];

const drinks = [
  {
    id: 4,
    title: "Кола и спрайт",
    description: "0.3 / 0.5 / 0.8",
    price: 790,
    image: "../images/cola.jpg"
  },
  {
    id: 5,
    title: "Кофе",
    description: "Латте / капучино",
    price: 890,
    image: "../images/coffe.jpg"
  },
  {
    id: 6,
    title: "Сок",
    description: "Свежевыжатые соки",
    price: 900,
    image: "../images/juice.jpg"
  }
];

const burgers = [
  {
    id: 7,
    title: "Бургер классический",
    description: "Говядина / сыр",
    price: 2190,
    image: "../images/burger.jpg"
  },
  {
    id: 8,
    title: "Чикен бургер",
    description: "Курица / соус",
    price: 1990,
    image: "../images/chickenburger.jpg"
  },
  {
    id: 9,
    title: "Картофель фри",
    description: "Соус на выбор",
    price: 990,
    image: "../images/fries.jpg"
  }
];

// dom
const snacksContainer = document.getElementById("snacks-container");
const drinksContainer = document.getElementById("drinks-container");
const burgersContainer = document.getElementById("burgers-container");

// vyvod kartochek (funkciya 1)
function renderCards(list, container) {
  container.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    container.innerHTML += `
      <article class="card card--snack">
        <div class="card__media">
          <img src="${list[i].image}" alt="${list[i].title}">
        </div>
        <div class="card__body">
          <h3 class="card__title">${list[i].title}</h3>
          <p class="card__meta">${list[i].description}</p>
          <div class="card__footer">
            <span class="price">${list[i].price} ₸</span>
           <button 
            class="btn btn--small btn--ghost"
            onclick="calculateTotal(${list[i].price})"> Заказать </button>
          </div>
        </div>
      </article>
    `;
  }
}

let isFiltered = false;

// filtr deshevych (funkciya 2)
function filterCheap(list) {
  const cheap = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i].price <= 1000) {
      cheap.push(list[i]);
    }
  }

  return cheap;
}

function showCheapSnacks() {
  if (!isFiltered) {
    const cheapSnacks = filterCheap(snacks);
    const cheapDrinks = filterCheap(drinks);
    const cheapBurgers = filterCheap(burgers);

    renderCards(cheapSnacks, snacksContainer);
    renderCards(cheapDrinks, drinksContainer);
    renderCards(cheapBurgers, burgersContainer);

    cheapBtn.textContent = "Показать все";
    isFiltered = true;
  } else {
    renderCards(snacks, snacksContainer);
    renderCards(drinks, drinksContainer);
    renderCards(burgers, burgersContainer);

    cheapBtn.textContent = "До 1000 ₸";
    isFiltered = false;
  }
}
// click
const cheapBtn = document.getElementById("cheap-btn");

if (cheapBtn) {
  cheapBtn.addEventListener("click", showCheapSnacks); 

}

let totalPrice = 0;

// raschet stoimosti (funkciya 3)
function calculateTotal(price) {
  totalPrice = totalPrice + price;
  alert("Сумма заказа: " + totalPrice + " ₸");
}

const resetBtn = document.getElementById("reset-btn");

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    totalPrice = 0;
    alert("Заказ сброшен. Сумма: 0 ₸");
  });
}

// vyvod pri zagruzke stranicy

if (snacksContainer) {
  renderCards(snacks, snacksContainer);
}
if (drinksContainer) {
  renderCards(drinks, drinksContainer);
}
if (burgersContainer) {
  renderCards(burgers, burgersContainer);
}


// forma i validaciya
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const agree = document.getElementById("agree").checked;

    if (name === "" || email === "") {
      alert("Заполните все поля");
      return;
    }

    if (!email.includes("@")) {
      alert("Введите корректный email");
      return;
    }

    if (agree === false) {
      alert("Подтвердите согласие");
      return;
    }

    alert("Заявка отправлена!");
    form.reset();
  });
}

// схема zala 
const hallModal = document.getElementById("hall-modal");
const hallClose = document.getElementById("hall-close");
const hallButtons = document.querySelectorAll(".open-hall");

for (let i = 0; i < hallButtons.length; i++) {
  hallButtons[i].addEventListener("click", function () {
    hallModal.classList.add("active");
  });
}

hallClose.addEventListener("click", function () {
  hallModal.classList.remove("active");
});

hallModal.addEventListener("click", function (event) {
  if (event.target.classList.contains("hall-modal__overlay")) {
    hallModal.classList.remove("active");
  }
});
