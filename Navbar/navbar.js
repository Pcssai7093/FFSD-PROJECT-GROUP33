let menu=document.getElementById('menu-icon');

menu.addEventListener('click',function(){
    document.getElementById('nav-container').classList.toggle('active1');
    document.getElementById('nav-list').classList.toggle('active');
});

document.getElementById('profile-icon').addEventListener('click',function(){
    document.getElementById('profile-dropdown').classList.toggle('active');
});



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("nav-container").classList.add('active');

  } else {
    document.getElementById("nav-container").classList.remove('active');


  }
}

