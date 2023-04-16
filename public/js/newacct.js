document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.querySelector("#new-account");

    const emailInput = document.querySelector('#email');

    emailInput.addEventListener('input', function() {
        fetch(`/api/checkEmail?email=${emailInput.value}`)
            .then(response => response.json())
            .then(data => {
                const submitBtn = document.querySelector('#create-acct-btn');
                const emailtaken = document.querySelector('#emailtaken');
                if (data) {
                    submitBtn.disabled = true;
                    emailtaken.style.color = "#FF0000";
                    emailtaken.innerHTML = " Email already in use."
                } else {
                    submitBtn.disabled = false;
                    emailtaken.innerHTML = "";
                }
            });
    });

    const pass = document.querySelector('#pass');
    const pass2 = document.querySelector('#pass2');
    pass2.addEventListener('input', (e) => {
        const submitBtn = document.querySelector('#create-acct-btn');
        const notmatch = document.querySelector('#notmatch');
        console.log('hi');
        if (pass.value === pass2.value) {
            submitBtn.disabled = false;
            notmatch.innerHTML = "";
        } else {
            submitBtn.disabled = true;
            notmatch.style.color = "#FF0000";
            notmatch.innerHTML = " Passwords do not match.";
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("User submitted form \"new-account\"");
        const formElement = document.querySelector("#new-account");

        let formData = new FormData(formElement);
        const userInfo = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            contact: formData.get("contact"),
            birthday: formData.get("dob"),
            gender: formData.get("gender"),
        };
        console.log("Received: " + userInfo);
        if (formData.get('password') === formData.get('confirmpass')) {
            console.log('passwords match');
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: formData.get('firstname'),
                    lastname: formData.get('lastname'),
                    email: formData.get('email'),
                    number: formData.get('contact'),
                    birthday: formData.get('dob'),
                    gender: formData.get('gender'),
                    password: formData.get('password')
                })
            };
            fetch('/api/newuser', requestOptions);

            setTimeout(() => {
                fetch(`/api/auth?email=${userInfo.email}&password=${formData.get("password")}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Received: " + data);
                    data['dob'] = data['birthday'];
                    data['contact'] = data['number'];
                    delete data.number;
                    delete data.birthday;
                    data['dob'] = data['dob'].split('T')[0];
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    console.log(JSON.stringify(data));
                    fadeOut(document.querySelector(".login"));

                    setTimeout(() => {
                        window.location.replace("/home");
                    }, 1000);
                })
            }, 500);

            fadeOut(document.querySelector(".new-account"));
            setTimeout(() => {
                window.location.replace("home");
            }, 1000);
        }
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
