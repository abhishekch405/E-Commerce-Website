window.addEventListener("DOMContentLoaded",after);
async function after(){

    var productContent=document.getElementById('product-content');
    const url='http://localhost:3000/store';
    try {
        const res= await axios.get(url);
        const products=res.data;
        //console.log(fetchedproducts);
        products.forEach(element => {
        //console.log("THIS ELEENT",element);
        const product=`<div id="${element.id}">
        <h3>${element.title}</h3>
        <div class="image-container">
            <img src="${element.imgsrc}" alt="laptop">
        </div>
        <div class="product-details">
            <span>$<span>${element.price}</span></span>
            <button class="shop-item-button" type="button">🛒</button>
        </div>
        </div>`;
        //console.log("ProductContent",productContent);
        productContent.innerHTML+=product;
        //productContent.appendChild(product);
    });
    console.log(productContent);

    } catch (err) {
        console.log(err);
    }
}


// const productcontent=document.getElementById('product-content');
// productcontent.addEventListener('click',(e)=>{
//     if (e.target.className=='shop-item-button'){
//         const id=e.target.parentNode.parentNode.id;
        
//         console.log(id);
//         const url='http://localhost:3000/cart';
//         const obj={
//             id:id
//         }


//         let checker=false;
//         keys.forEach((k)=>{
//             if(k==key){
//                 checker=true;
//                 alert('Product already in the Cart');
//             }
//         })
//         if(checker==false){
//             axios.post(url,obj).then((res)=>{
//                 console.log(res.data);
//                 //localStorage.setItem(key,JSON.stringify(obj));
//             const products=document.getElementById("products");
//             const notif=document.createElement('div');
//             notif.classList.add('notification');
//             notif.innerHTML=`<h4>Your Product: <span> ${name} </span> is added to the cart `;
//             products.appendChild(notif);
//             setTimeout(()=>{
//             notif.remove();
//              },3000)
//             }).catch(err=>console.log(err))
        
//     }
//     }
// })