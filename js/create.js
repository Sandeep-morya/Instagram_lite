import { navbar,url,json_url } from "../components/variables.js";
import { homepage,operation } from "../components/methods.js";

let navbar_sec = document.querySelector(".navbar");
navbar_sec.innerHTML = navbar;
let create = document.querySelector(".create");
create.onclick = () => location.assign("./create.html");
let logo = document.querySelector(".logo");
logo.onclick = () => homepage();
let home = document.querySelector(".home");
home.onclick = () => homepage();
//--------------------------- code start here --------->
let postArray=JSON.parse(localStorage.getItem('posts'))||[];

const back_img = document.querySelector("#img");
const upload_img = document.querySelector(".upload_img");
const create_btn = document.querySelector(".create_btn");
let image_url;

create_btn.addEventListener("click", () => {
  let id = Math.floor(Math.random()*192837567891234)
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
  let temp=await fetch(json_url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(temp){
    operation('Create_Post');
  }
};


//------------------ Recycle Part ----------------->>
const tbody=document.querySelector('.tbody');
const user=document.querySelector('.user');
user.textContent=localStorage.getItem('name')|| '+';
displayTable(postArray);
function displayTable(array){
  tbody.innerHTML=null;
  array.forEach((e,i) => {
    let tr=document.createElement('tr');
    let id=document.createElement('td');
    let image_url=document.createElement('td');
    let caption=document.createElement('td');
    let restore=document.createElement('td');

    id.textContent=e.id;
    image_url.textContent=e.image_url;
    caption.textContent=e.caption;
    restore.textContent='Create';
    restore.className='restore'
    restore.onclick=(el)=>{
      let data = { 
        id:id.textContent, 
        caption:caption.textContent, 
        image_url:image_url.textContent 
      };
      createPost(data);
      deleteData(i)
      el.target.parentNode.remove();
    }
    tr.append(id,image_url,caption,restore);
    tbody.append(tr);
  });
}

function deleteData(i){
  postArray.splice(i,1);
  localStorage.setItem('posts',JSON.stringify(postArray));
  displayTable(postArray);
}