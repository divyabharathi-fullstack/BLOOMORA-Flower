const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const adminLogin = document.getElementById("adminLogin");
const adminDashboard = document.getElementById("adminDashboard");

const adminImg = document.querySelector(".adminImg");

adminDashboard.style.display = "none";

adminLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = adminEmail.value.trim();
    const password = adminPassword.value.trim();

    if (email === "bharathi@123.gmail.com" && password === "1234") {
        alert("Login Successful!");
        adminImg.style.display = "none";
        adminDashboard.style.display = "block";

    } else {
        alert("Login Wrong!");
        adminDashboard.style.display = "none";
    }
});
const editButton= document.querySelectorAll(".editBtn button");

editButton.forEach(button =>{
    button.addEventListener("click",event=>{
        const row=event.target.closest("tr");
        const mainContent=row.querySelectorAll("td");
        
        
        const newQuantity=prompt("Enter Quantity");

        if (newQuantity === null) {
            return;
        }
        else if(newQuantity.trim()===""){
            alert("enter Quantity");
            return;
        }

       const quantity = Number(mainContent[4].textContent) + Number(newQuantity);
        if(!Number.isInteger(quantity)|| quantity<0){
            alert("Enter a valid quantity");
            return;
        }
        mainContent[4].textContent=quantity;


        if(quantity == 0){
            mainContent[5].textContent="Out of Stock";           
        }
        else if(quantity >0 && quantity<=5){
            mainContent[5].textContent="Low Stock";
        }
        else{
            mainContent[5].textContent="In Stock";
        }           
    });
});

const addflowerButton= document.getElementById("addflower-Button");

addflowerButton.addEventListener("click",()=>{

    const flowerImage = prompt("Enter Image Path");
    if (flowerImage === null || flowerImage.trim() === "") {
        return;
    }

    const flowerName =prompt("Enter flowerName");
    if(flowerName=== null || flowerName.trim()===""){
        return;
    }

    const flowerPrice= prompt("Enter Price");
    if(flowerPrice === null || flowerPrice.trim()===""){
        return;
    }

    const flowerQuantity= prompt("Enter Quantity");
    if(flowerQuantity ===null ||flowerQuantity.trim() ===""){
        return;
    }
    const price = Number(flowerPrice);
    const quantity = Number(flowerQuantity);

    if (!Number.isFinite(price) || price <= 0) {
        alert("Enter a valid price");
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        alert("Enter a valid quantity");
        return;
    };

    const newFlower = {
        id:Date.now(),
        image: flowerImage.trim(),
        name: flowerName.trim(),
        price: price,
        quantity: quantity,
        stockStatus: quantity === 0? "Out of Stock": quantity <= 5? "Low Stock": "In Stock"
    };
    let flowers = JSON.parse(localStorage.getItem("bloomoraFlowers") || "[]");
    flowers.push(newFlower);

    localStorage.setItem("bloomoraFlowers",JSON.stringify(flowers));
    alert("Flower saved successfully!");

    const tbody = document.querySelector("tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${tbody.rows.length + 1}</td>
        <td class="images">
            <img src="${newFlower.image}" width="60">
        </td>
        <td class="Img-Name">${newFlower.name}</td>
        <td>₹${newFlower.price.toLocaleString("en-IN")}</td>
        <td>${newFlower.quantity}</td>
        <td>${newFlower.stockStatus}</td>
        <td class="editBtn"><button>Edit</button></td>
        <td class="deleteBtn"><button>Delete</button></td>
    `;

    tbody.appendChild(row);

    tbody.addEventListener("click", event => {
        if (event.target.closest(".deleteBtn")) {
            const button = event.target.closest(".deleteBtn");
            const row = button.closest("tr");

            if (confirm("Delete this flower?")) {
                row.remove();
            }
        }
    });
})



    

