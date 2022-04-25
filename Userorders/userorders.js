let elem=document.getElementsByName('user-rating');
let lengthq=document.getElementsByName('user-rating').length;
let elem1=document.getElementsByClassName('rat-value');

function fun2(){
    console.log('hello');
    document.getElementsByName('user_rating')[0].value=5;
    return 23;
}


// ! not working
function fun(){
    for(let i=0;i<lengthq;i++){
        document.getElementsByName('user_rating')[i].value=parseInt(elem1[i].innerText);
    }
    return "succuss";
}
for(let i=0;i<elem.length;i++){
    document.getElementsByName('user_rating')[i].value=parseInt(elem1[i].innerText);
}


let reporticonelem=document.getElementsByClassName('report-icon');
let reportelem=document.getElementsByClassName('report-form');
for(let i=0;i<reporticonelem.length;i++){
    reporticonelem[i].addEventListener('click',()=>{
        reportelem[i].classList.toggle('active');
    })
}