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
//--------------------------- code start here --------->

const posts=document.querySelector('.posts');

const appendPost=(array)=>{
    posts.innerHTML=null;
    array.forEach(el => {

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
    img.src=el.image_url;
    span.textContent=el.caption;
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
        updateData(el.id,text);
    }
    delete_icon.onclick=()=>{
        deleteData(el.id)
    }
    

    //----->append
    modify.append(setting_icon,edit_icon,delete_icon);
    caption_div.append(span,update);
    card.append(modify,img,caption_div);
    posts.append(card);
    });

}
const getPosts=async ()=>{
    let promise=await fetch(json_url)
    let response=await promise.json();
    appendPost(response)
}
getPosts();

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

async function deleteData(id){
    let temp=await fetch(`${json_url}/${id}`,{
        method:'DELETE',
    });
    if(temp){
        operation('Delete Post')
    }
}


