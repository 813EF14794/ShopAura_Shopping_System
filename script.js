const products = [
  {id:1,name:"The Everyday Tote",category:"Accessories",price:799,rating:"4.9",badge:"BESTSELLER",tone:"sand",art:"bag",short:"TOTE"},
  {id:2,name:"Daily Glow Bottle",category:"Beauty",price:549,rating:"4.8",badge:"NEW",tone:"rose",art:"bottle",short:"GLOW"},
  {id:3,name:"Slow Moments Candle",category:"Home",price:399,rating:"4.9",badge:"LOVED",tone:"sand",art:"candle",short:"SLOW"},
  {id:4,name:"Little Leaf Planter",category:"Home",price:649,rating:"4.7",badge:"",tone:"sage",art:"plant",short:"LEAF"},
  {id:5,name:"Everyday Headphones",category:"Tech",price:1299,rating:"4.8",badge:"POPULAR",tone:"blue",art:"headphones",short:"SOUND"},
  {id:6,name:"Notes & Ideas Journal",category:"Accessories",price:299,rating:"4.9",badge:"",tone:"lilac",art:"notebook",short:"NOTES"},
  {id:7,name:"Sunday Ceramic Mug",category:"Home",price:449,rating:"4.8",badge:"NEW",tone:"sage",art:"mug",short:"SUNDAY"},
  {id:8,name:"The Minimal Wallet",category:"Accessories",price:599,rating:"4.7",badge:"",tone:"blue",art:"wallet",short:"MINI"}
];
let activeCategory = "All";
let cart = [];
let searchTerm = "";
let toastTimer;

const productGrid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

function money(value){return "₹" + value.toLocaleString("en-IN");}

function renderProducts(){
  const filtered = products.filter(product =>
    (activeCategory === "All" || product.category === activeCategory) &&
    (product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm))
  );
  productGrid.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    const image = document.createElement("div");
    image.className = "product-image";
    image.dataset.tone = product.tone;
    if(product.badge){
      const badge = document.createElement("span");
      badge.className = "product-badge";
      badge.textContent = product.badge;
      image.appendChild(badge);
    }
    const art = document.createElement("div");
    art.className = `product-art ${product.art}`;
    art.setAttribute("aria-label", product.name);
    image.appendChild(art);
    const add = document.createElement("button");
    add.className = "quick-add";
    add.textContent = "＋ Quick add";
    add.addEventListener("click", () => addToCart(product.id));
    image.appendChild(add);

    const info = document.createElement("div");
    info.className = "product-info";
    const category = document.createElement("div");
    category.className = "product-category";
    category.textContent = product.category;
    const row = document.createElement("div");
    row.className = "product-name-row";
    const name = document.createElement("span");
    name.className = "product-name";
    name.textContent = product.name;
    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = money(product.price);
    row.append(name, price);
    const rating = document.createElement("div");
    rating.className = "product-rating";
    rating.textContent = "★★★★★ ";
    const ratingText = document.createElement("span");
    ratingText.textContent = `${product.rating} · Demo rating`;
    rating.appendChild(ratingText);
    info.append(category, row, rating);
    card.append(image, info);
    productGrid.appendChild(card);
  });
  noResults.classList.toggle("hidden", filtered.length > 0);
  productGrid.classList.toggle("hidden", filtered.length === 0);
}

function addToCart(productId){
  const existing = cart.find(item => item.id === productId);
  if(existing) existing.quantity += 1;
  else cart.push({id:productId,quantity:1});
  renderCart();
  showToast(`${products.find(p=>p.id===productId).name} added to your bag`);
}

function changeQuantity(productId, amount){
  const item = cart.find(entry=>entry.id===productId);
  if(!item) return;
  item.quantity += amount;
  if(item.quantity <= 0) cart = cart.filter(entry=>entry.id!==productId);
  renderCart();
}

function removeFromCart(productId){
  cart = cart.filter(item=>item.id!==productId);
  renderCart();
}

