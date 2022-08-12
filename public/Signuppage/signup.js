const form=document.getElementById('signup-form');
let msg=[];

form.addEventListener('submit',function(e){
    const Fname=document.getElementById('first-name');

    if(Fname.value==''||Fname.value.length<5){
        msg.push('name is empty/length must be > 4');
    }

    if(msg.length>0){
        e.preventDefault();
        document.getElementsByClassName('first-name-err')[0].innerText=msg.join('\n');
    }

    msg=[];

    const Lname=document.getElementById('last-name');

    if(Lname.value==''||Lname.value.length<5){
        msg.push('name is empty/length must be > 4');
    }
     
    if(msg.length>0){
        e.preventDefault();
        document.getElementsByClassName('last-name-err')[0].innerText=msg.join('\n');
    }
    msg=[];

    const Uname=document.getElementById('user-name');

    if(Uname.value==''||Uname.value.length<5){
        msg.push('username is empty/length must be > 4');
    }
     
    if(msg.length>0){
        e.preventDefault();
        document.getElementsByClassName('user-name-err')[0].innerText=msg.join('\n');
    }
    

    msg=[];

    const Mn=document.getElementById('mob-no');

    if(Mn.value==''||Mn.value.length!=10){
        msg.push('number is empty/length not equal to 10');
    }
     
    if(msg.length>0){
        e.preventDefault();
        document.getElementsByClassName('Mn-err')[0].innerText=msg.join('\n');
    }

    msg=[];

    const pwd1=document.getElementById('pwd1');
    const pwd2=document.getElementById('pwd2');


    if(pwd1.value==''||pwd2.value==''||pwd2.value!=pwd1.value){
        msg.push('password is empty/not matched');
    }
     
    if(msg.length>0){
        e.preventDefault();
        document.getElementsByClassName('pwd-err')[0].innerText=msg.join('\n');
    }

    msg=[];
});


function myFunction2() {
    var x = document.getElementById("pwd1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function myFunction3() {
    var x = document.getElementById("pwd2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }