/*const carticon = document.querySelector("#cart-icons");
const cart = document.querySelector(".cart");
const cartclose = document.querySelector("#cart-close");
carticon.addEventlistener("click", () => cart.classList.add("active"));
cartclose.addEventListener("click", () => cart.classList.remove("active"));*/


const cartIcon = document.querySelector("#cart-icons");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
});

const addCartButtons= document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event =>{
        const productBox =event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content")
const addToCart = productBox =>{
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItems){
        if(item.textContent=== productTitle){
            alert("This item if already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">${productPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>

                <i class="fa-solid fa-trash-can  cart-remove"></i>
               
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);
        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id ==="decrement" && quantity > 1){
            quantity--;
            if (quantity===1){
                decrementButton.style.color ="#999";

            }
        }else if (event.target.id === "increment"){
            quantity++;
            decrementButton.style.color ="#333";
        }
        numberElement.textContent = quantity;
        updateTotalPrice();
    });

    updateCartCount(1);
    updateTotalPrice();
};


const updateTotalPrice = () =>{
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$", "");
        const quantity = quantityElement.textContent;
        total+=price * quantity;
    });

    totalPriceElement.textContent = `$${total}`;
};

let cartItemCount =0;
const updateCartCount = change =>{
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount> 0){
        cartItemCountBadge.style.visibility ="visible";
        cartItemCountBadge.textContent = cartItemCount;
    }else{
        cartItemCountBadge.style.visibility ="hidden";
        cartItemCountBadge.textContent= "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () =>{
    const cartBoxes= cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0 ){
        alert("Your cart is empty.Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();
    alert("Thank you for your purchase!");
});












/* Search baar ka javascript code hai ye */
/* ===============================
   URL se search value hasil karna
   =============================== */

// URL se query parameter lena
const params = new URLSearchParams(window.location.search);
const searchValue = params.get("search");

/* ===============================
   Saare product boxes lena
   =============================== */

const productBoxes = document.querySelectorAll(".product-box");

let productFound = false;

/* ===============================
   Agar user search ke sath aya hai
   =============================== */

if (searchValue) {

    // search value ko lowercase me convert
    const searchText = searchValue.toLowerCase();

    productBoxes.forEach(product => {

        // har product ka title lena
        const title = product.querySelector(".product-title").innerText.toLowerCase();

        // check: search text product title me hai ya nahi
        if (title.includes(searchText)) {
            product.style.display = "block"; // product show
            productFound = true;             // product mil gaya
        } else {
            product.style.display = "none";  // baqi sab hide
        }
    });

    // agar koi product nahi mila
    if (!productFound) {
        alert("Sorry! Ye phone available nahi hai");

        // sab products wapas show
        productBoxes.forEach(product => {
            product.style.display = "block";
        });
    }
}
























/* =====================================================
   FULL SPECIFICATION DATA (har phone ka full data)
   ===================================================== */

// Yahan hum har phone ki complete specification store kar rahe hain
const phoneSpecs = {
    "iphone 13": [
        "Display: 6.1 inch OLED",
        "Resolution: 2532 x 1170",
        "Chipset: Apple A15 Bionic",
        "RAM: 4GB",
        "Storage: 128GB / 256GB / 512GB",
        "Rear Camera: Dual 12MP",
        "Front Camera: 12MP",
        "Battery: 3240 mAh",
        "OS: iOS",
        "5G Support: Yes"
    ],
    "iphone 13 mini": [
        "Display: 5.4 inch OLED",
        "Chipset: A15 Bionic",
        "RAM: 4GB",
        "Battery: 2438 mAh",
        "Camera: Dual 12MP",
        "5G Support: Yes"
    ],
    "iphone 13 pro": [
        "Display: 6.1 inch OLED 120Hz",
        "Chipset: A15 Bionic",
        "RAM: 6GB",
        "Camera: Triple 12MP",
        "Battery: 3095 mAh",
        "ProMotion Display"
    ],
    "iphone 13 pro max": [
        "Display: 6.7 inch OLED 120Hz",
        "Chipset: A15 Bionic",
        "RAM: 6GB",
        "Battery: 4352 mAh",
        "Camera: Triple 12MP"
    ],
    "iphone 14": [
        "Display: 6.1 inch OLED",
        "Chipset: A15",
        "Camera: Dual 12MP",
        "Battery: 3279 mAh"
    ],
    "iphone 14 pro max": [
        "Display: 6.7 inch OLED 120Hz",
        "Chipset: A16",
        "Camera: 48MP",
        "Battery: 4323 mAh"
    ],
    "iphone 15": [
        "Display: 6.1 inch OLED",
        "Chipset: A16",
        "Camera: 48MP",
        "USB-C Port"
    ],
    "iphone 15 pro max": [
        "Display: 6.7 inch OLED 120Hz",
        "Chipset: A17 Pro",
        "Camera: 48MP Periscope",
        "Titanium Body"
    ]
};


/* =====================================================
   VIEW SPEC BUTTON LOGIC
   ===================================================== */

const specModal = document.getElementById("specModal");
const closeSpec = document.getElementById("closeSpec");
const specTitle = document.getElementById("specTitle");
const specList = document.getElementById("specList");

// Sab view spec buttons ko pakar liya
const viewSpecButtons = document.querySelectorAll(".view-specs-btn");

viewSpecButtons.forEach(button => {
    button.addEventListener("click", () => {

        // jis product ka button click hua
        const productBox = button.closest(".product-box");

        // phone ka title liya
        const phoneName = productBox
            .querySelector(".product-title")
            .innerText
            .toLowerCase();

        // modal title set
        specTitle.innerText = phoneName.toUpperCase() + " - Full Specifications";

        // purani list clear
        specList.innerHTML = "";

        // agar phone ka data available hai
        if (phoneSpecs[phoneName]) {
            phoneSpecs[phoneName].forEach(spec => {
                const li = document.createElement("li");
                li.innerText = spec;
                specList.appendChild(li);
            });
        } else {
            specList.innerHTML = "<li>Specifications not available</li>";
        }

        // modal show
        specModal.style.display = "flex";
    });
});

// close button logic
closeSpec.addEventListener("click", () => {
    specModal.style.display = "none";
});

// background click par bhi close
specModal.addEventListener("click", e => {
    if (e.target === specModal) {
        specModal.style.display = "none";
    }
});
