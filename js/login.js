let login = document.getElementById('login');

login.addEventListener("click", (() => {
    let dbUsers = JSON.parse(localStorage.getItem('users'));

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    let isAuth = false;

    for (index in dbUsers) {
        if (dbUsers[index].email === user.email && dbUsers[index].password === user.password) {
            localStorage.setItem('userId', dbUsers[index].id);
            isAuth = true;
            location.href = 'index.html'
            location.reload();
            break;
        }
    }
    if (!isAuth) {
        alert('Dados inválidos')
    }
}));