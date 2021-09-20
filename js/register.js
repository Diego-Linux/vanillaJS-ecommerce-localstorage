let register = document.getElementById('register');

function datatimeRandom() {
    return((new Date().getTime() / 1000) * Math.random());
}


register.addEventListener('click', (() => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = {
        name,
        email,
        password,
        id:datatimeRandom()
    }

    let userCart = `userCart-${user.id}`;

    if (name.length === 0 || email.length === 0 || password.length < 6) {
        alert('Preencha todos os campos corretamente')
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
}));

