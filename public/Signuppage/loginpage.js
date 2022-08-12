const formelemdiv=document.getElementsByClassName('loginform');

const loginbtn=document.getElementById('login-btn');


loginbtn.addEventListener('click',function(){
    formelemdiv[0].classList.toggle('active');
});




// * form validation


const form=document.getElementById('login-form');
const email=document.getElementById('email');
const pwd=document.getElementById('pwd');
// const emailerr=document.getElementById('email-message');
const pwderr=document.getElementById('pwd-message');
let messages=[];

form.addEventListener('submit',function(e){
    
    if(email.value==''){
        messages.push('empty email');
    }

    if(pwd.value.length<6){
        messages.push('password should be length>5');
    }
    
    if(messages.length>0){
     e.preventDefault();
     pwderr.innerText=messages.join('\n');  
    }
    
    messages=[];
});

function myFunction() {
    var x = document.getElementById("pwd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }



