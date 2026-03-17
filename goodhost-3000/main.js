document.cookie = "SessionID=123456";

fetch("http://localhost:3000/emails")
    .then(res => res.json())
    .then(data => {
        const sidebar = document.getElementById("sidebar");
        const content = document.getElementById("content");

        data.forEach(email => {
            const div = document.createElement("div");
            div.innerText = email.subject;
            div.style.cursor = "pointer";

            div.onclick = () => {
                content.innerText = email.body;
            };

            sidebar.appendChild(div);
        });
    });


    function login() {
        const username = document.getElementById("username").value;
    
        fetch(`http://localhost:3000/login?username=${username}`)
            .then(res => res.text())
            .then(data => {
                document.getElementById("status").innerText = data;
               
            });
    }