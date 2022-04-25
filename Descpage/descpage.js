// * nothing


// * photo gallery
let elem1=document.getElementsByClassName('m');
elem1[0].style="display:block;";

let elem2=document.getElementsByClassName('g');

for(let i=0;i<elem2.length;i++){
    elem2[i].addEventListener('click',function(){
        for(let j=0;j<elem1.length;j++){
            elem1[j].style="display:none;"; 
        }
        elem1[i].style="display:block;";
    });
}




// * product package menu
let elem5=document.getElementsByClassName('category');
let elem4=document.getElementsByClassName('product-package-body');
elem4[0].style="display:block";
elem5[0].classList.add('active');

for(let i=0;i<elem5.length;i++){
    elem5[i].addEventListener('click',function(){
        for(let j=0;j<elem4.length;j++){
            elem4[j].style="display:none";
            elem5[j].classList.remove('active');
        }
        elem4[i].style="display:block";
        elem5[i].classList.add('active');
        });
}




let maxwid=window.innerWidth;
    if(maxwid>1100){
        // console.log('hello');
        window.onscroll = function() {
        scrollFunction1();
        scrollFunction();
        };   
    }
    else if(maxwid>900){
        window.onscroll = function() {
            scrollFunction();
            }; 
    }



function scrollFunction1() {

    let pos=document.getElementById('footer').offsetTop;
    
    if (document.body.scrollTop > pos-430|| document.documentElement.scrollTop > pos-430) {
        document.getElementsByClassName("product-package")[0].style="top:auto;bottom:100px";
    console.log("scrolled");
    }
    else    if (document.body.scrollTop > 150|| document.documentElement.scrollTop > 150) {
        document.getElementsByClassName("product-package")[0].style="position:fixed";
    // console.log("scrolled");
    }
   else {
    document.getElementsByClassName("product-package")[0].style="position:absolute";
  }
}



// *----------navbar
let menu=document.getElementById('menu-icon');

menu.addEventListener('click',function(){
    document.getElementById('nav-container').classList.toggle('active1');
    document.getElementById('nav-list').classList.toggle('active');
});

document.getElementById('profile-icon').addEventListener('click',function(){
    document.getElementById('profile-dropdown').classList.toggle('active');
    console.log("HELLO");
});




// window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("nav-container").classList.add('active');

  } else {
    document.getElementById("nav-container").classList.remove('active');
  }
}

// * checkout div
document.getElementById('hire-btn').addEventListener('click',()=>{
    console.log("ff");
    document.getElementById('checkout').classList.toggle('active');
});