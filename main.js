const btn = document.getElementById("btn");
const spn = document.querySelector(".spanCls");
const emptyBasket = document.querySelector(".emptyBasket");
const emptyBasketMobile = document.querySelector(".emptyBasketMobile");
var itemTag = "";
const renk_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
if (emptyBasketMobile != null) {
  emptyBasketMobile.addEventListener("click", () => {
    console.log("Insanin Aptalligi sonsouz");
    localStorage.removeItem("cardNumber");
    localStorage.removeItem("prod");
    localStorage.removeItem("prode");
    localStorage.removeItem("totalp");
    console.log("Insanin Aptalligi sonsouz");
    location.reload();
    document.location.href = "/index.html";
  });
}

try {
  emptyBasket.addEventListener("click", () => {
    console.log("Insanin Aptalligi sonsouz");
    localStorage.removeItem("cardNumber");
    localStorage.removeItem("prod");
    localStorage.removeItem("prode");
    localStorage.removeItem("totalp");
    console.log("Insanin Aptalligi sonsouz");
    location.reload();
    document.location.href = "/index.html";
  });
} catch (error) {
  console.log("error", error);
}
try {
  btn.addEventListener("click", () => {
    let HexColor = "#";
    for (let i = 0; i < 6; i++) {
      HexColor += renk_list[getRandomNumber()];
    }
    document.body.style.backgroundColor = HexColor;
    spn.textContent = HexColor;
    console.log("Hello", HexColor);
  });
} catch (err) {
  alert(`${err}`);
}
function getRandomNumber() {
  return Math.floor(Math.random() * renk_list.length);
}

const div_el = document.querySelector(".sliding_window");
const icon = document.getElementById("ic");
const spanCard = document.querySelector(".spnCrd");
var spanCardMobile = document.querySelector(".spnCrdMobil");
const productList = [
  { name: "Notebook", tag: "notebook", price: "15", inCard: 0 },
  { name: "Moon", tag: "moon", price: "100", inCard: 0 },
  { name: "Ties", tag: "ties", price: "15", inCard: 0 },
  { name: "Shoes", tag: "shoes", price: "35", inCard: 0 },
];
icon.addEventListener("click", () => {
  if (div_el.classList.contains("addition")) {
    div_el.classList.remove("addition");
  } else {
    div_el.classList.add("addition");
  }
});

const catrs = document.querySelectorAll(".crdImg");
for (let i = 0; i < catrs.length; i++) {
  catrs[i].addEventListener("click", () => {
    addLocalStorage(productList[i]);
    totalCostClaculation(productList[i]);
  });
}

function onLoadPage() {
  var spanCardMobile = document.querySelector(".spnCrdMobil");
  let productNumber = parseInt(localStorage.getItem("cardNumber"));
  if (productNumber) {
    localStorage.setItem("cardNumber", productNumber);
    spanCard.textContent = productNumber;
    if (spanCardMobile != null) {
      spanCardMobile.textContent = productNumber;
    }
  }
}

function addLocalStorage(product) {
  let productNumber = parseInt(localStorage.getItem("cardNumber"));

  if (productNumber) {
    localStorage.setItem("cardNumber", productNumber + 1);
    spanCard.textContent = productNumber + 1;
    spanCardMobile.textContent = productNumber + 1;
  } else {
    localStorage.setItem("cardNumber", 1);
    spanCard.textContent = 1;
    spanCardMobile.textContent = productNumber + 1;
  }
  changeInCardNumber(product);
}

function changeInCardNumber(product) {
  let cartItem = localStorage.getItem("prod");

  cartItem = JSON.parse(cartItem);

  if (cartItem != null) {
    if (cartItem[product.tag] == undefined) {
      cartItem[product.tag] = product;
      // cartItem = {
      //   ...cartItem,
      //   [product.tag]: product,
      // };
    }
    cartItem[product.tag].inCard += 1;
  } else {
    cartItem = {};
    product.inCard = 1;
    cartItem[product.tag] = product;
  }

  // if (cartItem != null) {
  //   if (cartItem[product.tag] == undefined) {
  //     cartItem = {
  //       ...cartItem,
  //       [product.tag]: product,
  //     };
  //   }
  //   cartItem[product.tag].inCard += 1;
  // } else {
  //   product.inCard = 1;
  //   cartItem = {
  //     [product.tag]: product,
  //   };
  // }

  localStorage.setItem("prod", JSON.stringify(cartItem));
  console.log("deb", localStorage.getItem("prod"));
}
function totalCostClaculation(product) {
  let totalPrice = localStorage.getItem("totalp");
  totalPrice = parseInt(totalPrice);

  if (totalPrice != null && !isNaN(totalPrice)) {
    totalPrice = parseInt(totalPrice);

    localStorage.setItem("totalp", totalPrice + parseInt(product.price));
  } else {
    localStorage.setItem("totalp", product.price);
  }

  console.log("muhitttin", totalPrice);
}
//resetItem();

