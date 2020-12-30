document.addEventListener('DOMContentLoaded', function () {
  //sign up modal
  var signup_modal = document.querySelector('#modal1');
  var instances = M.Modal.init(signup_modal);
  instances.close();
  //logn modal
  var login_modal = document.querySelector('#modal2');
  var instances = M.Modal.init(login_modal);
  instances.close();
  document.querySelector(".cov").style.display = "none"

}); 


// handel links ui if the user is find or not
var login_link = document.querySelectorAll(".login_link");
var logout_link = document.querySelectorAll(".logout_link");
const setui = (user) => {
  if(user){
    login_link.forEach((it) => it.style.display = "block");
    logout_link.forEach((it) => it.style.display = "none");
  }else{
    login_link.forEach((it) => it.style.display = "none");
    logout_link.forEach((it) => it.style.display = "block");
  }
}


// handel todo items if there user or not 
var items_pair = document.querySelector(".items_pair");
const mydata = (docs , user) => {
  
  
  let html = "";
  


  if(docs.length){docs.forEach(todo => {
    var doc = todo.data().todo;
    
    if(doc.idd == user.uid){
      let items = `
        <div class="col s12 m4 pair" data-id=${docs[0].id} >
        <div class="card  darken-1 card_bac">
          <div class="card-content white-text">
            <span class="card-title">${doc.title}</span>
            <p>${doc.content}</p>
          </div>
        </div>
        <div style="display: flex; background: #c9e8f3; align-items: center; justify-content: center;">
        <a class="btn-floating delet "><i class="material-icons">delete</i></a> 
        <a class="" style="margin: 0 20%;"><i class=""></i></a> 
        <a class="btn-floating update"><i class="material-icons">edit</i></a> 
      </div>
      </div> 
      `
    html += items;
    }
  });
  items_pair.innerHTML = html;} else{
    items_pair.innerHTML = `<h5 class="center-align "> you are welcome in todoapp note , sign up to start use it now :) </h5> `
  }
  document.querySelectorAll(".delet").forEach(dele => {
    dele.addEventListener("click" , (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
      db.collection("todos").doc(id).delete()      
    })
  })
  
  /*document.querySelectorAll(".update").forEach(dele => {
    dele.addEventListener("click" , (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
        db.collection("todos").doc(id).update({

        })     
      
    })
  })*/
}