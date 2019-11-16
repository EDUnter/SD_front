window.onload = () => {
  const targetUrl = "http://localhost:8081/";

  getMessages(targetUrl);
  
  const profile = document.getElementById("profile-wrap");
  profile.innerHTML = '<img id="profile-img" src="img/avatar.svg" class="online" alt="" />';

}

async function getMessages(targetUrl) {
  try{
    console.log("arroz");
    let res = await fetch(targetUrl + "messages");
    if(res.status == 200) {
      let response = await res.json();
      console.log(response);
    }
  } catch(error) {
    console.log(error);
  }
}

async function postMessage() {
  try {
    let res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify(data, null, 2)
    });

    if (res.status == 200) {
      let response = await res.json();
      console.log(response);

      location.href = "file:///C:/dev/SD/frontEnd/chat.html";
    }

  } catch (error) {
    console.log(error);
  }
}