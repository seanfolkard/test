var savebutton = document.getElementById('savebutton');
var readonly = true;
var inputs = document.querySelectorAll('input');

savebutton.addEventListener('click',function(){

    for (var i=0; i<inputs.length; i++) {
        inputs[i].toggleAttribute('readonly');
    };

    document.querySelector('#country').toggleAttribute('readonly');
    document.querySelector('#email').toggleAttribute('readonly');

    if (savebutton.innerHTML == "edit") {
        savebutton.innerHTML = "save";
    } else {
        savebutton.innerHTML = "edit";
        let userData = JSON.parse(localStorage.getItem("userInfo"));
        const form = document.querySelector("#user-profile");
        let formData = new FormData(form);
        localStorage.removeItem("userInfo");
        let userInfo = {};
        for (var pair of formData) {
            userInfo[pair[0]] = pair[1];
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        userInfo['birthday'] = userInfo['dob'];
        userInfo['number'] = userInfo['contact'];
        delete userInfo['dob'];
        delete userInfo['contact'];
        fetch('/api/updateuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
    }
});

const logout = document.getElementById("donebutton");
logout.addEventListener("click", (e) => {
    localStorage.removeItem("userInfo");
});

document.addEventListener("DOMContentLoaded", (e) => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (localStorage.getItem("userInfo") == null) {
        window.location.replace("/login");
    } else {
        console.log(userData);
        for (var key in userData) {
            console.log(key + ": " + userData[key]);
            if (userData[key] != "")
                document.querySelector("#" + key)?.setAttribute("value", userData[key]);
        }
    }
    fetch(`/api/getreg?email=${userData.email}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const fill = document.querySelector('#pastreg');
                data.forEach(element => {
                    fill.innerHTML += `<li class="hist">${element.dateofregis} - ${element.title}</li><br>`;
                });
            } else {

            }
        });
});