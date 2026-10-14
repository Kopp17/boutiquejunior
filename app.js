const WAVE_NUMBER = "0758167537";
const WHATSAPP_NUMBER = "225758167537"; // Format international ivoirien, pour ouvrir WhatsApp.
const PRODUCTS = [
 {id:1,name:"Robe Aura",category:"robes",categoryLabel:"Robes",price:18500,size:["S","M","L","XL"],badge:"COUP DE CŒUR",description:"Une silhouette fluide pour vos journées lumineuses.",image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85"},
 {id:2,name:"Ensemble Sable",category:"ensembles",categoryLabel:"Ensembles",price:24000,size:["S","M","L"],badge:"NOUVEAUTÉ",description:"L'accord parfait entre confort et allure.",image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85"},
 {id:3,name:"Robe Élise",category:"robes",categoryLabel:"Robes",price:22000,size:["S","M","L","XL"],badge:"ÉDITION DÉMO",description:"Une pièce élégante pour les moments précieux.",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85"},
 {id:4,name:"Chemisier Perle",category:"tops",categoryLabel:"Hauts",price:12500,size:["S","M","L","XL"],badge:"ESSENTIEL",description:"La pièce facile à associer, du matin au soir.",image:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85"},
 {id:5,name:"Ensemble Ébène",category:"ensembles",categoryLabel:"Ensembles",price:27500,size:["M","L","XL"],badge:"STYLE CHIC",description:"Une allure affirmée, pensée pour sortir.",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"},
 {id:6,name:"Sac Mini Ivoire",category:"accessoires",categoryLabel:"Accessoires",price:15000,size:["Unique"],badge:"ACCESSOIRE",description:"La petite touche finale qui change tout.",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"}
];
let cart = [];
let activeFilter = "all";
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("fr-FR").format(value) + " FCFA";

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
function productCard(product, index) {
  return `<article class="product-card" style="animation-delay:${index * 60}ms">
    <div class="product-photo"><img src="${product.image}" alt="${product.name} — photo de démonstration" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'">
      <span class="product-badge">${product.badge}</span>
      <button class="quick-add" data-add="${product.id}">Ajouter au panier <span>＋</span></button>
    </div>
    <div class="product-meta"><span class="product-category">${product.categoryLabel}</span><h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-bottom"><span class="product-price">${money(product.price)}</span><button class="choose-size" data-add="${product.id}">Choisir ma taille ↗</button></div>
    </div>
  </article>`;
}
function renderProducts() {
  let list = PRODUCTS.filter(p => activeFilter === "all" || p.category === activeFilter);
  const sort = $("#sortProducts").value;
  if (sort === "low") list.sort((a,b) => a.price - b.price);
  if (sort === "high") list.sort((a,b) => b.price - a.price);
  $("#productGrid").innerHTML = list.map(productCard).join("");
  document.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", () => addToCart(Number(btn.dataset.add))));
}
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const current = cart.find(item => item.id === id);
  if (current) {
    if (current.qty < 10) current.qty++;
    else return showToast("Quantité maximale de démonstration atteinte.");
  } else {
    cart.push({...product, qty:1, selectedSize: product.size[0]});
  }
  renderCart();
  showToast(`${product.name} ajouté au panier.`);
}
function changeQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
  renderCart();
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;
  $("#cartTotal").textContent = money(total);
  $("#checkoutItems").textContent = count;
  $("#checkoutTotal").textContent = money(total);
  $("#cartItems").innerHTML = cart.map(item => `<div class="cart-line">
    <img src="${item.image}" alt="" onerror="this.style.opacity='.25'">
    <div><h4>${item.name}</h4><small>Taille : ${item.selectedSize}</small>
      <div class="qty-control"><button data-qty="${item.id}" data-delta="-1" aria-label="Diminuer">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-delta="1" aria-label="Augmenter">+</button><button class="remove-line" data-remove="${item.id}">Retirer</button></div>
    </div><span class="line-price">${money(item.price * item.qty)}</span>
  </div>`).join("");
  $("#cartEmpty").classList.toggle("visible", count === 0);
  $("#cartFooter").style.display = count === 0 ? "none" : "block";
  $("#cartItems").style.display = count === 0 ? "none" : "block";
  document.querySelectorAll("[data-qty]").forEach(btn => btn.addEventListener("click", () => changeQty(Number(btn.dataset.qty), Number(btn.dataset.delta))));
  document.querySelectorAll("[data-remove]").forEach(btn => btn.addEventListener("click", () => {cart=cart.filter(p=>p.id!==Number(btn.dataset.remove));renderCart();}));
}
function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#overlay").classList.add("show");
  document.body.classList.add("locked");
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#overlay").classList.remove("show");
  document.body.classList.remove("locked");
}
function togglePaymentInstructions() {
  $("#waveInstructions").style.display = $("#paymentMethod").value === "wave" ? "block" : "none";
}
function openCheckout() {
  if (!cart.length) return showToast("Votre panier est vide.");
  closeCart();
  $("#checkoutBackdrop").classList.add("show");
  document.body.classList.add("locked");
  togglePaymentInstructions();
}
function closeCheckout() {
  $("#checkoutBackdrop").classList.remove("show");
  document.body.classList.remove("locked");
}
function makeWhatsAppMessage(form) {
  const data = new FormData(form);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const lines = cart.map(item => `• ${item.name} — taille ${item.selectedSize} × ${item.qty} : ${money(item.price * item.qty)}`).join("\n");
  const payment = data.get("payment") === "wave" ? `Wave (à vérifier) — numéro destinataire ${WAVE_NUMBER}` : "Paiement à la livraison";
  return `Bonjour Élégance Ivoire ! Je souhaite passer cette commande :\n\n${lines}\n\nSous-total estimé : ${money(total)}\nPaiement : ${payment}\n\nNom : ${data.get("name")}\nTéléphone : ${data.get("phone")}\nQuartier : ${data.get("area")}\nAdresse / repère : ${data.get("address")}\nNote : ${data.get("note") || "Aucune"}\n\nMerci de confirmer la disponibilité, les frais de livraison et les modalités. Je comprends que les produits et prix affichés sont des exemples à confirmer.`;
}
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active"); activeFilter = btn.dataset.filter; renderProducts();
}));
$("#sortProducts").addEventListener("change", renderProducts);
$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
$("#continueShopping").addEventListener("click", () => {closeCart();$("#boutique").scrollIntoView({behavior:"smooth"});});
$("#checkoutButton").addEventListener("click", openCheckout);
$("#closeCheckout").addEventListener("click", closeCheckout);
$("#checkoutBackdrop").addEventListener("click", e => {if(e.target === $("#checkoutBackdrop")) closeCheckout();});
$("#paymentMethod").addEventListener("change", togglePaymentInstructions);
$("#copyWave").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(WAVE_NUMBER); showToast("Numéro Wave copié."); }
  catch { showToast(`Numéro Wave : ${WAVE_NUMBER}`); }
});
$("#checkoutForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!cart.length) { closeCheckout(); return showToast("Votre panier est vide."); }
  const message = makeWhatsAppMessage(e.currentTarget);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  showToast("Récapitulatif préparé. Confirme la commande dans WhatsApp.");
});
$("#footerWhatsApp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Élégance Ivoire, je souhaite avoir des informations sur vos vêtements.")}`;
$("#mobileMenu").addEventListener("click", () => {
  const nav = document.querySelector(".desktop-nav");
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  if (!open) {
    nav.style.position = "absolute"; nav.style.top = "70px"; nav.style.left = "0"; nav.style.right = "0";
    nav.style.padding = "22px 7%"; nav.style.flexDirection = "column"; nav.style.background = "#f7f5f1";
    nav.style.borderBottom = "1px solid #ddd6cd"; nav.style.gap = "18px";
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {closeCart();closeCheckout();}
});
renderProducts();
renderCart();
