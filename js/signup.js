var signupNameInput = document.getElementById('signupName');
var signupMailInput = document.getElementById('signupMail');
var signupPasswordInput = document.getElementById('signupPassword');
var validationViewer = document.getElementById('error-viewer');

var mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

var users = JSON.parse(localStorage.getItem('users')) ?? [];
// if (users == null){
//     users = [];
// }

function signup(){
    if (mailDoesNotExist() && validateInputs()){
        registerNewUser();

        validationViewer.innerHTML = validationInfoData("User Registered Successfully", false);
        //redirect to sign in page
        // location.replace("/index.html");
    }
}

function mailDoesNotExist(){
    var mail = signupMailInput.value.trim();

    for (var i = 0;i < users.length; i++){
        if (users[i].mail === mail.toLowerCase()){
            signupMailInput.focus();
            validationViewer.innerHTML = validationInfoData("Mail already exists");
            return false;
        }
    }

    return true;
}

function validateInputs(){
    var name = signupNameInput.value ?? "";
    var mail = signupMailInput.value ?? "";
    var pass = signupPasswordInput.value ?? "";

    if (name.trim().length <= 0){
        signupNameInput.focus();
        validationViewer.innerHTML = validationInfoData("Name must be at least 1 non-white space character");
        return false;
    }

    if (!mailRegex.test(mail.trim())){
        signupMailInput.focus();
        validationViewer.innerHTML = validationInfoData("Email format is invalid. Example: testmail@domain.com");
        return false;
    }

    if (pass.length < 3){
        signupPasswordInput.focus();
        validationViewer.innerHTML = validationInfoData("Password must be at least 3 characters long")
        return false;
    }

    validationViewer.innerHTML = "";

    return true;
}

function registerNewUser(){
    users.push({
        userName: signupNameInput.value,
        mail: signupMailInput.value.trim(),
        password: signupPasswordInput.value
    });

    localStorage.setItem('users', JSON.stringify(users));
}

function validationInfoData(msg, isError = true){
    return `
    <span class="${isError ? "text-danger" : "text-success"} m-3">
        ${msg}
    </span>
    `
}