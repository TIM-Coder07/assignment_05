// Log in part 

const form = document.getElementById("loginForm")

form.addEventListener("submit", function(e){
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const error = document.getElementById("error")

  if(username === "admin" && password === "admin123"){
      window.location.href = "index.html"
  }else{
      error.classList.remove("hidden")
  }
})