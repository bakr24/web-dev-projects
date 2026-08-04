// Smooth Button Feedback

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",()=>{

if(button.textContent!=="Subscribed!"){

button.innerText="✓ Done";

setTimeout(()=>{

button.innerText="Book Tour";

},1500);

}

});

});

// Navbar Shadow

const nav=document.querySelector("nav");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

nav.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

}else{

nav.style.boxShadow="0 5px 20px rgba(0,0,0,.08)";

}

});