document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.querySelector("#login");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("User submitted form \"login\"");
        const formElement = document.querySelector("#login");

        let formData = new FormData(formElement);
        const userInfo = {
            email: formData.get("email"),
            password: formData.get("pword")
        };
        fetch(`/api/auth?email=${userInfo.email}&password=${userInfo.password}`)
            .then(response => response.json())
            .then(data => {
                const error = document.querySelector('#login > p.error');
                console.log("Received: " + data);
                if (data) {
                    error.innerHTML = "";
                    data['dob'] = data['birthday'];
                    data['contact'] = data['number'];
                    delete data.password;
                    delete data.number;
                    delete data.birthday;
                    delete data.__v;
                    // delete data._id;
                    delete data.gender;
                    data['dob'] = data['dob'].split('T')[0];
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    console.log(JSON.stringify(data));
                    fadeOut(document.querySelector(".login"));

                    setTimeout(() => {
                        window.location.replace("/home");
                    }, 1000);
                } else {
                    error.innerHTML = "Invalid credentials";
                }
            });
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