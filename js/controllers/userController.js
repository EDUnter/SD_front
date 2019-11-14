window.onload = () => {

  const data = {
    "nickname": "edunter"
  }

  //postUser(data);
  getUsers();
  
}

async function getUsers() {
  const response = await fetch('http://localhost:8081/users');
  alert("arroz");
  console.log(response);
  /*const json = await response.json();
  alert(json);*/
}

/*async function postUser(data) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'http://localhost:8081/user';
  try {
    let res = await fetch(targetUrl, {
      mode: 'no-cors',
      method: 'POST',
      headers:  {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify({
        "nickname": "edunter"
      }, null, 2)
    });

    let response = await res.json();
    console.log(response);

  } catch(error) {
    console.log(error);
  }
}
*/