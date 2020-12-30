// if happend any change in users in firebas step "4"
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection("todos").onSnapshot(snapshot => {
            setui(user);
            mydata(snapshot.docs , user);
            add(user);
            
        })
        document.querySelector(".add_form").style.display = "block";
        document.querySelector(".ui_add_form").style.display = "none";
        document.querySelector(".ui_befor_login").style.display = "none"
    }
    else {
        document.querySelector(".add_form").style.display = "none";
        document.querySelector(".ui_add_form").style.display = "block";
        document.querySelector(".ui_befor_login").style.display = "block"    
        add();
        setui();
        mydata([]);
    }
})

// message if not found login or signup
document.querySelector(".ui_add_form").addEventListener("submit" , (e) => {
    e.preventDefault();
    var toastHTML = '<span class="message_adding">Sign up or login to allow you to add a new todos </span>';
    M.toast({html: toastHTML});
    document.querySelector(".ui_add_form").reset();
})


// sign up form step "1"
var signup_form = document.querySelector(".signup_form");
signup_form.addEventListener("submit", (e) => {
    e.preventDefault();
    var signup_email = signup_form["signup-email"].value;
    var signup_password = signup_form["sign-password"].value;

    signup_form.reset();
    auth.createUserWithEmailAndPassword(signup_email, signup_password).then(cred => {
        var modal = document.querySelector("#modal1");
        var instance = M.Modal.init(modal);
        instance.close();
    }).catch((err) => {
        console.log(err);
    })
})

// logout step "2"
var logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.reload();
})

// sign in form step "3"
var login_form = document.querySelector(".login_form");
login_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login_email = login_form["login-email"].value;
    const login_password = login_form["login-password"].value;

    auth.signInWithEmailAndPassword(login_email, login_password).then((cred) => {
        var modal2 = document.querySelector("#modal2");
        var instance2 = M.Modal.init(modal2);
        instance2.close();
        window.location.reload();
    }).catch((err) => {
        alert(err)
    })

})

var add_form = document.querySelector(".add_form");
var i = Math.random() *1;

const add = (user ) => {
    
    add_form.addEventListener("submit", (e) => {
        i += 1
        e.preventDefault();
        if (user.uid) {
            if (add_form["title"].value.trim() == "" || add_form["content"].value.trim() == "") {
                var toastHTML = '<span class="message_adding"> Please fill in the fields :) </span>';
            M.toast({html: toastHTML});
                return;
            } else {
                document.querySelector(".loading").style.display = "block";
                db.collection("todos").add({
                    todo:{
                        idd:user.uid,
                        id:i,
                        title: add_form["title"].value,
                        content: add_form["content"].value
                    }
                }).then(() => {
                    
                    add_form.reset();
                    document.querySelector(".loading").style.display = "none";
                   window.location.reload()
                }).catch((err) => {
                    console.log(err.message);
                })
            }
        }
    })
}



