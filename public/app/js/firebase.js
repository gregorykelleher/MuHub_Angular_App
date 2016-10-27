// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe8TpLgjQ6rDJoSoYkrtwOvJ8yGUe_ZOA",
    authDomain: "cs353-project.firebaseapp.com",
    databaseURL: "https://cs353-project.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "480455815960"
};
firebase.initializeApp(config);


					// get elements 
const txtEmail = document.getElementById('txtEmail');
const txtpassword = document.getElementById('txtpassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');
const btnLogout = document.getElementById('btnLogout');

//add login event
btnLogin.addEventListener('click', e => {
//get email and pass
const email  = txtEmail.value;
const pass = txtpassword.value;
const auth = firebase.auth();
//sign in 

const promise = auth.signInWithEmailAndPasswword(email, pass);
promise.catch(e => console.log(e.message));

});







var database = firebase.database();

function saveAnalogData(value) {
	firebase.database().ref('data/').push({
		data: value
	});
}

