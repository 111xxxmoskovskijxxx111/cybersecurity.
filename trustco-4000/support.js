const btn = document.createElement("button");
btn.innerText = "Chat with Support";
btn.style.position = "fixed";
btn.style.bottom = "10px";
btn.style.right = "10px";

btn.onclick = () => {
    fetch("http://localhost:4000/messages")
        .then(res => res.json())
        .then(data => alert(data.message));
};

document.body.appendChild(btn);