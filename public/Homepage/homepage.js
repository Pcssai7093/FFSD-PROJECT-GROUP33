

let elem=document.getElementsByClassName('filter-btn');
elem[0].addEventListener('click',function(){
    document.getElementsByClassName('filters-section')[0].classList.toggle('active');
})

let elem2=document.getElementsByClassName('sort-btn');
elem2[0].addEventListener('click',function(){
    document.getElementsByClassName('mobsort-menu')[0].classList.toggle('active');
});

// const UDM = module.require('/userdatamodel.js');
// for(let i=0;i<document.getElementsByClassName('wishlist-icon').length;i++){
//     let uid =document.getElementById('userid').innerText;
//     document.getElementsByClassName('wishlist-icon')[i].addEventListener('click',async()=>{
       
//     });
// }