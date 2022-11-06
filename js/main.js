import { navbar,json_url } from "../components/variables.js";
import {homepage,showModification,hideModification,caption_modify,hide_caption_modify,operation} from "../components/methods.js"

let navbar_sec=document.querySelector('.navbar');
navbar_sec.innerHTML=navbar;
let create=document.querySelector('.create');
create.onclick=()=>location.assign('./create.html');
let logo=document.querySelector('.logo');
logo.onclick=()=>homepage();
let home=document.querySelector('.home');
home.onclick=()=>homepage();
let user=document.querySelector('.user');
user.onclick=()=>location.assign('./index.html');
//--------------------------- code start here --------->
const posts=document.querySelector('.posts');
user.textContent=localStorage.getItem('name')|| '+'

let postArray=JSON.parse(localStorage.getItem('posts'))||[];
//---> boilerplate for  main append
const appendPost=(array)=>{
    posts.innerHTML=null;
    array.forEach(({id,image_url,caption}) => {

    let card=document.createElement('div');
    let modify=document.createElement('div');
    let caption_div=document.createElement('div');
    let setting_icon=document.createElement('i');
    let edit_icon=document.createElement('i');
    let delete_icon=document.createElement('i');
    let img=document.createElement('img');
    let span=document.createElement('span');
    let update=document.createElement('button');

    //--->Give classes
    card.className='card';
    modify.className='modify';
    caption_div.className='caption_div';
    span.className='caption-result';
    update.className='update';
    setting_icon.className='fa-solid fa-gear setting';
    delete_icon.className='fa-solid fa-trash-can trash';
    edit_icon.className='fa-solid fa-pen-to-square edit';

    //--->Give values
    img.src=image_url;
    span.textContent=caption;
    update.textContent='update';

    //---->functions
    
    let text=span.textContent;

    setting_icon.onclick=()=>showModification(delete_icon,edit_icon);
    card.onmouseleave=()=>{
        hideModification(delete_icon,edit_icon);
        hide_caption_modify(span,update);
        span.textContent=text;
    }
    edit_icon.onclick=()=>caption_modify(span,update);
    update.onclick=()=>{
        text=span.textContent;
        updateData(id,text);
    }
    delete_icon.onclick=()=>{
        deleteData(id);
        let post= new Post(id,image_url,caption);
        postArray.push(post)
        localStorage.setItem('posts',JSON.stringify(postArray))
    }
    
    //----->append
    modify.append(setting_icon,edit_icon,delete_icon);
    caption_div.append(span,update);
    card.append(modify,img,caption_div);
    posts.append(card);
    });

}
//---> create buttons method
const getPosts=async ()=>{
    let promise=await fetch(json_url)
    let response=await promise.json();
    createBtns(response);
}

//---> Update/ PATCH request
async function updateData(id,data){
    let newCaption={caption:data}
    let temp=await fetch(`${json_url}/${id}`,{
        method:'PATCH',
        body: JSON.stringify(newCaption),
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    if(temp){
        operation('Update Post')
    }
}
//---> DELETE request
async function deleteData(id){
    let temp=await fetch(`${json_url}/${id}`,{
        method:'DELETE',
    });
    if(temp){
        operation('Delete Post')
    }
}


//---> Pagination 
const btns=document.querySelector('.btns');
//----> creation method of button
function createBtns(array){
    let x=array.length;
    for(let i=1; i<=Math.ceil(x/2); i++){
        let btn=document.createElement('button');
        btn.textContent=i;
        btn.className=`btn`;
        btns.append(btn);
        btn.onclick=()=>{
            showPage(i);
            manageBtn(i-1);
            localStorage.setItem('num',i)
        }
    }
}
//---> showing results 
async function showPage(n){
    let temp=await fetch(`${json_url}?_page=${n}&_limit=2`);
    let response=await temp.json();
    appendPost(response)
}

//---> core stuff
let num=localStorage.getItem('num')||1
showPage(num);
getPosts();

//---> clicked button visibility
function manageBtn(current){
    let btn=document.querySelectorAll('.btn');
    for(let i=0; i<btn.length; i++){
        if(i==current){
            btn[i].setAttribute('Disabled',true)
        }else{
            btn[i].removeAttribute('Disabled')
        }
    }
}

//----> Class
class Post{
    constructor(id,image_url,caption){
        this.id=id;
        this.image_url=image_url;
        this.caption=caption;
    }
}