function renderCart(){
  const count = cart.reduce((sum,item)=>sum+item.quantity,0);
  const subtotal = cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.quantity,0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerCount").textContent = `(${count})`;
  document.getElementById("cartItems").innerHTML = "";
  document.getElementById("cartEmpty").classList.toggle("hidden",count>0);
  document.getElementById("cartSummary").classList.toggle("hidden",count===0);

  cart.forEach(item=>{
    const product = products.find(p=>p.id===item.id);
    const row = document.createElement("div");
    row.className = "cart-item";
    const thumb = document.createElement("div");
    thumb.className = "cart-thumb";
    thumb.dataset.tone = product.tone;
    thumb.textContent = product.short;
    const details = document.createElement("div");
    const name = document.createElement("div");
    name.className = "cart-item-name";
    name.textContent = product.name;
    const price = document.createElement("div");
    price.className = "cart-item-price";
    price.textContent = money(product.price);
    const quantity = document.createElement("div");
    quantity.className = "quantity-row";
    const minus = document.createElement("button");
    minus.type = "button"; minus.textContent = "−"; minus.setAttribute("aria-label","Decrease quantity");
    minus.addEventListener("click",()=>changeQuantity(product.id,-1));
    const number = document.createElement("span"); number.textContent = item.quantity;
    const plus = document.createElement("button");
    plus.type = "button"; plus.textContent = "+"; plus.setAttribute("aria-label","Increase quantity");
    plus.addEventListener("click",()=>changeQuantity(product.id,1));
    quantity.append(minus,number,plus);
    details.append(name,price,quantity);
    const remove = document.createElement("button");
    remove.className = "remove-item"; remove.textContent = "×"; remove.title = "Remove item";
    remove.addEventListener("click",()=>removeFromCart(product.id));
    row.append(thumb,details,remove);
    document.getElementById("cartItems").appendChild(row);
  });

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  document.getElementById("cartSubtotal").textContent = money(subtotal);
  document.getElementById("shippingCost").textContent = shipping ? money(shipping) : "Free";
  document.getElementById("cartTotal").textContent = money(subtotal+shipping);
}

function openCart(){
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden","false");
  overlay.classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeCart(){
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden","true");
  overlay.classList.add("hidden");
  document.body.style.overflow="";
}
function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2400);
}

document.querySelectorAll(".category-chip").forEach(button=>{
  button.addEventListener("click",()=>{
    activeCategory = button.dataset.category;
    document.querySelectorAll(".category-chip").forEach(chip=>chip.classList.toggle("active",chip===button));
    renderProducts();
  });
});

document.getElementById("searchToggle").addEventListener("click",()=>{
  document.getElementById("searchStrip").classList.toggle("hidden");
  if(!document.getElementById("searchStrip").classList.contains("hidden")) document.getElementById("searchInput").focus();
});
document.getElementById("searchInput").addEventListener("input",event=>{
  searchTerm = event.target.value.trim().toLowerCase();
  renderProducts();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
document.getElementById("clearSearch").addEventListener("click",()=>{
  document.getElementById("searchInput").value="";
  searchTerm="";
  renderProducts();
});
document.getElementById("viewAll").addEventListener("click",()=>{
  activeCategory="All";
  document.querySelectorAll(".category-chip").forEach(chip=>chip.classList.toggle("active",chip.dataset.category==="All"));
  renderProducts();
});
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("continueShopping").addEventListener("click",()=>{
  closeCart();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
document.getElementById("checkoutBtn").addEventListener("click",()=>{
  showToast("Demo checkout only — no payment was processed.");
});
document.getElementById("menuToggle").addEventListener("click",()=>{
  document.querySelector(".main-nav").classList.toggle("open");
});
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{
  document.querySelector(".main-nav").classList.remove("open");
}));
document.getElementById("newsletterForm").addEventListener("submit",event=>{
  event.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  if(!email) return;
  document.getElementById("newsletterMessage").textContent = "Thanks for joining the list! (Demo subscription)";
  document.getElementById("emailInput").value="";
  showToast("You're on the list — welcome to ShopAura!");
});

renderProducts();
renderCart();
