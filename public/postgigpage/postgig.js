// * to be done



let realbtn=document.getElementsByClassName('image-input');
let custbtn=document.getElementsByClassName('Cbtn');
let custtxt=document.getElementsByClassName('Ctxt');


for(let i=0;i<custbtn.length;i++)
custbtn[i].addEventListener('click',function(){
    realbtn[i].click();

    realbtn[i].addEventListener('change',function(){
        if(realbtn[i].value!=''){
            custtxt[i].innerText=realbtn[i].value;
        }
    });

}); 


let formelem=document.getElementById('postgig-form');
const errmsgs=[];
formelem.addEventListener("submit",function(e){

    if(document.getElementById('gig-title').value.length<6){
        e.preventDefault();
       document.getElementById('title-err').innerText="Title length must > 5";
    }
    else{
       document.getElementById('title-err').innerText="";
    }


    if(document.getElementById('gig-description').value.length<26){
        e.preventDefault();
       document.getElementById('desc-err').innerText="desc length must > 25";
    }
    else{
        document.getElementById('desc-err').innerText="";
    }


    if(parseInt(document.getElementById('gig-price-basic').value)<0){
        e.preventDefault();
       document.getElementById('basic-price-err').innerText="value must >0";
    }
    else{
        document.getElementById('basic-price-err').innerText="";
    }


    if(document.getElementById('gig-basic-desc').value.length<21){
        e.preventDefault();
       document.getElementById('basic-desc-err').innerText="desc length must > 20";
    }
    else{
        document.getElementById('basic-desc-err').innerText="";
    }


    if(parseInt(document.getElementById('gig-price-standard').value)<0){
        e.preventDefault();
       document.getElementById('standard-price-err').innerText="value must >0";
    }
    else{
       document.getElementById('standard-price-err').innerText="";
    }


    if(document.getElementById('gig-standard-desc').value.length<21){
        e.preventDefault();
       document.getElementById('standard-desc-err').innerText="desc length must > 20";
    }
    else{
        document.getElementById('standard-desc-err').innerText="";
    }


    if(parseInt(document.getElementById('gig-price-premium').value)<0){
        e.preventDefault();
       document.getElementById('premium-price-err').innerText="value must >0";
    }
    else{
       document.getElementById('premium-price-err').innerText="";
    }


    if(document.getElementById('gig-premium-desc').value.length<21){
        e.preventDefault();
       document.getElementById('premium-desc-err').innerText="desc length must > 20";
    }
    else{
        document.getElementById('premium-desc-err').innerText="";
    }
})

// * gallery

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

// * card-title
document.getElementById('gig-title').addEventListener('change',()=>{
   document.getElementById('gig-title-content').innerText= document.getElementById('gig-title').value;
})

// * card-price
document.getElementById('gig-price-basic').addEventListener('change',()=>{
    document.getElementById('gig-price').innerText= document.getElementById('gig-price-basic').value;
 })

    let length=document.getElementsByClassName('image-input').length;
    for(let i=0;i<length;i++){
        document.getElementsByClassName('image-input')[i].addEventListener('change',()=>{
         let array=document.getElementsByClassName('image-input')[i].value.split(/(\\|\/)/g);
         let imgname= array[array.length-1];

         if(i==0)
         document.getElementsByClassName('image-output')[i].src='/'+imgname;
         else{
            document.getElementsByClassName('image-output')[i].src='/'+imgname;  
            document.getElementsByClassName('image-output')[i+4].src='/'+imgname;  
         }
        })
    }