function displayChart() {
  let cartItems = localStorage.getItem("prod");
  let totalPrice = localStorage.getItem("totalp");
  let totalPriceSpan = document.getElementById("totalSpan");
  cartItems = JSON.parse(cartItems);
  var tableBody = document.getElementById("tableBody");
  var tableHead = document.getElementById("tableHead");
  var Index = "Index";
  var Img = "Image";
  var Name = "Name";
  var Quantity = "Quantity";
  var Total = "Total";

  var tableBodyItems = "";
  var cover = "No Cover";
  var tableHeadItemsHorizonta = "";

  if (cartItems) {
    if (screenBorder.matches) {
      tableHeadItemsHorizontal = `<tr>
      <th>${Index}</th>
      <th>${Img}</th>
      <th>${Name}</th>
      <th>${Quantity}</th>
      <th>${Total}</th>
    </tr>`;
      let dataFetch = Object.values(cartItems).map((item, index) => {
        tableBodyItems += `<tr><td>${index + 1}</td><td><img src='images/${
          item.tag
        }.jpg' style="width:100px;height:60px;"></td><td>${
          item.name
        }</td><td><i onclick=Increase('${
          item.tag
        }','increase') class="fas fa-arrow-circle-right"></i><span>${
          item.inCard
        }
            </span><i onclick=Increase('${
              item.tag
            }','decrease') class="fas fa-arrow-circle-left"></i></td><td>${
          parseInt(item.price) * item.inCard
        }</td></tr>`;
      });
      if (tableHead != null && tableBody != null) {
        tableHead.innerHTML = tableHeadItemsHorizontal;
        tableBody.innerHTML = tableBodyItems;
        totalPriceSpan.textContent = totalPrice + " $";
      }
    } else {
      let dataFetch = Object.values(cartItems).map((item, index) => {
        tableBodyItems += `</div></tr><tr><td>${Index}</td><td>${
          index + 1
        }</td></tr>
        <tr><td>${Img}</td><td><img src='images/${
          item.tag
        }.jpg' style="width:100px;height:60px;"></td></tr>
        <tr><td>${Name}</td><td>${item.name}</td></tr>
        <tr><td>${Quantity}</td><td><i onclick=Increase('${
          item.tag
        }','increase') class="fas fa-arrow-circle-right"></i><span>${
          item.inCard
        }
        </span><i onclick=Increase('${
          item.tag
        }','decrease') class="fas fa-arrow-circle-left"></i></td></tr><tr><td>${Total}</td></td><td>${
          parseInt(item.price) * item.inCard
        }</td></tr>`;
      });
      if (tableHead != null && tableBody != null) {
        tableHead.innerHTML = "";
        tableBody.innerHTML = tableBodyItems;
        totalPriceSpan.textContent = totalPrice + " $";
      }
    }
  }
}
function Increase(name, inc) {
  console.log("arrtttttttit", inc);
  let cartItem = localStorage.getItem("prod");
  let totalPrice = localStorage.getItem("totalp");
  totalPrice = parseInt(totalPrice);
  let cominData = JSON.parse(cartItem);
  let productNumber = parseInt(localStorage.getItem("cardNumber"));

  if (inc === "increase") {
    cominData[name].inCard += 1;
    localStorage.setItem(
      "totalp",
      totalPrice + parseInt(cominData[name].price)
    );
    localStorage.setItem("cardNumber", productNumber + 1);
    spanCard.textContent = productNumber + 1;
  } else if (inc === "decrease") {
    cominData[name].inCard -= 1;

    localStorage.setItem(
      "totalp",
      totalPrice - parseInt(cominData[name].price)
    );
    localStorage.setItem("cardNumber", productNumber - 1);
    spanCard.textContent = productNumber - 1;
    if (spanCardMobile != null) {
      spanCardMobile.textContent = productNumber - 1;
    }
  }

  let newValue = cominData[name];
  localStorage.setItem("prod", JSON.stringify(cominData));
  location.reload();
}
window.onload = () => {
  displayChart();
};

var screenBorder = window.matchMedia("(min-width:900px)");
screenBorder.addListener(displayChart);
onLoadPage();
