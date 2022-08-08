

let editicon=document.getElementById('edit-icon');
editicon.addEventListener('click',()=>{
    document.getElementById('image-btn').classList.add('active1');
    document.getElementsByClassName('profile-image')[0].classList.add('active');
    document.getElementById('Full_name').disabled=false;
    document.getElementById('User_about').disabled=false;
    document.getElementById('save-btn').classList.add('active');
});

let cust_btn=document.getElementById('image-btn');
let real_btn= document.getElementById('profile_img');
let dis_img=document.getElementById('display_img');

cust_btn.addEventListener('click',()=>{
    real_btn.click();
});

real_btn.addEventListener('change',()=>{
    let array=real_btn.value.split(/(\\|\/)/g);
    let imgname= array[array.length-1];

    dis_img.src='/'+imgname;
});