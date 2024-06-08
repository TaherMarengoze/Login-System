var signinMailInput = document.getElementById('loginMail');
var signinPasswordInput = document.getElementById('loginPassword');
var validationViewer = document.getElementById('error-viewer');
var loggedInUserIndex;

var users = JSON.parse(localStorage.getItem('users')) ?? [];

function isAllInputsGiven(){
    var signinMail = signinMailInput.value ?? "";
    var signinPassword = signinPasswordInput.value ?? "";

    if (signinMail === ""){
        signinMailInput.focus();
    }else{
        if (signinPassword === ""){
            signinPasswordInput.focus();
        }
    }

    return (signinMail !== "" && signinPassword !== "");
}

/**
 * Checks if the user is authorized to login or not.
 * @returns true for authorized user, otherwise, false.
 */
function isAuthorizedUser(){
    var mail = signinMailInput.value.trim();
    var password = signinPasswordInput.value;

    for (var i = 0;i < users.length; i++){
        if (users[i].mail === mail.toLowerCase() &&
            users[i].password === password){
                loggedInUserIndex = i;
                return true;
            }
    }
    return false;
}

function login() {
    if (isAllInputsGiven()){
        if (isAuthorizedUser()){
            //clear any errors
            validationViewer.innerHTML = "";

            //Login
            //use replace instead of assign so that the user
            //can't go back to the login screen again
            saveLoginState();
            location.replace("/home.html");
        }else{
            validationViewer.innerHTML = `
            <span class="text-danger m-3">Incorrect email or password</span>
            `;
        }
    }
    else{
        validationViewer.innerHTML = `
        <span class="text-danger m-3">All inputs is required</span>
        `;
    }
}

function saveLoginState() {
    localStorage.setItem('loginName', users[loggedInUserIndex].userName);
}