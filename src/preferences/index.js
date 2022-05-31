   const [{name, password}] = document.forms
   name.value = window.owner.getName()
   password.value = window.owner.getPassword()

   name.onchange = event => {
     window.owner.setName(name.value)
   }
   password.onchange = event => {
     window.owner.setPassword(password.value)
   }
