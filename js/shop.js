'use strict'
// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    let indexArrProducts = -1;
    let i=0;
    while ( i < products.length && indexArrProducts === -1){
        let idArrProduct = products[i].id;

        if (idArrProduct === id ) {
            indexArrProducts = i;
            // 2. Add found product to the cartList array
            cartList.push(products[i]);
        } else {
            i++;
        }        
    }  
    console.log('cartList: ',cartList);
}

// Exercise 2
function cleanCart() {
    //option1
    //cartList.length = 0;

    //option2 problemas con indice array cartList al rellenar el cartList
    //cartList.splice(0, cartList.length);
    //cart.splice(0, cart.length);

    //option3
    cartList = [];
    cart = [];
    total = 0;
    document.getElementById("cart_list").innerHTML = '';
    document.getElementById("total_price").innerHTML = total;
    return total;
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;
    for (let i = 0; i < cart.length; i++){
        total += cart[i].subtotalWithDiscount;
    }
   
    document.getElementById("total_price").innerHTML = total.toFixed(2);
    return total;
}



// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    
    //cleaning cart in case we update it after pressing the button
    cart.length = 0;
        
    for (let i = 0; i < cartList.length; i++) {
        
        //if cart is empty, add first item
        if (cart.length === 0) {
            //add one quantity attribute and include that unit of product to cart 
            cartList[i].quantity = 1;
            cartList[i].subtotal = cartList[i].price;
            cartList[i].subtotalWithDiscount = cartList[i].subtotal;
            cart.push(cartList[i]);            
            i++;
        }
        
        //searching product in cart 
        let posicionArrCartEncontrado = -1;
        let j = 0;
        while( j < cart.length  && posicionArrCartEncontrado == -1 ) {
            if (cartList[i].id === cart[j].id) {
                posicionArrCartEncontrado = j;
            }
            j++;
        }

        if (posicionArrCartEncontrado === -1) {
            //this product was not in cart, we add quantity attribute and include that unit of product to cart 
            cartList[i].quantity = 1;
            cartList[i].subtotal = cartList[i].price;
            cartList[i].subtotalWithDiscount = cartList[i].subtotal;
            cart.push(cartList[i]);
        } else {
            //the product is already in the cart array, we add one more unit
            cart[posicionArrCartEncontrado].quantity += 1;
            cart[posicionArrCartEncontrado].subtotal = cart[posicionArrCartEncontrado].price * cart[posicionArrCartEncontrado].quantity;
            cart[posicionArrCartEncontrado].subtotalWithDiscount = cart[posicionArrCartEncontrado].subtotal;
        }
        
    }
    console.log('cart :', cart);
    return cart;
}

// Exercise 5
function applyPromotionsCart() {
     // Apply promotions to each item in the array "cart"
     cart.forEach(function(item){
        if (item.name == 'cooking oil') {
            item.price = (item.quantity >= 3) ? 10 : 10.5;                       
            item.subtotalWithDiscount = item.price * item.quantity;
        } else if (item.id === 3){
            item.price = (item.quantity >= 10) ? 3.33 : 5;   
            item.subtotalWithDiscount = Number(item.quantity * item.price.toFixed(2)); //toFixed() returns numbers as string       
        }        
    })

    console.log('cart-con-promos: ',cart);
    return cart;
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    
    
    //generateCart();
    applyPromotionsCart();
    calculateTotal();
    let shoppingCartItem = "";
    cart.forEach(function(item){
                
        shoppingCartItem += `<tr id="line-${item.id}">
        <th scope="row">${item.name}</th>
        <td>${item.price}</td>
        <td> <button onclick="removeFromCart(${item.id})">-</button>  ${item.quantity} <button onclick="addToCart(${item.id})">\+</button> </td>
        <td>${item.subtotalWithDiscount}</td>
        </tr>`;
       
    })
    console.log('shoppingCartItem: ', shoppingCartItem);
    document.getElementById("cart_list").innerHTML = shoppingCartItem;
    
}


// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    // conocer posicion en el array productos del producto comprado (id) 
    let indexArrProducts = -1;
    let i = 0;
    while ( i < products.length && indexArrProducts === -1 ) {
        if (products[i].id == id) {
            indexArrProducts = i;

            //once bought the product goes to cartList
            cartList.push(products[i]);  // array.push(item) returns the new length of the array once the item has been pushed.
            let cartListIndexAddedProduct = cartList.length - 1;
            console.log('cartList: ',cartList);
            console.log('cart',cart);

            //cartList[cartListIndexAddedProduct].hasOwnProperty('quantity') 
            //if the bought product has previously been bought, it is already in cart 
            let indexProductInCart = cart.findIndex(item => item.id == cartList[cartListIndexAddedProduct].id);
            console.log('indexProductInCart',indexProductInCart);
                //product is not in cart
            if (indexProductInCart === -1 || cart.length === 0) {
                cartList[cartListIndexAddedProduct].quantity = 1;
                cartList[cartListIndexAddedProduct].subtotalWithDiscount = cartList[cartListIndexAddedProduct].price;
                cart.push(cartList[cartListIndexAddedProduct]);
                
            } else {
                cart[indexProductInCart].quantity += 1;
                cart[indexProductInCart].subtotalWithDiscount = cart[indexProductInCart].price * cart[indexProductInCart].quantity;
            }            
        }
        i++;        
    }
    console.log('cartList2: ',cartList);
    console.log('cart2',cart);
    printCart();
}

// Exercise 9
function removeFromCart(id) {
    // remove one unit of the product or remove it completely from cart array 

    let indexProdOfCartToRemove = cart.findIndex(item => item.id === id);
    
    if (cart[indexProdOfCartToRemove].quantity  > 1) {
        cart[indexProdOfCartToRemove].quantity -= 1;
    } else {
        cart[indexProdOfCartToRemove].quantity -= 1;
        delete cart[indexProdOfCartToRemove];
        document.getElementById("line-" + id).innerHTML = '';
    }
    
    printCart();
}

function open_modal(){
	console.log("Open Modal");
	//printCart();
}