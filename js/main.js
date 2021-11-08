
let myhttb = new XMLHttpRequest();
let counter = [];
function getmovie() {
    myhttb.open("get", "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR02ycQYCAWomTaEeOjfVmw4Ekp3li1RtP4SrZSB00jgI57LtYS8YkqXElU");
    myhttb.send();
    myhttb.addEventListener("readystatechange", function () {
        if (myhttb.readyState == 4 && myhttb.status == 200) {
            counter = JSON.parse(myhttb.response).results;
            display();



        }
    })
}

async function ApiSearch(term){
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1bnFhS2oOuUwt0dlFtRqUdeWhF2iDRO9fbKekzyCaebBeuFX7dKg5OpHk8&language=en-US&query=${term}&page=1&include_adult=false`)
    response = await response.json();
    
    counter = response.results
    display();
}


function display() {
    let cartona = "";
    for (let i = 0; i < counter.length; i++) {
        cartona += ` <div class="col-md-4 p-2">

        <div class="post">
        <img src="https://image.tmdb.org/t/p/w500/${counter[i].poster_path}" class="w-100">
            <div class="cap">
                <div class="cap2">
                    <h1>${counter[i].title}</h1>
                    <p>${counter[i].overview}</p>
                    <p> rate : ${counter[i].vote_average}</p>
                    <p>${counter[i].release_date}</p>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("movie").innerHTML = cartona;
}
getmovie();

function search(term) {
    console.log(counter)
    let cartona = ""
    for (let i = 0; i < counter.length; i++) {

        if (counter[i].title.includes(term) == true) {
            cartona += ` <div class="col-md-4 p-2">

             <div class="post">
                <img src="https://image.tmdb.org/t/p/w500/${counter[i].poster_path}" class="w-100">
                  <div class="cap">
                    <div class="cap2">
                     <h1>${counter[i].title}</h1>
                     <p>${counter[i].overview}</p>
                     <p> rate : ${counter[i].vote_average}</p>
                     <p>${counter[i].release_date}</p>
                    </div>
                 </div>
             </div>
         </div>`
        }

    }
    document.getElementById("movie").innerHTML = cartona;
}

let curent = document.getElementById("current");

$("#current").keyup(() => {

    search(curent.value);
});

// end api
async function getapi(term = "now_playing"){
        let response = await fetch(`https://api.themoviedb.org/3/movie/${term}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`)
         response = await response.json();
         counter = response.results
         display();
}
async function gettrending(){
    let response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`)
     response = await response.json();
     counter = response.results
     display();
}
getapi();

$("#nowplaying").click(() => {

    getapi("now_playing");
});
$("#Popular").click(() => {

    getapi("popular");
});

$("#toprated").click(() => {

    getapi("top_rated");
});
$("#trending").click(() => {

    gettrending();
});
$("#upcoming").click(() => {

    getapi("upcoming");
});


// start form login 

let username = document.getElementById("username");
let useremail = document.getElementById("useremail");
let userpassword = document.getElementById("userpassword");
let userpassword1 = document.getElementById("userpassword1");
let userphone = document.getElementById("userphone");
let userage = document.getElementById("userage");


let userinfo = [];
if (localStorage.getItem("users") == null) {
    userinfo = [];
}
function submit() {

    let users = {
        name: username.value,
        email: useremail.value,
        password: userpassword.value,
        password1: userpassword1.value,
        phone: userphone.value,
        age: userage.value,
    }
    userinfo.push(users);
    localStorage.setItem("users", JSON.stringify(userinfo));
    validation();
    clear();
    
}
function validation() {
    if (validationname() == true && validationemail() == true && validationpassword() == true && validationrepass() ==
        true && validationphone() == true && validationage() == true && userpassword.value == userpassword1.value) {
        document.getElementById("mybtn").disabled = false
        return true
    }
    else {
        document.getElementById("mybtn").disabled = true

        return false
    }
}
function validationname() {
    let nameragex = /^[A-Za-z]{3,13}$/;
    if (nameragex.test(username.value) == true && username.value != "") {

        return true
    }
    else {

        return false
    }
}
function validationemail() {
    let emailragex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
    if (emailragex.test(useremail.value) == true && useremail.value != "") {
        return true
    }
    else {
        return false
    }
}
function validationpassword() {
    let passragex = /^[A-Z][a-z0-9]{8,15}$/;
    if (passragex.test(userpassword.value) == true && userpassword.value != "") {
        return true
    }
    else {
        return false
    }
}
function validationrepass() {
    let repassragex = /^[A-Z][a-z0-9]{8,15}$/;
    if (repassragex.test(userpassword1.value) == true && userpassword1.value != "") {
        return true
    }
    else {
        return false
    }
}
function validationphone() {
    let phoneragex = /^01[0125][0-9]{8}$/;
    if (phoneragex.test(userphone.value) == true && userphone.value != "") {
        return true
    }
    else {
        return false
    }
}
function validationage() {
    let ageragex = /^([1-6][0-9]|70)$/;
    if (ageragex.test(userage.value) == true && userage.value != "") {
        return true
    }
    else {
        return false
    }
}
function clear(){
     username.value='';
     useremail.value='';
     userpassword.value='';
     userpassword1.value='';
     userphone.value='';
     userage.value='';

}


// end form login


   
