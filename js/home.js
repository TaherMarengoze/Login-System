var userNameSpan = document.getElementById('userName');

var loggedInUserName = localStorage.getItem('loginName');

if (loggedInUserName){
    userNameSpan.innerText = loggedInUserName;
}
else{
    //redirect to login page
    logout();
}

function logout(){
    removeLoginState();
    location.replace("/index.html");
}

function removeLoginState(){
    localStorage.removeItem('loginName');
}