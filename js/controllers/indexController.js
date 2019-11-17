window.onload = () => {

  const nicknameInput = document.getElementById("nicknameInput");

  document.getElementById("btnLogin").addEventListener("click", e => { postUser(e, nicknameInput) });
  document.getElementById("btnAnonymous").addEventListener("click", e => { seeAnonymously(e) });
  
}

async function postUser(e, nicknameInput) {
  e.preventDefault();
  console.log(nicknameInput.value)
  let data = {};
  data.nickname = nicknameInput.value;
  //const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  targetUrl = 'http://localhost:8081/user';
  try {
    let res = await fetch(targetUrl, {
      method: 'POST',
      headers:  {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify(data, null, 2)
    });
    
    console.log(res);
    if(res.status == 200) {
      let response = await res.json();
      alert(response.id);
      nicknameInput.value = "";
      localStorage.setItem("loggedUser", response.id);
      localStorage.getItem("loggedUser");
      location.href = "http://localhost:5500/chat.html";
    }

  } catch(error) {
    console.log(error);
  }
}

function seeAnonymously(e) {
  e.preventDefault();
  alert("anonymously")
  location.href = "http://localhost:5500/chat.html";
}