window.onload = () => {
  
  const targetUrl = "http://localhost:8081/";

  const profileWrap = document.getElementById("profile-wrap");
  const contactsWrap = document.getElementById("contacts-wrap");
  const messagesWrap = document.getElementById("messages-wrap");
  const inputWrap = document.getElementById("input-wrap");
  const messageInput = document.getElementById("messageInput");
  
  if(localStorage.getItem("loggedUser") != null) {
    alert("im here");
    setInterval(() => { getMessages(targetUrl, profileWrap, contactsWrap, messagesWrap) }, 500);
  } else {
    getMessagesAnonymously(targetUrl, profileWrap, contactsWrap, messagesWrap, messageInput);
  }

  document.getElementById("sairBtn").addEventListener("click", (e) => { out(e); })
  document.getElementById("messageBtn").addEventListener("click", (e) => {  postMessage(e, targetUrl, inputWrap, profileWrap, contactsWrap, messagesWrap) });

}

async function getMessages(targetUrl,  profileWrap, contactsWrap, messagesWrap) {
  try{
    let res = await fetch(targetUrl + "messages");
    if(res.status == 200) {
      let response = await res.json();
      messagesWrap.innerHTML = "";  
      profileWrap.innerHTML = "";
      contactsWrap.innerHTML = "";

      response.messages.forEach(message => {
        if(message.user.id == localStorage.getItem("loggedUser")) {
          messagesWrap.innerHTML += `<p class="text sent">${message.user.nickname}</p>`;
          messagesWrap.innerHTML += `<li class="sent"><p>${message.message}</p></li>`;
        } else {
          messagesWrap.innerHTML += `<p class="text replies">${message.user.nickname}</p>`;
          messagesWrap.innerHTML += `<li class="replies"><p>${message.message}</p></li>`;
        }
      });   

      response.users.forEach(user => {
        if(user.id == localStorage.getItem("loggedUser")) {
          profileWrap.innerHTML += `<img id="profile-img" src="img/avatar.svg" class="online" alt="avatar" />`;
          profileWrap.innerHTML += `<p>${user.nickname}</p>`;
        } else {
          contactsWrap.innerHTML += `<li class="contact"><div class="wrap"><img class="meta" src="img/avatar.svg" alt="avatar" /><div class="meta"><p>${user.nickname}</p></div></div></li>`;
        }
      });   
      
    }
  } catch(error) {
    console.log(error);
  }
}
                                                                      
async function getMessagesAnonymously(targetUrl,  profileWrap, contactsWrap, messagesWrap, messageInput) {
  try{
    let res = await fetch(targetUrl + "messages");
    if(res.status == 200) {
      let response = await res.json();
      messagesWrap.innerHTML = "";  
      profileWrap.innerHTML = "";
      contactsWrap.innerHTML = "";
      

      response.messages.forEach(message => {
          messagesWrap.innerHTML += `<p class="text replies">${message.user.nickname}</p>`;
          messagesWrap.innerHTML += `<li class="replies"><p>${message.message}</p></li>`;
      });   

      response.users.forEach(user => {
        if(user.id == localStorage.getItem("loggedUser")) {
          profileWrap.innerHTML += `<img id="profile-img" src="img/avatar.svg" class="online" alt="avatar" />`;
          profileWrap.innerHTML += `<p>Anonymous</p>`;
        } else {
          contactsWrap.innerHTML += `<li class="contact"><div class="wrap"><img class="meta" src="img/avatar.svg" alt="avatar" /><div class="meta"><p>${user.nickname}</p></div></div></li>`;
        }
      });   
      messageInput.disabled = true;
    }
  } catch(error) {
    console.log(error);
  }
}

async function postMessage(e, targetUrl, inputWrap, profileWrap, contactsWrap, messagesWrap) {
  e.preventDefault();

  let data = {};
  data.id = localStorage.getItem("loggedUser");
  data.message = inputWrap.value;
  inputWrap.value = "";

  try {
    let res = await fetch(targetUrl + "message", {
      method: 'POST',
      headers: {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify(data, null, 2)
    });

    if (res.status == 200) {
      let response = await res.json();
      getMessages(targetUrl, profileWrap, contactsWrap, messagesWrap);
    }

  } catch (error) {
    console.log(error);
  }
}

function out(e) {
  e.preventDefault();
  localStorage.removeItem('loggedUser');
  location.href = "http://localhost:5500/index.html";
}