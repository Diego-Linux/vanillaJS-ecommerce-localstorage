datatimeRandom = () => {
    return ((new Date().getTime() / 1000) * Math.random());
}

userRegister = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confPassword = document.getElementById('confPassword').value;

    let user = {
        name,
        email,
        password,
        id: datatimeRandom()
    }

    let userCart = `userCart-${user.id}`;

    if (name.length === 0 || email.length === 0 || password.length < 6) {
        alert('Preencha todos os campos corretamente')
    }

    else if (password !== confPassword) {
        alert('Senhas incompatíveis')
    }
    else if (localStorage.getItem('users') === null) {
        let users = [];
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem(userCart, JSON.stringify([]))
        location.href = 'login.html'
    }
    else {
        let users = JSON.parse(localStorage.getItem('users'));
        let userExists = users.filter((data) => {
            return data.email == user.email;
        }).length;

        if (userExists) {
            alert('Este e-mail já está em uso')
        }
        else {
            users.push(user)
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem(userCart, JSON.stringify([]));
            location.href = 'login.html'
        }
    }
};

userLogin = () => {
    let dbUsers = JSON.parse(localStorage.getItem('users'));

    let user = {
        email: document.getElementById('loginemail').value,
        password: document.getElementById('loginpassword').value
    }

    let isAuth = false;

    for (index in dbUsers) {
        if (dbUsers[index].email === user.email && dbUsers[index].password === user.password) {
            localStorage.setItem('userId', dbUsers[index].id);
            isAuth = true;
            location.href = 'index.html'
            break;
        }
    }
    if (!isAuth) {
        alert('Dados inválidos')
    }
}