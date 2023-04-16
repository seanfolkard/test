document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.querySelector("#forgotpass");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("User submitted form \"forgotpass\"");
        const formElement = document.querySelector("#forgotpass");

        let formData = new FormData(formElement);
        const userInfo = {
            email: formData.get("email"),
            password: formData.get("new-pass"),
            confirmnewpassword: formData.get("con-new-pass")
        };
        console.log("Received: " + userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        fadeOut(document.querySelector("#forgot-pswrd"));
        setTimeout(() => {
            window.location.replace("/login");
        }, 1000);
    });
});

async function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.02;
    }, 1);
}