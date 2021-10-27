function login() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut()
    }
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        swal
          .fire({
            icon: "success",
            title: "Certinho. Seja Bem Vindo!",
          })
          .then(() => {
            setTimeout(() => {
              window.location.replace("index.html")
            }, 1000)
          })
      })
      .catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
          case "auth/wrong-password":
            swal.fire({
              icon: "error",
              title: "Senha incorreta",
            })
            break
          case "auth/invalid-email":
            swal.fire({
              icon: "error",
              title: "E-mail inválido",
            })
            break
          case "auth/user-not-found":
            swal
              .fire({
                icon: "warning",
                title: "Esse usuário não existe.",
                text: "Deseja criar esse usuário?",
                showCancelButton: true,
                cancelButtonText: "Não",
                cancelButtonColor: "#B22222",
                confirmButtonText: "Sim",
                confirmButtonColor: "#32CD32",
              })
              .then((result) => {
                if (result.value) {
                  signUp(email, password)
                }
              })
            break
          default:
            swal.fire({
              icon: "error",
              title: error.message,
            })
        }
      })
  }
  
  function signUp(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        swal
          .fire({ icon: "success", title: "Usuário foi criado com sucesso" })
          .then(() => {
            setTimeout(() => {
              window.location.replace("index.html")
            }, 1000)
          })
      })
      .catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
          case "auth/weak-password":
            swal.fire({
              icon: "error",
              title: "Senha muito fraca",
            })
            break
          default:
            swal.fire({
              icon: "error",
              title: error.message,
            })
        }
      })
  }
  
  function logout() {
    firebase.auth().signOut()
  }
    