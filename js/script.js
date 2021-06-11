
var slideIndex = 1;
var cart = {
    items: []
};

showSlides(slideIndex);

function navResponse() {
    var x = document.getElementById("nav");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("carousel__slide");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); 
}

/** PRODUCTS */
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("data/products.json", function(text) {
    var data = JSON.parse(text).product;

    var row = document.createElement("div");
    row.className = "row";

    for(var i = 0; i < data.length; i++) {
        
        var col = document.createElement("div");
        col.className = "col-2";
        var h4 = document.createElement("h4");
        var img = document.createElement("img");
        var price = document.createElement("p");
        var addBtn = document.createElement("button");
        addBtn.classList.add(['btn']);
        addBtn.classList.add(['btn-primary']);

        h4.innerHTML = data[i]['name'];
        img.src = data[i]['image'];
        price.innerHTML = "₱" + data[i]['price'];
        addBtn.innerHTML = "Add to cart";
        addBtn.style.width = "100%";

        let product = data[i];
        addBtn.onclick = function() {
            addToCart(product);
        }
        
        

        col.appendChild(img);
        col.appendChild(h4);
        col.appendChild(price);
        col.appendChild(addBtn);
        row.appendChild(col);
    }

    var productContainer = document.getElementById("products");
    productContainer.innerHTML = "";
    productContainer.appendChild(row);

});

function addToCart(product) {
    var quantity = getQty(this.cart.items, product.name);
    if(quantity == 1) {
        this.cart.items.push({
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }
    
    createTable();
}

function getQty(items, value) {
    for (var index = 0; index < items.length; index++) {

        var item = items[index];
       
        if(item.name == value){
            this.cart.items[index].quantity = item.quantity + 1;
            return this.cart.items[index].quantity;
        }
    }

    return 1;
}

function createTable() {
    var items = this.cart.items;
    var total = 0;
    var table = document.getElementById("cart__table");
    table.innerHTML = "";

    
    var row = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "Product";
    row.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "Price";
    row.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "Quantity";
    row.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "Subtotal";
    row.appendChild(th);

    table.appendChild(row);

    for (var index = 0; index < items.length; index++) {
        var row = document.createElement("tr");
        var col = document.createElement("td");
        col.innerHTML = items[index].name;
        row.appendChild(col);

        var col = document.createElement("td");
        col.innerHTML = "₱" + items[index].price;
        row.appendChild(col);

        var col = document.createElement("td");
        col.innerHTML = items[index].quantity;
        row.appendChild(col);

        var subtotal = (items[index].quantity * parseFloat(items[index].price));
        total += subtotal;
        var col = document.createElement("td");
        col.innerHTML = "₱" + parseFloat(subtotal).toFixed(2);
        row.appendChild(col);

        table.appendChild(row);
    }

    var totalSpan = document.getElementById("total");
    var checkoutBtn = document.getElementById("checkoutBtn");
    if(total > 0) {
        totalSpan.innerHTML = "Total: ₱" + parseFloat(total).toFixed(2);
        checkoutBtn.style.display = "block";
    }
}


/** CART MODAL */
var modal = document.getElementById("cartModal");
var btn = document.getElementById("cartBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
