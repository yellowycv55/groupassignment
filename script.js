document.addEventListener("DOMContentLoaded", () => {
    // Slideshow logic
    let slideshowImages = document.querySelectorAll(".slideshow-image");
    let currentImageIndex = 0;

    function showNextImage() {
        slideshowImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        slideshowImages[currentImageIndex].classList.add("active");
    }

    setInterval(showNextImage, 9000); // Change image every 9 seconds

    // Cart logic
    let cartItems = [];
    let cartList = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let cartSection = document.getElementById("cart-section");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            let name = e.target.getAttribute("data-name");
            let price = parseInt(e.target.getAttribute("data-price"));

            let existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    document.getElementById("clear-cart").addEventListener("click", () => {
        cartItems.length = 0;
        updateCart();
    });

    function updateCart() {
        cartList.innerHTML = "";
        let totalPrice = 0;

        cartItems.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - ₦${item.price} x ${item.quantity}`;
            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                let itemIndex = cartItems.indexOf(item);
                cartItems.splice(itemIndex, 1);
                updateCart();
            });
            li.appendChild(removeButton);
            cartList.appendChild(li);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice;

        // Show or hide the cart section
        if (cartItems.length > 0) {
            cartSection.style.display = "block";
        } else {
            cartSection.style.display = "none";
        }
    }

    document.getElementById("place-order").addEventListener("click", () => {
        // Add order placing logic here
        alert("Order placed successfully!");
    });

    // Search functionality
    let searchInput = document.getElementById("search");
    let productsSection = document.getElementById("products-section");

    let products = [
        { name: "Android Device", price: 250000, img: "phone.jpg" },
        { name: "YCV1", price: 200000, img: "YCV1.jpg" },
        { name: "YCV2", price: 150000, img: "YCV2.jpg" },
        { name: "YCV3", price: 18800000, img: "YCV3.jpg" },
        { name: "YCV4", price: 5000, img: "YCV4.jpg" },
        { name: "YCV5", price: 280000, img: "YCV5.jpg" },
        { name: "YCV6", price: 350000, img: "YCV6.webp" },
        { name: "YCV7", price: 450000, img: "YCV7.jpg" },
        { name: "YCV8", price: 120000, img: "YCV8.jpg" },
        { name: "YCV9", price: 56000, img: "YCV9.jpg" },
        { name: "YCV10", price: 40000, img: "YCV10.webp" },
        { name: "YCV11", price: 130000, img: "YCV11.jfif" },
        { name: "YCV12", price: 300000, img: "YCV12.webp" },
        { name: "YCV13", price: 235000, img: "YCV13.png" },
        { name: "YCV14", price: 900000, img: "YCV14.jfif" },
        { name: "YCV15", price: 11000, img: "YCV15.jpg" },
        { name: "YCV16", price: 420000, img: "YCV16.webp" },
        { name: "YCV17", price: 5500000, img: "YCV17.jpg" },
        { name: "YCV18", price: 8000, img: "YCV18.jpg" },
        { name: "YCV19", price: 134000, img: "YCV19.jpg" }
    ];

    searchInput.addEventListener("input", () => {
        let query = searchInput.value.toLowerCase();
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

        productsSection.innerHTML = filteredProducts.map(product => `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <p class="price">₦${product.price.toLocaleString()}</p>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            </div>
        `).join("");

        // Add event listeners for new Add to Cart buttons
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (e) => {
                let name = e.target.getAttribute("data-name");
                let price = parseInt(e.target.getAttribute("data-price"));

                let existingItem = cartItems.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({ name, price, quantity: 1 });
                }
                updateCart();
            });
        });
    });
});

