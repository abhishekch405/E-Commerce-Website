var productContent=document.getElementById('product-content');
const url='http://localhost:3000/admin';
axios.get(url).then(res=>{
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
            <button class="shop-item-button" type="button">X</button>
        </div>
    </div>`;
        //console.log("ProductContent",productContent);
        productContent.innerHTML+=product;
        //productContent.appendChild(product);
    });
    console.log(productContent);
    
}).catch(err=>console.log(err));