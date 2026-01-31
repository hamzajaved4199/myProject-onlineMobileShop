// ===== SIGNUP PAGE JAVASCRIPT =====

// Signup form pakar liya
let signupForm = document.querySelector("form");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Page reload na ho

    // Form values aur extra spaces hata diye
    let email = document.querySelector("#email").value.trim();
    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value.trim();
    let confirmPassword = document.querySelector("#conformPassword").value.trim();

    // ========== BASIC VALIDATION ==========
    if (email === "" || username === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields");
        return;
    }

    if (password.length < 7) {
        alert("Password must be at least 7 characters");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // ========== SIGNUP SUCCESS ==========
    // User ne signup kar liya, proof localStorage me save
    localStorage.setItem("isLoggedIn", "true");

    alert("Signup Successful! Welcome to Website");

    // Form reset kar diya
    signupForm.reset();

    window.location.href = "../index.html";
});

// Page load par form reset taake purani values na dikhen
window.addEventListener("load", function () {
    signupForm.reset();
});