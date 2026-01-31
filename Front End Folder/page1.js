/*function isLoggedIn(){
    return localStorage.getItem("isLoggedIn") === "true";
}

function protectPage(event){
    if(isLoggedIn() === false){
        event.preventDefault();
        alert("Please sign up first then enter website");
        window.location.href = "Signup Page/signup.html";
    }
}


document.querySelectorAll("a[href = 'Shop now/index.html'], a[href = 'contact us/contact-us.html'], .hero-buttons a, .btn-primary").forEach((btn) =>{
    btn.addEventListener("click", protectPage);
});*/












// ========================= BACKEND URL =========================
// Yahan apna backend ka URL set karo
// Agar local me run kar rahe ho to "http://localhost:5000"



// Backend base URL
const BACKEND_URL = "http://localhost:5000/api/home";





// ================= AUTH CHECK FUNCTION =================
// ye check karta hai ky user login hai ya nahi
function isLoggedIn() {
     // localStorage me 'isLoggedIn' key true hai ya nahi
    return localStorage.getItem("isLoggedIn") === "true";
}

// ================= NAVBAR BUTTON UPDATE =================
// Navbar buttons ko update karta hai login ke hisaab se
function updateNavbarButtons() {
    const signInBtn = document.getElementById("signupBtn"); // Sign In button
    const signOutBtn = document.getElementById("signoutBtn"); // Sign Out button

    if (!signInBtn || !signOutBtn) return; // Agar buttons exist nahi karte to return

    if (isLoggedIn()) {
        signInBtn.style.display = "none"; // Sign In chhupao
        signOutBtn.style.display = "inline-block"; // Sign Out dikhao
    } else {
        signInBtn.style.display = "inline-block"; // Sign In dikhao
        signOutBtn.style.display = "none"; // Sign Out chhupao
    }
}

// ================= PROTECTED BUTTONS =================
// Ye ensure karta hai ki protected pages pe user login ho tabhi jaa sake
function setupProtectedButtons() {
    const protectedButtons = document.querySelectorAll(
        "a[href='Shop now/index.html'], a[href='contact us/contact-us.html'], .hero-buttons a, .btn-primary"
    );

    protectedButtons.forEach(btn => {
        // Sign In button ko ignore karo
        if (btn.id === "signupBtn") return;

        // Remove old event listener (important)
        btn.replaceWith(btn.cloneNode(true));
    });

    const freshButtons = document.querySelectorAll(
        "a[href='Shop now/index.html'], a[href='contact us/contact-us.html'], .hero-buttons a, .btn-primary"
    );

    freshButtons.forEach(btn => {
        if (btn.id === "signupBtn") return; // Sign In button ignore karo

        btn.addEventListener("click", function(event) {
            if (!isLoggedIn()) { // agar user login nahi hai
                event.preventDefault(); // page redirect stop karo
                alert("Pehle Sign In karo, phir website use kar saktay ho");
                window.location.href = "Signup page/signup.html"; // sign in page pe bhejo
            }
        });
    });
}



// ================= SIGN OUT LOGIC =================
// Ye user ko sign out karne ka logic hai
const signOutBtn = document.getElementById("signoutBtn");
if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn"); // Login flag remove karo 
        alert("You are logged out successfully"); // Message show karo
        window.location.reload(); // Page ko refresh karo taky buttons update ho jaye
    });
}







// ================= PAGE LOAD =================
// Page load hote hi buttons update aur protected buttons setup ho jaye

updateNavbarButtons();
setupProtectedButtons();


// Example: tumhare frontend me ek button ya form ho → waha ye code lagao

document.getElementById("addProductBtn").addEventListener("click", () => {
    fetch("http://localhost:5000/api/home/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "iPhone 17",
            price: 1500,
            image: "https://example.com/iphone17.jpg",
            description: "Latest iPhone 17 model",
            rating: 5,
            category: "Phone",
            tag: "Gen-17"
        })
    })
    .then(res => res.json())
    .then(data => console.log("Product added:", data))
    .catch(err => console.error("Error:", err));
});
















// ================= SEARCH FUNCTIONALITY =================
const searchInput = document.getElementById("search-input"); // Search input field
const searchIcon = document.getElementById("search-icon"); // Search button/icon

/*const availablePhones = [
    "Iphone 13","Iphone 13 Mini","Iphone 13 Pro","Iphone 13 Pro Max",
    "Iphone 14","Iphone 14 Pro","Iphone 14 Pro Max",
    "Iphone 15","Iphone 15 Pro","Iphone 15 Pro Max",
    "Iphone 16","Iphone 17"
];*/





// Ye Backend Ka Code Hai Teek Hai. Yaha Sy start howa hai

