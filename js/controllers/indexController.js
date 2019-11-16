window.onload = () => {

  document.getElementById("btn").addEventListener("click", e => { postUser(e) });
  
}

async function postUser(e) {
  e.preventDefault();

  let data = {};
  data.nickname = document.getElementById("nickname").value;

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
      console.log(response);

      location.href = "file:///C:/dev/SD/frontEnd/chat.html";
    }

  } catch(error) {
    console.log(error);
  }
}
