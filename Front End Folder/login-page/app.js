// ===== LOGIN PAGE JAVASCRIPT =====

// Form ko pakar liya
let loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Page reload na ho

    // Inputs ki values
    let emailOrUsername = document.querySelector("#inp1").value.trim();
    let password = document.querySelector("#inp2").value.trim();

    // ========== BASIC VALIDATION ==========
    if (emailOrUsername === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    if (password.length < 7) {
        alert("Password must be at least 7 characters");
        return;
    }


    // ========== LOGIN SUCCESS ==========
    localStorage.setItem("isLoggedIn", "true"); // User logged in
    alert("You are logged in successfully");

    // Home page par redirect
    window.location.href = "../index.html";
});