// Search icon pe click hone par ye function chalega
searchIcon.addEventListener("click", async function () {
    const query = searchInput.value.trim(); // Input me jo text type hua wo le lo
    if (query === "") { // Agar empty ho
        alert("Pehle phone ka naam type karo"); // Alert dikhado
        return;
    }

    try {
        // Backend se products fetch karo
        const res = await fetch(`${BACKEND_URL}/products`); // GET request backend ke /products route pe
        const products = await res.json(); // JSON me convert karo

        // Backend data me search karo
        const found = products.some(product => product.name.toLowerCase() === query.toLowerCase());

        if (found) {
            // Phone available → Products page par redirect
            window.location.href = `Shop now/index.html?search=${encodeURIComponent(query)}`;
        } else {
            alert(query + " available nahi hai"); // Agar product nahi mila to alert
        }

    } catch (err) { // Agar backend connect nahi hua
        console.error(err); // Console me error show karo
        alert("Backend se connect nahi ho paaya");  // Alert user ko dikhao
    }

    searchInput.value = "";  // Alert user ko dikhao
});

/*
3️⃣ Explanation simple Urdu me

Pehle array availablePhones ko use kar ke search hota tha — ye sirf frontend me tha.

Ab hum backend ke products API (GET /products) se data fetch karte hain.

Phir jo data backend se aya, usi me search karte hain.

Agar product mil gaya → products page redirect

Agar product nahi mila → alert "available nahi hai"
*/









// ========================= DYNAMIC PRODUCTS RENDER (NEW) =========================
async function loadProducts() {
    try {
        const res = await fetch(`${BACKEND_URL}/products`); // Backend se products
        const products = await res.json(); // JSON me convert

        const productGrid = document.querySelector(".product-grid"); // Grid jahan products render honge
        productGrid.innerHTML = ""; // Pehle ke static products remove karo

        // Har product ke liye HTML create karo
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card"); // Card ka style

            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-information">
                    <div class="product-tag">${product.gen}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-footer">
                        <div class="product-price">$${product.price}</div>
                        <div class="rating">
                            ${renderStars(product.rating)}
                        </div>
                    </div>
                </div>
            `;

            productGrid.appendChild(card); // Grid me add karo
        });

    } catch (err) {
        console.error(err);
        alert("Products load nahi ho paaye backend se");
    }
}

// ========================= HELPER FUNCTION FOR STARS =========================
function renderStars(rating) {
    // Ye function stars HTML create karta hai
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHTML += `<i class="fa-solid fa-star"></i>`; // Full star
        } else if (i - rating < 1) {
            starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`; // Half star
        } else {
            starsHTML += `<i class="fa-regular fa-star"></i>`; // Empty star
        }
    }
    return starsHTML;
}

// Page load hote hi products backend se load karo
loadProducts();

/* 
✅ Ab kya hota hai:

Products ka HTML static se dynamic ho gaya.

Backend ke /products route se data fetch hoke page pe render hota.

Rating ke stars bhi backend se aaye number ke hisaab se render honge.

Old static product cards ko remove kar diya aur backend se replace kiya.

Search functionality backend se match karti hai.
*/




// Backend End Ho Gaya Yaha Per






















/*searchIcon.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query === "") {
        alert("Pehle phone ka naam type karo");
        return;
    }

    const found = availablePhones.some(phone => phone.toLowerCase() === query.toLowerCase());

    if (found) {
        // Phone available → Products page par redirect
        window.location.href = `Shop now/index.html?search=${encodeURIComponent(query)}`;
    } else {
        alert(query + " available nahi hai ❌");
    }

    searchInput.value = "";
});*/














// ================= HAMBURGER MENU LOGIC =================

// hamburger icon lena
const hamburger = document.getElementById("hamburger");

// nav aur buttons lena
const nav = document.querySelector("nav");
const navButtons = document.querySelector(".nav-buttons");

// click event
hamburger.addEventListener("click", () => {

    // nav ko show / hide karna
    nav.classList.toggle("active");

    // buttons ko show / hide karna
    navButtons.classList.toggle("active");
});












// ================= MOBILE MENU AUTO CLOSE =================

// jab koi link click ho jaye to menu band ho jaye
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        navButtons.classList.remove("active");
    });
});









// Step 1: Fetch all products from backend
fetch("http://localhost:5000/api/home/products")
  .then(response => response.json())
  .then(data => {
      console.log(data);
      const productsDiv = document.getElementById("products");
      data.forEach(product => {
          const p = document.createElement("p");
          p.textContent = `${product.name} - $${product.price}`;
          productsDiv.appendChild(p);
      });
  })
  .catch(error => console.error("Error:", error));

