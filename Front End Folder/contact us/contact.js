
  //Is sy Me Form ko select kar raha hon
const form = document.querySelector("form");


form.addEventListener("submit", function (e) {
    e.preventDefault(); //preventDefault() page ko reload hone se rokta hai

    //Yaha Sary Inputs ko select kar rahe hain
    const firstName = form.querySelector('input[placeholder="Frist Name"]').value.trim();
    const lastName = form.querySelector('input[placeholder="last Name"]').value.trim();
    const email = form.querySelector('input[placeholder="E-mail"]').value.trim();
    const phone = form.querySelector('input[placeholder="Phone"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    //Ye if statemont check karta hai ky koi field empty to nahi
    if (
      firstName === "" || lastName === "" || email === "" || phone === "" || message === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    //Agar sab field filled ho tho alert show kary gaa.
    alert("Message sent successfully");

    //Ye form.reset() Form ko clear kar deta hai yani sary fields ko belkul empty kr deta hai
    form.reset();
});














// =================== NAVBAR BUTTON UPDATE ===================
// Ye function har page par run hoga
function updateNavbarButtons() {
    const signInBtn = document.getElementById("signupBtn");
    const signOutBtn = document.getElementById("signoutBtn");

    if (!signInBtn || !signOutBtn) return;

    if (localStorage.getItem("isLoggedIn") === "true") {
        signInBtn.style.display = "none";    // Sign In chhupao
        signOutBtn.style.display = "inline-block"; // Sign Out dikhao
    } else {
        signInBtn.style.display = "inline-block"; // Sign In dikhao
        signOutBtn.style.display = "none";        // Sign Out chhupao
    }
}

// =================== SIGN OUT LOGIC ===================
const signOutBtn = document.getElementById("signoutBtn");
if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn"); // Logout
        alert("You are logged out successfully");

        // Update navbar on current page
        updateNavbarButtons();

        // Agar chaho toh home page reload bhi kar sakte ho
        // window.location.href = "index.html";
    });
}

// =================== PAGE LOAD ===================
window.addEventListener("load", updateNavbarButtons);
