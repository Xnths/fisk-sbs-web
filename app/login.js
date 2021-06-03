const form = document.querySelector("form");
const loader = document.querySelector(".loader")

form.addEventListener("submit", event => {
    event.preventDefault();
    loader.style.display = "inline-block";

    const email = event.target.querySelector("[data-email]").value;
    const password = event.target.querySelector("[data-password").value;

    if (email == "staff@fisk.com" && password == "fisksbs") {
        window.location.href = "./highlights.html"
    } else {
        setTimeout(() => {
            loader.style.display = "none";
            alert("Wrong password or email")
        }, 1000)
    }

})