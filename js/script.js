const URL = '../products/products.json';

getProductStorage = () => JSON.parse(localStorage.getItem('db_products')) ?? []
setProductStorage = (dbProducts) => localStorage.setItem('db_products', JSON.stringify(dbProducts))


API = async (URL) => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        setProductStorage(data);
    } catch (err) {
        console.log(err);
    }
}

API(URL);

fetchProducts = () => {
    let productsBox = document.getElementById('products-flex');
    productsBox.innerHTML = "";

    const dbProducts = getProductStorage();

    for (product of dbProducts) {
        productsBox.innerHTML += `
                <div class="product-item">
                <div class="product-item-img">
                    <img src="${product.imageURL}" alt="">
                </div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button onclick="addToCart('${product.name}')">Adicionar ao Carrinho</button>
            </div>`
    }
}

renderCart = () => {
    let userId = localStorage.getItem('userId')
    let totalItems = 0;
    let checkCart = 'userCart-' + userId;
    if (checkCart.length < 1) {
        document.getElementById('btn-clean').style.display = 'none';
        document.getElementById('h1-void').style.display = 'block';
        document.getElementById('div-total').style.display = 'none';
    } else {
        let h1Total = document.getElementById('div-total');
        let cartContainer = document.getElementById('cart-flex');
        cartContainer.innerHTML = "";
        let products = getProductStorage();
        let cartProducts = JSON.parse(localStorage.getItem(checkCart || "[]"));;
        let cartArr = cartProducts.map(item => {
            for (index of products) {
                if (index.name === item.name) {
                    return { ...index, count: item.count }
                }
            }
        })
        for (index in cartArr) {
            cartContainer.innerHTML += `
        <div class="cart-item">
        <div class="cart-item-img">
            <img src="${cartArr[index].imageURL}" alt="">
        </div>
       <div class="cart-item-info">
       <div class="info"><h3>${cartArr[index].name}</h3></div>
        <div class="info"><h4>Quantidade: ${cartArr[index].count}</h4></div>
        <div class="info"><p>Preço: R$ ${cartArr[index].price}</p></div>
       <div class="info"> <p style="color:rgb(6, 199, 6);">Total: R$ 
       ${cartArr[index].count * parseFloat(cartArr[index].price)}
       </p></div>
      <div class="cart-item-btn">
      <button class="btn-add" onclick="countOneMore('${index}')">+</button>
      <button class="btn-sub" onclick="countOneSub('${index}')">-</button>
      <button class="btn-del" onclick="removeFromCart('${index}')">Deletar</button>
      </div>
       </div>
    </div>
    ${totalItems += cartArr[index].count * parseFloat(cartArr[index].price)}
        `
        }
        h1Total.innerHTML = `Total: R$ ${totalItems}`;
    }
}

addToCart = (prodName) => {
    let userId = JSON.parse(localStorage.getItem('userId'));
    let userCart = 'userCart-' + userId;
    let cart = JSON.parse(localStorage.getItem(userCart || "[]"));
    let inCart = cart.filter(item => item.name === prodName).length;
    if (inCart) {
        for (product of cart) {
            product.name === prodName
                ? product.count++
                : null
        }
    }
    else {
        cart.push({ "name": prodName, "count": 1 });
    }
    localStorage.setItem(userCart, JSON.stringify(cart));
    alert('Produto adicionado');
    fetchProducts();
}

removeFromCart = (index) => {
    if (confirm('Deseja remover este item do carrinho?')) {
        let userId = JSON.parse(localStorage.getItem('userId'));
        let userCart = 'userCart-' + userId;
        let cart = JSON.parse(localStorage.getItem(userCart || "[]"));
        cart.splice(index, 1);
        localStorage.setItem(userCart, JSON.stringify(cart));
        renderCart();
    } else {
        null
    }
}

countOneMore = (index) => {
    let userId = JSON.parse(localStorage.getItem('userId'));
    let userCart = 'userCart-' + userId;
    let cart = JSON.parse(localStorage.getItem(userCart || "[]"));
    cart[index].count++;
    localStorage.setItem(userCart, JSON.stringify(cart));
    renderCart();
}

countOneSub = (index) => {
    let userId = JSON.parse(localStorage.getItem('userId'));
    let userCart = 'userCart-' + userId;
    let cart = JSON.parse(localStorage.getItem(userCart || "[]"));
    if (cart[index].count === 1) {
        if (confirm('Impossível diminuir, deseja remover o item do carrinho?')) {
            cart.splice(index, 1);
            localStorage.setItem(userCart, JSON.stringify(cart));
            renderCart();
        } else {
            null
        }
    } else {
        cart[index].count--;
        localStorage.setItem(userCart, JSON.stringify(cart));
        renderCart();
    }
}

cleanCart = () => {
    if (confirm('Deseja mesmo remover todos os items do carrinho?')) {
        let userId = JSON.parse(localStorage.getItem('userId'));
        let userCart = 'userCart-' + userId;
        let cart = [];
        localStorage.setItem(userCart, JSON.stringify(cart));
        renderCart();
    } else {
        null
    }
}

userLogout = () => {
    localStorage.removeItem('userId');
    location.href = "login.html";
}



