let priceProduct1: any = document.getElementById("priceProduct1");
let quantityProduct1: any = document.getElementById("quantityProduct1");
let totalPriceProduct1: any = document.getElementById("totalPriceProduct1");

let priceProduct2: any = document.getElementById("priceProduct2");
let quantityProduct2: any = document.getElementById("quantityProduct2");
let totalPriceProduct2: any = document.getElementById("totalPriceProduct2");

let priceProduct3: any = document.getElementById("priceProduct3");
let quantityProduct3: any = document.getElementById("quantityProduct3");
let totalPriceProduct3: any = document.getElementById("totalPriceProduct3");

let pastBuyers: string[] = [];

function updateStock() {
  totalPriceProduct1.innerHTML = totalprice(
    quantityProduct1.innerHTML,
    priceProduct1.innerHTML
  );

  totalPriceProduct2.innerHTML = totalprice(
    quantityProduct2.innerHTML,
    priceProduct2.innerHTML
  );

  totalPriceProduct3.innerHTML = totalprice(
    quantityProduct3.innerHTML,
    priceProduct3.innerHTML
  );
}
updateStock();

document.querySelector(".form-add").addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let product = formData.get("productRecieved");
  let items = formData.get("itemsRecieved");
  let priceForOne = formData.get("pricePerItem");
  switch (product) {
    case "product1":
      addStock(quantityProduct1, priceProduct1, items, priceForOne);
      break;
    case "product2":
      addStock(quantityProduct2, priceProduct2, items, priceForOne);
      break;
    case "product3":
      addStock(quantityProduct3, priceProduct3, items, priceForOne);
      break;
    case "default":
      alert("Please Select a product, Thank you!");
      abort();
  }
  updateStock();
});

document.querySelector(".form-remove").addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let product = formData.get("productSold");
  let email = formData.get("buyerEmail");
  let total = formData.get("itemsSold");
  switch (product) {
    case "product1":
      removeStock(quantityProduct1, email, total);
      break;
    case "product2":
      removeStock(quantityProduct2, email, total);
      break;
    case "product3":
      removeStock(quantityProduct3, email, total);
      break;
    case "default":
      alert("Please Select a product, Thank you!");
      abort();
  }
  updateStock();
});

function addStock(pro, pricePro, items, newPrice) {
  if (items != null) {
    let currentStock: number = pro.innerHTML;
    currentStock = currentStock + items;
    pro.innerHTML = currentStock;
    if (priceForOne != null) {
      pricePro.innerHTML = newPrice;
    }
    alert("Success!");
  }
}

function removeStock(pro, email, total) {
  if (email != null) {
    checkMail(email);
    pastBuyers.push(email);
  } else {
    alert("No email was given!");
  }
  if (total != null) {
    let currentStock = pro.innerHTML;
    currentStock = parseInt(currentStock) - parseInt(total);
    if (currentStock < 0) {
      alert("Not Enough Stock!!");
      abort();
    } else {
      pro.innerHTML = currentStock;
      alert("Success!");
    }
  }
}

function checkMail(email) {
  for (let i = 0; i < pastBuyers.length; i++) {
    console.log(pastBuyers[i]);
    if (pastBuyers[i] == email) {
      alert("This user already made a previose purchase");
      abort();
    }
  }
}

function totalprice(quantity, price) {
  return quantity * price;
}
