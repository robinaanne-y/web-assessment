
var slideIndex = 1;

function navResponse() {
    var x = document.getElementById("nav");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
}


showSlides(slideIndex);

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

readTextFile("data/products.json", function(text){
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