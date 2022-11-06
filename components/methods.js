export function homepage(){
    location.href='./main.html'
localStorage.setItem('num',1)}

export function showModification(trash,edit){
    trash.style.display='block';
    edit.style.display='block';
}

export function hideModification(trash,edit){
    trash.style='';
    edit.style='';
}

export function caption_modify(caption_result, update){
    update.style.display='block'
    caption_result.setAttribute('contenteditable',true);
    let sel = window.getSelection();
    sel.selectAllChildren(caption_result);
    sel.collapseToEnd();
}

export function hide_caption_modify(caption_result, update){
    update.style='';
    caption_result.removeAttribute('contenteditable')
}

export function operation(message){
    window.location.reload();
    alert(`${message}: Done`);
}

