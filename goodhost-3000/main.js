document.cookie = "SessionID=123456";
let csrfToken = "";
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
            const btn = document.createElement("button");
            btn.innerText = "Delete";
            
            btn.onclick = () => {
                fetch(`http://localhost:3000/api/emails/delete/${email.id}`, {
                    method: "POST",
                    headers: {
                        "x-csrf-token": csrfToken
                    }
                })
                .then(res => {
                    if (!res.ok) {
                        alert("CSRF защита сработала ");
                    }
                    return res.text();
                })
                .then(() => location.reload());
            };
            
            div.appendChild(btn);

            sidebar.appendChild(div);
        });
    });


    function login() {
        const username = document.getElementById("username").value;
    
        fetch(`http://localhost:3000/login?username=${username}`)
        .then(res => res.json())   
        .then(data => {
            csrfToken = data.csrfToken;   
            document.getElementById("status").innerText = data.message;
            location.reload();
        });
    }

    function logout() {
        fetch("http://localhost:3000/api/logout")
            .then(() => {
                document.cookie = "SessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                location.reload();
            });
    }
