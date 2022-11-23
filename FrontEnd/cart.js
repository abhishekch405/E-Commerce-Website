window.addEventListener("DOMContentLoaded",showCartProducts)

function showCartProducts(){
    const cart=document.getElementById('cart-items');
    const url="http://localhost:3000/cart"
    axios.get(url)
        .then(res=>{
            //console.log(res.data);
            const products=res.data;
            let total_cart_price=0;
            products.forEach(object=>{
                const productId=object.id;
                const imgsrc=object.imgsrc;
                const title=object.title;
                const price=object.price;
                const description=object.description;
                const quantity=object.cartItems.quantity;
                total_cart_price=parseFloat(total_cart_price)+parseFloat(price)*parseFloat(quantity);
                
                const cartItem=document.createElement('div');
                cartItem.setAttribute("id",`${productId}`);
                cartItem.classList.add('cart-row');
                
                cartItem.innerHTML=`<span class="cart-item cart-column"><img class=" cart-img"src="${imgsrc}" alt="">
                <span>${title}</span></span>
                <span class="cart-price cart-column">${price}</span>
                <span class="cart-quantity cart-column"> <input type="text" value="${quantity}"> <button id="del" class="del">REMOVE</button></span>`;
                cart.appendChild(cartItem);
            })    
            document.querySelector('#total-value').innerText=`${total_cart_price}`;
        })
        .catch(err=>console.log(err));

    
}
const purchaseBtn=document.getElementById("purchase-btn");

purchaseBtn.addEventListener('click',purchase);
function purchase(){
     const cartItems=document.getElementsByClassName('cart-row');
     console.log(cartItems.length)
     Array.from(cartItems).forEach((item)=>{
        item.remove();
        document.querySelector('#total-value').innerText=`${0}`
     })
     alert('Thanks for the Purchase');
}

const cart=document.getElementById('cart');
cart.addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.className=='del'){
        const productId=e.target.parentNode.parentNode.id;
        const object={
            productId:productId
        }
        const url="http://localhost:3000/cart/delete-cart-item"
        axios.post(url,object)
            .then(res=>{console.log(res)})
            .catch(err=>console.log(err));
        
        const price=e.target.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.innerText
        const quantity=e.target.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.firstElementChild.value
       
        const productRemove=e.target.parentNode.parentNode;
        productRemove.remove();
        let totalvalue=document.querySelector('#total-value').innerText;

        totalvalue=parseFloat(totalvalue)-parseFloat(price)*parseFloat(quantity);
        document.querySelector('#total-value').innerText=`${totalvalue}`

    }
})


// window.addEventListener("DOMContentLoaded",addToCart);

// function addToCart(){
//     const cart=document.getElementById('cart-items');
//     var keys=Object.keys(localStorage);
//     let total_cart_price=0;
//     keys.forEach((key)=>{
//         const object=JSON.parse(localStorage.getItem(key));
//         console.log(object);
//         const img_src=object.img;
//         const name=object.name;
//         const price=object.price;
//         const cartItem=document.createElement('div');
//         cartItem.classList.add('cart-row');
//         total_cart_price=parseFloat(total_cart_price)+parseFloat(price);
//         cartItem.innerHTML=`<span class="cart-item cart-column"><img class=" cart-img"src="${img_src}" alt="">
//         <span>${name}</span></span>
//         <span class="cart-price cart-column">${price}</span>
//         <span class="cart-quantity cart-column"> <input type="text" value="1"> <button id="del" class="del">REMOVE</button></span>`;

        
//         cart.appendChild(cartItem);

//     console.log(total_cart_price);
//     document.querySelector('#total-value').innerText=`${total_cart_price}`;

//     });
// }
// const purchaseBtn=document.getElementById("purchase-btn");

// purchaseBtn.addEventListener('click',purchase);
// function purchase(){
//      localStorage.clear();
//      const cartItems=document.getElementsByClassName('cart-row');
//      console.log(cartItems.length)
//      Array.from(cartItems).forEach((item)=>{
//         item.remove();
//         document.querySelector('#total-value').innerText=`${0}`
//      })
//      alert('Thanks for the Purchase');
// }

// const cart=document.getElementById('cart');
// cart.addEventListener('click',(e)=>{
//     if (e.target.className=='del'){
//         const imgsrc=e.target.parentNode.parentNode.firstElementChild.firstElementChild.src;
//         const name=e.target.parentNode.parentNode.firstElementChild.firstElementChild.nextSibling.nextSibling.innerText
//         const price=e.target.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.innerText
//         const productRemove=e.target.parentNode.parentNode;
//         productRemove.remove();
//         let totalvalue=document.querySelector('#total-value').innerText;

//         totalvalue=parseFloat(totalvalue)-parseFloat(price);
//         document.querySelector('#total-value').innerText=`${totalvalue}`


//          const key=`${name}${imgsrc}${price}`;
//          localStorage.removeItem(key);

//     }
// })