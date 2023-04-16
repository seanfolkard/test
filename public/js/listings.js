
document.addEventListener('DOMContentLoaded', (e) => {
    if (localStorage.getItem("userInfo") == null) {
        window.location.replace("/login");
    } else {
        fetch('/api/venues').then(response => response.text()).then(data => {
            document.querySelector("#here").innerHTML = data;
            // console.log(data);
            var btn = document.querySelectorAll("button.modal-button");

            // All page modals
            var modals = document.querySelectorAll('.modal');

            // Get the <span> element that closes the modal
            var spans = document.getElementsByClassName("close");

            // When the user clicks the button, open the modal
            console.log(btn.length);
            for (var i = 0; i < btn.length; i++) {
             btn[i].onclick = function(e) {
                e.preventDefault();
                const modal = document.querySelector(e.target.getAttribute("href"));
                modal.style.display = "block";
                console.log('test');
             }
            }

            // When the user clicks on <span> (x), close the modal
            for (var i = 0; i < spans.length; i++) {
             spans[i].onclick = function() {
                for (var index in modals) {
                    if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
                }
             }
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target.classList.contains('modal')) {
                 for (var index in modals) {
                  if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
                 }
                }
            }

            var booknowbtn = document.querySelectorAll("button.venue-button");
            const uid = JSON.parse(localStorage.getItem("userInfo"))['_id'];
            for (let index = 0; index < booknowbtn.length; index++) {
                const element = booknowbtn[index];
                const id = element.getAttribute('venue');
                element.onclick = function(e) {
                    window.location.href = `/api/fillvenue?venue=${id}&user=${uid}`;
                }
            }
        })
    }
});