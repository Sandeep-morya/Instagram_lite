import { navbar,url,json_url } from "../components/variables.js";
import { homepage } from "../components/methods.js";

let navbar_sec = document.querySelector(".navbar");
navbar_sec.innerHTML = navbar;
let create = document.querySelector(".create");
create.onclick = () => location.assign("./create.html");
let logo = document.querySelector(".logo");
logo.onclick = () => homepage();
let home = document.querySelector(".home");
home.onclick = () => homepage();

//--------------------------- code start here --------->

const back_img = document.querySelector("#img");
const upload_img = document.querySelector(".upload_img");
const create_btn = document.querySelector(".create_btn");
let image_url;

create_btn.addEventListener("click", () => {
  let id = document.querySelector(".id").value;
  let caption = document.querySelector(".caption").value;
  let data = { id, caption, image_url };
  createPost(data);
});

upload_img.onchange = (e) => {
  let file = e.target.files[0];
  const path = URL.createObjectURL(file);
  back_img.src = path;
  handleImage(file);
};


let handleImage = async (file) => {
  let form = new FormData();
  form.append("image", file);

  let promise = await fetch(url, {
    method: "POST",
    body: form,
  });
  let response = await promise.json();
  if (response) {
    create_btn.style.background = "rgb(35, 177, 0)";
    create_btn.removeAttribute('Disabled');
    image_url = response.data.display_url;
  }
};


let createPost = async (data) => {
  await fetch(json_url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};


