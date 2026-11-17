const cart = document.querySelector(".cart");
const openBtn = document.getElementById("cart-open");
const closeBtn = document.getElementById("cartclose");

openBtn.addEventListener("click", function () {
    cart.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    cart.classList.remove("active");
});

const addCartBtn =document.querySelectorAll(".add-cart");
const cartContent =document.querySelector(".cart-content");

addCartBtn.forEach(button =>{
    button.addEventListener("click",event =>{
        const imgBox =event.target.closest(".img-box");
        alert("Added to Cart Successfully");
        addToCart(imgBox);
    });
});

const addToCart =imgBox =>{
    const flowerImgSrc =imgBox.querySelector("img").src;
    const flowerName =imgBox.querySelector(".flower-name").textContent;
    const flowerPrice =imgBox.querySelector(".flower-price").textContent;

    const cartItems =cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItems){
        if(item.textContent ===flowerName){
            alert("This item is already in the cart!");
            return;
        }
    }

    const cartBox =document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML=`
        <img src="${flowerImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${flowerName}</h2>
            <span class="cart-price">${flowerPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="fa-regular fa-trash-can cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click",() =>{
        cartBox.remove();
        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click",event =>{
        const numberElement =cartBox.querySelector(".number");
        let quantity =Number(numberElement.textContent);

        if(event.target.id ==="decrement" && quantity>1){
            quantity--;
        }
        else if(event.target.id === "increment"){
            quantity ++;            
        }
        numberElement.textContent =quantity;
        updateTotalPrice();
    });
    updateTotalPrice(); 
};

function updateTotalPrice() {
    const totalPrice =document.querySelector(".total-price");
    const cartBoxes =cartContent.querySelectorAll(".cart-box");

    let total =0;
    cartBoxes.forEach(cartBox =>{
        const priceElement =cartBox.querySelector(".cart-price");
        const quantityElement =cartBox.querySelector(".number");
        const price =Number(priceElement.textContent.replace(/,/g, "").replace(/[^\d.]/g, ""));
        const quantity =Number(quantityElement.textContent);
        total += price * quantity;

    });
    totalPrice.textContent = total.toLocaleString("en-IN");
};

const buyNowButton =document.querySelector(".btn-buy");
buyNowButton.addEventListener("click",()=>{
    const cartBoxes= cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length ===0){
        alert("Your cart is empty, Please add items to your cart before buying.");
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());

    updateTotalPrice();
    alert(
        "Thank you for your order! 💐\n\n"+
        "Your flowers are on their way to spread happiness.💖"
    );
})









