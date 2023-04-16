document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("userInfo") == null) {
        window.location.replace("/login");
    } else {
        const form = document.querySelector("#confirm-venue-register");
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let userData = JSON.parse(localStorage.getItem("userInfo"));
            console.log(document.querySelector('#submit'));
            const vid = document.querySelector('#submit').getAttribute('venue');
            const formData = new FormData(form);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: formData.get('firstname'),
                    lastname: formData.get('lastname'),
                    dateofregis: formData.get('dor'),
                    numpeople: formData.get('nop'),
                    email: formData.get('email'),
                    number: formData.get('contact'),
                    birthday: formData.get('dob'),
                    uid: userData['_id'],
                    vid: vid
                })
            };

            console.log(requestOptions);

            fetch('/api/postreg', requestOptions).catch(err => console.log(err));

        });
    }
});