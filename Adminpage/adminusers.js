// document.getElementsByClassName('menu-icon')
for(let i=0;i<document.getElementsByClassName('menu-icon').length;i++){
    document.getElementsByClassName('menu-icon')[i].addEventListener('click',()=>{
        document.getElementsByClassName('userbody')[i].classList.toggle('active');
    }); 
}

