const login_form = document.querySelector(".login_form");
const signup_form = document.querySelector(".signup_form");
const switch_div = document.querySelector(".switch");
let login_active = true;
const url = `https://masai-api-mocker.herokuapp.com`;
switch_div.onclick = () => {
  if (login_active) {
    showlogin()
  } else {
    showSignup()
  }
};

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value;
  let password = e.target[1].value;
  let obj = { username, password };
  console.log(obj)
  let res=login(obj);
  res.then(e=>getProfile(username,e.token)).catch(e=>alert('Wrong Credentials'));
});

signup_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value;
  let email = e.target[1].value;
  let password = e.target[2].value;
  let mobile = e.target[3].value;
  let name = "";
  let description = "";
  if(validateUsername(username) && validatePassword(password)){
    let obj = { name, username, email, password, mobile, description };
    signup(obj);
  }else{
    alert('Need More secure Fields')
  }
  
});

async function signup(data) {
  let temp = await fetch(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let res = await temp.json();
  alert(res.message);
  showSignup();
}

async function login(data) {
  let temp = await fetch(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await temp.json();
 
}

async function getProfile(name,token) {
    let temp = await fetch(`${url}/user/${name}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
            },
      });
      let res= await temp.json();
      localStorage.name=res.username[0];
      alert('Login Successfull')
      location.assign('./main.html')
}
function validateUsername(username) {
    let str = `@#!$%^&*()=+[]{ };:'",<.>/?`;
    if (username.length < 4) return false;
    for (let x of str) {
    if (username.includes(x)) {
        return false;
    }
    }
    return true;
}

//--> validate_password
function validatePassword(password) {
    return password.length < 8 ? false : true;
}
    
function showlogin() {
    signup_form.style.display = "grid";
    login_form.style.display = "none";
    switch_div.innerHTML = `Already have an Account ? <span>Login</span>`;
    login_active = false;
  } 
  function showSignup() {
    signup_form.style.display = "none";
    login_form.style.display = "grid";
    switch_div.innerHTML = `Don't have an Account ? <span>SignUp</span>`;
    login_active = true;
  }


