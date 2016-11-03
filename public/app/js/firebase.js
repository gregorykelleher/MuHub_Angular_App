// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe8TpLgjQ6rDJoSoYkrtwOvJ8yGUe_ZOA",
    authDomain: "cs353-project.firebaseapp.com",
    databaseURL: "https://cs353-project.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "480455815960"
};
firebase.initializeApp(config);



function loginform() {



	   // Get the modal
                            var modal = document.getElementById('myModal');

                            // Get the button that opens the modal
                            var btn = document.getElementById("myBtn");

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];

                            // When the user clicks the button, open the modal 
                            btn.onclick = function() {

                                modal.style.display = "block";
                                var database = firebase.database();

								const txtEmail = document.getElementById('txtEmail');
								const txtPassword = document.getElementById('txtPassword');
								const btnLogin = document.getElementById('btnLogin');
								const btnSignup = document.getElementById('btnSignup');
								const btnLogout = document.getElementById('btnLogout');

								//add login event
								btnLogin.addEventListener('click', e => {
								//get email and pass
								const email  = txtEmail.value;
								const pass = txtPassword.value;
								const auth = firebase.auth();
								//sign in 

								const promise = auth.signInWithEmailAndPassword(email, pass);
								promise.catch(e => console.log(e.message));
								modal.style.display = "none";
								}); 


								//sign UP 

								btnSignup.addEventListener("click", e =>{

									//get email and pass
								const email  = txtEmail.value;
								const pass = txtPassword.value;
								const auth = firebase.auth();
								//sign in 

								const promise = auth.createUserWithEmailAndPassword(email, pass);
								promise.catch(e => console.log(e.message));
								modal.style.display = "none";

								});

								btnLogout.addEventListener('click', e=>{
									firebase.auth().signOut();
								});

								//add a real time listener 
							firebase.auth().onAuthStateChanged(firebaseUser => {
								if (firebaseUser) { 
									console.log(firebaseUser);
									btnLogout.classList.remove('hide');
								}else {
									console.log('not loged in');
									btnLogout.classList.add('hide');
								}
							});

                            }



                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function() {
                                modal.style.display = "none";
                            }

                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function(event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }
    //var x;
    //if (confirm("Press a button!") == true) {
      //  x = "You pressed OK!";
    //} else {
      //  x = "You pressed Cancel!";
    //}
    //document.getElementById("demo").innerHTML = x;
}










<<<<<<< HEAD


=======
function saveAnalogData(value) {
	firebase.database().ref('data/').push({
		data: value
	});
}
>>>>>>> firebase_bindings
