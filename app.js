/* ============================================================
   GABRIELLA STYLE HAVEN — app.js
   All application logic: state, routing, auth, shop, cart,
   checkout, payment, admin, MoMo flow, receipts
   ============================================================ */

'use strict';

// ===================== IMAGE DATA =====================
const IMG_STORE = {}; // Stores base64 images uploaded from device

const DEFAULT_IMGS = {
  'Ankara Wrap Dress':   'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
  'Gold Leaf Earrings':  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
  'Silk Blazer':         'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80',
  'Woven Bucket Bag':    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  'Kente Skirt':         'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&q=80',
  'Leather Mules':       'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
  'Pearl Choker':        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
  'Linen Co-ord Set':    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
  'Straw Tote':          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  'Statement Sunglasses':'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80',
  'Bodycon Midi Dress':  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
  'Platform Sandals':    'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&q=80'
};

const CAT_IMGS = {
  Dresses:     'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=70',
  Tops:        'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=300&q=70',
  Bottoms:     'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=300&q=70',
  Sets:        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=70',
  Jewelry:     'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=70',
  Bags:        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=70',
  Shoes:       'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=70',
  Accessories: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=300&q=70'
};

function pImg(id, name) {
  return IMG_STORE[id] || DEFAULT_IMGS[name] ||
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80';
}

// ===================== APP STATE =====================
const S = {
  user:      null,
  cart:      [],
  orders:    [],
  admins:    [],
  customers: [],
  filter:    'All',
  pay:       'card',
  adminSec:  'dash',
  ppStep:    0,
  ppNum:     '',
  ppNet:     'mtn'
};

const CATS = ['All','Dresses','Tops','Bottoms','Sets','Jewelry','Bags','Shoes','Accessories'];

const PRODS = [
  { id:1,  name:'Ankara Wrap Dress',    cat:'Dresses',     price:189, stock:24, desc:'A stunning wrap dress featuring vibrant Ankara print.',            sizes:['XS','S','M','L','XL'],          colors:['Multi'],           featured:true  },
  { id:2,  name:'Gold Leaf Earrings',   cat:'Jewelry',     price:65,  stock:42, desc:'Handcrafted gold-plated leaf earrings that complement any outfit.', sizes:['One Size'],                     colors:['Gold'],            featured:true  },
  { id:3,  name:'Silk Blazer',          cat:'Tops',        price:245, stock:15, desc:'Luxurious silk-feel blazer with structured shoulder and tailored fit.', sizes:['S','M','L','XL'],            colors:['Black','White','Camel'], featured:true },
  { id:4,  name:'Woven Bucket Bag',     cat:'Bags',        price:129, stock:18, desc:'Artisan-woven bucket bag with leather trim.',                       sizes:['One Size'],                     colors:['Natural','Black'], featured:false },
  { id:5,  name:'Kente Skirt',          cat:'Bottoms',     price:155, stock:9,  desc:'Elegant midi skirt with authentic Kente weave.',                    sizes:['XS','S','M','L'],               colors:['Multi'],           featured:true  },
  { id:6,  name:'Leather Mules',        cat:'Shoes',       price:210, stock:30, desc:'Genuine leather mules with a 5cm heel.',                           sizes:['36','37','38','39','40','41'],   colors:['Nude','Black'],    featured:false },
  { id:7,  name:'Pearl Choker',         cat:'Jewelry',     price:88,  stock:35, desc:'Freshwater pearl choker with sterling silver clasp.',               sizes:['One Size'],                     colors:['White'],           featured:false },
  { id:8,  name:'Linen Co-ord Set',     cat:'Sets',        price:199, stock:12, desc:'Breathable linen co-ord set with wide-leg trousers.',               sizes:['XS','S','M','L','XL'],          colors:['Sand','Sage'],     featured:true  },
  { id:9,  name:'Straw Tote',           cat:'Bags',        price:95,  stock:22, desc:'Handmade straw tote with canvas lining.',                          sizes:['One Size'],                     colors:['Natural'],         featured:false },
  { id:10, name:'Statement Sunglasses', cat:'Accessories', price:72,  stock:28, desc:'Oversized cat-eye frames with UV400 protection.',                   sizes:['One Size'],                     colors:['Black','Tortoise'],featured:false },
  { id:11, name:'Bodycon Midi Dress',   cat:'Dresses',     price:175, stock:6,  desc:'Stretch-fabric bodycon dress.',                                     sizes:['XS','S','M','L'],               colors:['Black','Red'],     featured:false },
  { id:12, name:'Platform Sandals',     cat:'Shoes',       price:185, stock:0,  desc:'Bold platform sandals with ankle strap.',                           sizes:['36','37','38','39','40'],        colors:['Black','White'],   featured:false }
];

// ===================== UTILITIES =====================
const $ = id => document.getElementById(id);
const fmt = n => 'GH₵ ' + n.toFixed(2);
const cartTotal = () => S.cart.reduce((s, i) => s + PRODS.find(p => p.id === i.id).price * i.qty, 0);
const stockC = s => s === 0 ? 'var(--danger)' : s < 10 ? 'var(--warn)' : 'var(--success)';
const stockL = s => s === 0 ? 'Out of stock' : s < 10 ? `Only ${s} left` : `In stock (${s})`;
function imgErr(el) { el.style.display = 'none'; }

function toast(msg, type = 'info') {
  const t = $('toast');
  $('t-ic').textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  $('t-msg').textContent = msg;
  t.style.borderLeftColor = type === 'success' ? 'var(--success)'
    : type === 'error' ? 'var(--danger)' : 'var(--p400)';
  t.classList.add('on');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('on'), 3000);
}

function openM(id)  { $(id).classList.add('on'); }
function closeM(id) { $(id).classList.remove('on'); }
function hidePage(id) { const el = $(id); if (el) el.style.display = 'none'; }
function showEl(id)   { const el = $(id); if (el) el.style.display = 'flex'; }

// ===================== LANDING & AUTH ROUTING =====================
function showLanding() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  hidePage('page-auth-admin');
  hidePage('page-auth-customer');
  showEl('page-landing');
  $('topbar').classList.remove('on');
}

function showAuth(type) {
  hidePage('page-landing');
  if (type === 'admin') {
    showEl('page-auth-admin');
    hidePage('page-auth-customer');
  } else {
    hidePage('page-auth-admin');
    showEl('page-auth-customer');
  }
}

function toggleAdminReg() {
  const r = $('admin-reg');
  r.style.display = r.style.display === 'none' ? 'block' : 'none';
}

function custTab(tab) {
  $('cust-in').style.display = tab === 'in' ? '' : 'none';
  $('cust-up').style.display = tab === 'up' ? '' : 'none';
  $('ct-in').className = 'auth-tab-btn' + (tab === 'in' ? ' on' : '');
  $('ct-up').className = 'auth-tab-btn' + (tab === 'up' ? ' on' : '');
}

// ===================== ADMIN AUTH =====================
function doAdminLogin() {
  const em = $('a-em').value.trim(), pw = $('a-pw').value;
  const u = S.admins.find(u => u.email === em && u.pw === pw);
  if (!u) { toast('Incorrect admin credentials.', 'error'); return; }
  loginUser(u);
}

function doAdminRegister() {
  const fn = $('ar-fn').value.trim(), ln = $('ar-ln').value.trim();
  const em = $('ar-em').value.trim(), pw = $('ar-pw').value;
  if (!em || !pw) { toast('Email and password required.', 'error'); return; }
  if (pw.length < 6) { toast('Password must be 6+ characters.', 'error'); return; }
  if (S.admins.find(u => u.email === em)) { toast('Email already registered.', 'error'); return; }
  const u = {
    id: Date.now(),
    name: (fn + ' ' + ln).trim() || em.split('@')[0],
    email: em, phone: '', pw, role: 'admin',
    joined: new Date().toISOString().slice(0, 10)
  };
  S.admins.push(u);
  loginUser(u);
  toast('Admin account created ✓', 'success');
}

// ===================== CUSTOMER AUTH =====================
function doCustLogin() {
  const em = $('c-em').value.trim(), pw = $('c-pw').value;
  const u = S.customers.find(u => u.email === em && u.pw === pw);
  if (!u) { toast('Incorrect email or password.', 'error'); return; }
  loginUser(u);
}

function doCustRegister() {
  const fn = $('cr-fn').value.trim(), ln = $('cr-ln').value.trim();
  const em = $('cr-em').value.trim(), ph = $('cr-ph').value.trim(), pw = $('cr-pw').value;
  if (!em || !pw) { toast('Email and password required.', 'error'); return; }
  if (pw.length < 6) { toast('Password must be 6+ characters.', 'error'); return; }
  if (S.customers.find(u => u.email === em)) { toast('Email already registered.', 'error'); return; }
  const u = {
    id: Date.now(),
    name: (fn + ' ' + ln).trim() || em.split('@')[0],
    email: em, phone: ph, pw, role: 'customer',
    joined: new Date().toISOString().slice(0, 10)
  };
  S.customers.push(u);
  loginUser(u);
  toast('Welcome to Gabriella Style Haven ✦', 'success');
}

function loginUser(u) {
  S.user = u;
  hidePage('page-landing');
  hidePage('page-auth-admin');
  hidePage('page-auth-customer');
  $('topbar').classList.add('on');
  renderNav();
  goPage(u.role === 'admin' ? 'admin' : 'home');
}

function logout() {
  S.user = null;
  S.cart = [];
  $('topbar').classList.remove('on');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  showLanding();
  closeDrawer();
}

// ===================== NAVIGATION =====================
function renderNav() {
  const cnt = S.cart.reduce((s, i) => s + i.qty, 0);
  const isAdmin = S.user?.role === 'admin';

  // Desktop
  let dh = `<button class="nb" onclick="goPage('home')" id="nb-home">Home</button>
    <button class="nb" onclick="goPage('shop')" id="nb-shop">Shop</button>`;
  if (isAdmin) dh += `<button class="nb" onclick="goPage('admin')" id="nb-admin">Admin</button>`;
  dh += `<button class="nb" onclick="goPage('orders')" id="nb-orders">Orders</button>
    <button class="nb" onclick="goPage('cart')" id="nb-cart">Cart${cnt ? `<span class="cbadge">${cnt}</span>` : ''}</button>
    <button class="nb" onclick="logout()" style="color:#C0A0EC;opacity:.8;">Sign Out</button>`;
  $('nav-desktop').innerHTML = dh;

  // Mobile drawer
  const navItems = [
    { icon: '🏠', label: 'Home',   page: 'home'   },
    { icon: '🛍️', label: 'Shop',   page: 'shop'   },
    ...(isAdmin ? [{ icon: '⚙️', label: 'Admin', page: 'admin' }] : []),
    { icon: '📦', label: 'Orders', page: 'orders' },
    { icon: '🛒', label: `Cart${cnt ? ` (${cnt})` : ''}`, page: 'cart', badge: cnt }
  ];
  $('mob-nav').innerHTML = navItems.map(n => `
    <button class="mob-nb" id="mn-${n.page}" onclick="goPage('${n.page}');closeDrawer()">
      <span class="mob-icon">${n.icon}</span>${n.label}
      ${n.badge ? `<span class="mob-badge">${n.badge}</span>` : ''}
    </button>`).join('') +
    `<button class="mob-nb" onclick="logout()" style="color:#C0A0EC;margin-top:auto;border-top:1px solid rgba(255,255,255,.07);">
      <span class="mob-icon">🚪</span>Sign Out
    </button>`;
}

function setActiveNav(name) {
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mob-nb').forEach(b => b.classList.remove('active'));
  const d = $('nb-' + name), m = $('mn-' + name);
  if (d) d.classList.add('active');
  if (m) m.classList.add('active');
}

function openDrawer()  { $('mob-drawer').classList.add('on'); }
function closeDrawer() { $('mob-drawer').classList.remove('on'); }

// ===================== ROUTING =====================
function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  $('page-' + name).classList.add('on');
  setActiveNav(name);
  if (name === 'home')     renderHome();
  if (name === 'shop')     renderShopPage();
  if (name === 'cart')     renderCart();
  if (name === 'checkout') renderCheckout();
  if (name === 'orders')   renderOrders();
  if (name === 'admin')    aSection(S.adminSec);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeDrawer();
}

// ===================== HOME PAGE =====================
function renderHome() {
  $('home-cats').innerHTML = CATS.filter(c => c !== 'All').map((c, i) => `
    <div class="cat-card" style="animation-delay:${i * 0.05}s" onclick="S.filter='${c}';goPage('shop')">
      <img class="cat-img" src="${CAT_IMGS[c] || ''}" alt="${c}" loading="lazy" onerror="imgErr(this)"/>
      <div class="cat-info">
        <div style="font-size:12px;font-weight:600;">${c}</div>
        <div style="font-size:11px;color:var(--muted);">${PRODS.filter(p => p.cat === c).length} items</div>
      </div>
    </div>`).join('');
  $('home-feat').innerHTML = PRODS.filter(p => p.featured).slice(0, 6).map((p, i) => pcHTML(p, i)).join('');
}

// ===================== SHOP PAGE =====================
function renderShopPage() {
  $('filter-row').innerHTML = CATS.map(c =>
    `<button class="fchip${S.filter === c ? ' on' : ''}"
      onclick="S.filter='${c}';renderShop();document.querySelectorAll('.fchip').forEach(b=>b.classList.remove('on'));this.classList.add('on');"
    >${c}</button>`
  ).join('');
  renderShop();
}

function renderShop() {
  const q = ($('sq')?.value || '').toLowerCase();
  const list = PRODS.filter(p =>
    (S.filter === 'All' || p.cat === S.filter) &&
    (!q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
  );
  $('shop-grid').innerHTML = list.length
    ? list.map((p, i) => pcHTML(p, i)).join('')
    : `<div class="empty" style="grid-column:1/-1;"><div class="empty-ic">🔍</div><h3>Nothing found</h3><p>Try a different filter.</p></div>`;
}

function pcHTML(p, i = 0) {
  const inCart = S.cart.find(c => c.id === p.id);
  return `<div class="pcard" style="animation-delay:${Math.min(i, 5) * 0.08}s">
    <div class="pcard-img-wrap" onclick="openProd(${p.id})" style="cursor:pointer;">
      <img class="pcard-img" src="${pImg(p.id, p.name)}" alt="${p.name}" loading="lazy" onerror="imgErr(this)"/>
      ${p.featured ? '<div class="pcard-tag pcard-tag-feat">Featured</div>' : ''}
      ${p.stock === 0 ? '<div class="pcard-tag pcard-tag-sold">Sold Out</div>' : ''}
      <button class="pcard-wish" onclick="event.stopPropagation();toast('Added to wishlist','success')">♡</button>
    </div>
    <div class="pcard-body">
      <div class="pcard-cat">${p.cat}</div>
      <div class="pcard-name" onclick="openProd(${p.id})">${p.name}</div>
      <div class="pcard-price">${fmt(p.price)}</div>
      <div class="pcard-stock" style="color:${stockC(p.stock)};">
        <span class="sdot" style="background:${stockC(p.stock)};"></span>${stockL(p.stock)}
      </div>
    </div>
    <div class="pcard-actions">
      <button class="btn btn-pu btn-sm" style="flex:1;" ${p.stock === 0 ? 'disabled' : ''} onclick="addCart(${p.id})">
        ${inCart ? `In Cart (${inCart.qty})` : '+ Add'}
      </button>
      <button class="btn btn-ghost btn-sm" onclick="openProd(${p.id})">View</button>
    </div>
  </div>`;
}

function openProd(id) {
  const p = PRODS.find(p => p.id === id);
  const inCart = S.cart.find(i => i.id === id);
  $('mod-prod-body').innerHTML = `
    <img src="${pImg(p.id, p.name)}" alt="${p.name}"
      style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;margin-bottom:16px;"
      loading="lazy" onerror="imgErr(this)"/>
    <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;">${p.cat}</div>
    <h2 class="modal-h" style="margin:4px 0 6px;">${p.name}</h2>
    <div style="font-size:21px;color:var(--p700);font-weight:700;margin-bottom:10px;">${fmt(p.price)}</div>
    <p style="color:var(--muted);font-size:13px;line-height:1.7;margin-bottom:14px;">${p.desc}</p>
    <div style="display:flex;gap:18px;font-size:12px;margin-bottom:12px;">
      <span><span style="color:var(--muted);">Sizes:</span> ${p.sizes.join(', ')}</span>
      <span><span style="color:var(--muted);">Colors:</span> ${p.colors.join(', ')}</span>
    </div>
    <div style="font-size:12px;color:${stockC(p.stock)};display:flex;align-items:center;gap:5px;margin-bottom:16px;">
      <span class="sdot" style="background:${stockC(p.stock)};width:7px;height:7px;"></span>${stockL(p.stock)}
    </div>
    <button class="btn btn-pu" style="width:100%;" ${p.stock === 0 ? 'disabled' : ''}
      onclick="addCart(${id});closeM('mod-prod');">${inCart ? 'Add Another' : 'Add to Cart'}</button>`;
  openM('mod-prod');
}

// ===================== CART =====================
function addCart(id) {
  const p = PRODS.find(p => p.id === id);
  if (!p || p.stock === 0) { toast('Out of stock.', 'error'); return; }
  const item = S.cart.find(i => i.id === id);
  if (item) {
    if (item.qty >= p.stock) { toast('Max stock reached.', 'error'); return; }
    item.qty++;
  } else {
    S.cart.push({ id, qty: 1 });
  }
  toast(`${p.name} added!`, 'success');
  renderNav();
}

function removeCart(id) {
  S.cart = S.cart.filter(i => i.id !== id);
  renderCart();
  renderNav();
}

function changeQty(id, d) {
  const item = S.cart.find(i => i.id === id);
  const p = PRODS.find(p => p.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(p.stock, item.qty + d));
  renderCart();
  renderNav();
}

function renderCart() {
  const lbl = $('cart-lbl'), items = $('cart-items'), foot = $('cart-foot');
  const total = cartTotal(), cnt = S.cart.reduce((s, i) => s + i.qty, 0);
  lbl.textContent = cnt + ' item' + (cnt !== 1 ? 's' : '');

  if (!S.cart.length) {
    items.innerHTML = `<div class="empty"><div class="empty-ic">🛍️</div><h3>Cart is empty</h3>
      <p>Browse and add something beautiful.</p>
      <button class="btn btn-pu" style="margin-top:14px;" onclick="goPage('shop')">Shop Now</button></div>`;
    foot.innerHTML = '';
    return;
  }

  items.innerHTML = S.cart.map(item => {
    const p = PRODS.find(p => p.id === item.id);
    return `<div class="cart-item">
      <img class="ci-img" src="${pImg(p.id, p.name)}" alt="${p.name}" onerror="imgErr(this)"/>
      <div class="ci-info">
        <div class="ci-name">${p.name}</div>
        <div style="font-size:11px;color:var(--muted);">${p.cat}</div>
        <div style="color:var(--p700);font-weight:700;font-size:13px;margin-top:2px;">${fmt(p.price)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <button class="qb" onclick="changeQty(${p.id},-1)">−</button>
        <span style="font-size:14px;font-weight:600;min-width:18px;text-align:center;">${item.qty}</span>
        <button class="qb" onclick="changeQty(${p.id},1)">+</button>
      </div>
      <div style="min-width:70px;text-align:right;">
        <div style="font-weight:700;font-size:13px;">${fmt(p.price * item.qty)}</div>
        <button onclick="removeCart(${p.id})"
          style="background:none;border:none;color:var(--danger);font-size:11px;cursor:pointer;margin-top:4px;">Remove</button>
      </div>
    </div>`;
  }).join('');

  const ship = total > 500 ? 0 : 25;
  foot.innerHTML = `<div class="cart-sum-box">
    <div style="display:flex;justify-content:space-between;margin-bottom:7px;font-size:13px;">
      <span style="color:var(--muted);">Subtotal</span><span>${fmt(total)}</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:7px;font-size:13px;">
      <span style="color:var(--muted);">Shipping</span>
      <span>${ship === 0 ? '<span style="color:var(--success);font-weight:600;">Free</span>' : fmt(ship)}</span></div>
    <div class="divider"></div>
    <div style="display:flex;justify-content:space-between;font-size:17px;font-weight:700;margin-bottom:16px;">
      <span>Total</span><span style="color:var(--p700);">${fmt(total + ship)}</span></div>
    ${total < 500 ? `<p style="font-size:11px;color:var(--muted);margin-bottom:10px;">Add ${fmt(500 - total)} more for free shipping!</p>` : ''}
    <button class="btn btn-pu btn-lg" style="width:100%;" onclick="goPage('checkout')">Proceed to Checkout →</button>
  </div>`;
}

// ===================== CHECKOUT =====================
function renderCheckout() {
  if (S.user) {
    $('co-em').value = S.user.email || '';
    $('co-ph').value = S.user.phone || '';
  }
  selPay('card');
  renderCoSum();
}

function renderCoSum() {
  const total = cartTotal(), ship = total > 500 ? 0 : 25;
  $('co-sum').innerHTML = S.cart.map(i => {
    const p = PRODS.find(p => p.id === i.id);
    return `<div style="display:flex;gap:9px;align-items:center;margin-bottom:10px;">
      <img src="${pImg(p.id, p.name)}"
        style="width:42px;height:42px;object-fit:cover;border-radius:7px;" onerror="imgErr(this)"/>
      <div style="flex:1;font-size:12px;">
        <div style="font-weight:600;">${p.name}</div>
        <div style="color:var(--muted);">×${i.qty}</div>
      </div>
      <div style="font-size:13px;font-weight:600;">${fmt(p.price * i.qty)}</div>
    </div>`;
  }).join('') + `
    <div class="divider"></div>
    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
      <span style="color:var(--muted);">Subtotal</span><span>${fmt(total)}</span></div>
    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:7px;">
      <span style="color:var(--muted);">Shipping</span>
      <span>${ship === 0 ? '<span style="color:var(--success);">Free</span>' : fmt(ship)}</span></div>
    <div class="divider"></div>
    <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;">
      <span>Total</span><span style="color:var(--p700);">${fmt(total + ship)}</span></div>`;
}

// ===================== PAYMENT SELECTION =====================
function selPay(m) {
  S.pay = m;
  ['card', 'momo', 'bank', 'cod'].forEach(x => {
    const el = $('po-' + x);
    if (el) el.className = 'po' + (x === m ? ' on' : '');
  });
  const pf = $('pay-fields');

  if (m === 'card') {
    pf.innerHTML = `
    <div style="background:var(--p50);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:4px;">
      <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">Card Details</div>
      <div class="fg"><label>Card Number</label>
        <input class="card-field" type="text" placeholder="1234 5678 9012 3456" maxlength="19"
          oninput="fmtCard(this)" autocomplete="cc-number"/></div>
      <div class="g2">
        <div class="fg"><label>Expiry</label>
          <input class="card-field" type="text" placeholder="MM / YY" maxlength="7" autocomplete="cc-exp"/></div>
        <div class="fg"><label>CVV</label>
          <input class="card-field" type="text" placeholder="•••" maxlength="3" autocomplete="cc-csc"/></div>
      </div>
      <div class="fg" style="margin-bottom:0;"><label>Cardholder Name</label>
        <input class="card-field" type="text" placeholder="Jane Mensah" autocomplete="cc-name"/></div>
    </div>
    <div class="pay-secured">🔒 Payments are encrypted and processed securely. Card details are never stored.</div>
    <div style="display:flex;gap:6px;margin-top:8px;align-items:center;">
      <span style="font-size:18px;">💳</span><span style="font-size:18px;">🏦</span>
      <span style="font-size:11px;color:var(--muted);margin-left:4px;">Visa · Mastercard · Verve · GhIPSS accepted</span>
    </div>`;

  } else if (m === 'momo') {
    pf.innerHTML = `
    <div style="background:var(--p50);border:1px solid var(--border);border-radius:10px;padding:14px;">
      <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;">Mobile Money</div>
      <div class="fg"><label>Network Provider</label>
        <select id="momo-net">
          <option value="mtn">MTN MoMo</option>
          <option value="telecel">Telecel Cash</option>
          <option value="airteltigo">AirtelTigo Money</option>
        </select></div>
      <div class="fg" style="margin-bottom:0;"><label>MoMo Phone Number</label>
        <input id="momo-num" type="tel" placeholder="+233 24 000 0000" autocomplete="tel"/></div>
    </div>
    <div class="pay-secured">📱 You will receive an STK push prompt on your phone to authorize payment with your MoMo PIN.</div>`;

  } else if (m === 'bank') {
    pf.innerHTML = `
    <div style="background:var(--p50);border:1px solid var(--border);border-radius:10px;padding:16px;font-size:13px;line-height:1.9;">
      <div style="font-weight:700;color:var(--p800);margin-bottom:8px;">Bank Transfer Details</div>
      <div style="display:grid;gap:5px;">
        <div><span style="color:var(--muted);">Account Name:</span> <strong>Gabriella Style Haven Ltd</strong></div>
        <div><span style="color:var(--muted);">Bank:</span> <strong>GCB Bank Ghana</strong></div>
        <div><span style="color:var(--muted);">Account No:</span> <strong>1234567890</strong></div>
        <div><span style="color:var(--muted);">Branch:</span> <strong>Accra Central</strong></div>
        <div><span style="color:var(--muted);">Reference:</span> <strong>Your Order ID</strong> (given after placing)</div>
      </div>
    </div>`;

  } else {
    pf.innerHTML = `
    <div style="background:var(--p50);border:1px solid var(--border);border-radius:10px;padding:16px;font-size:13px;line-height:1.8;">
      🚚 <strong>Cash on Delivery</strong><br>
      <span style="color:var(--muted);">Pay in cash when your order is delivered. Our team will contact you on the phone number provided to arrange delivery time.</span>
    </div>`;
  }
}

function fmtCard(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 16);
  el.value = v.match(/.{1,4}/g)?.join(' ') || v;
}

function placeOrder() {
  if (!S.cart.length) { toast('Cart is empty.', 'error'); return; }
  if (!$('co-fn').value.trim() || !$('co-em').value.trim() || !$('co-addr').value.trim()) {
    toast('Fill in all shipping fields.', 'error'); return;
  }
  if (S.pay === 'momo') {
    const num = $('momo-num')?.value.trim();
    if (!num) { toast('Enter your MoMo number.', 'error'); return; }
    S.ppNum = num;
    S.ppNet = $('momo-net')?.value || 'mtn';
    startMomo();
    return;
  }
  finalizeOrder();
}

// ===================== MOMO PAYMENT FLOW =====================
const NET_LABEL = { mtn: 'MTN MoMo', telecel: 'Telecel Cash', airteltigo: 'AirtelTigo Money' };

function momoHTML(step) {
  const total = cartTotal(), ship = total > 500 ? 0 : 25;
  const net = NET_LABEL[S.ppNet] || 'Mobile Money';
  const steps = [
    { t: 'Network & Number',  d: `<strong>${net}</strong> — ${S.ppNum}` },
    { t: 'OTP Verification',  d: 'Enter the 6-digit OTP sent via SMS to your number.' },
    { t: 'Authorize Payment', d: 'A payment prompt was sent to your phone. Enter your MoMo PIN to approve.' },
    { t: 'Processing',        d: '<span style="animation:pulse 1.5s infinite;">Verifying with ' + net + '…</span>' },
    { t: 'Payment Confirmed', d: `<span style="color:var(--success);font-weight:700;">✓ ${fmt(total + ship)} received!</span>` }
  ];

  return `<h2 class="modal-h" style="font-size:18px;margin-bottom:12px;">📱 MoMo Payment</h2>
  <div style="background:linear-gradient(135deg,var(--p700),var(--p500));border-radius:10px;padding:12px 14px;
    display:flex;justify-content:space-between;color:#fff;margin-bottom:14px;font-size:13px;">
    <span>${net}</span><strong>${fmt(total + ship)}</strong>
  </div>
  <div class="pp-bar"><div class="pp-fill" style="width:${step * 20}%;"></div></div>
  <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin:5px 0 12px;">
    <span>Step ${step} of 5</span><span>${step * 20}% complete</span>
  </div>
  ${steps.map((s, i) => {
    const n = i + 1, done = step > n, cur = step === n;
    return `<div class="pp-step" style="${n > step ? 'opacity:.3' : ''}">
      <div class="pp-num ${done ? 'done' : !cur ? 'pend' : ''}">${done ? '✓' : n}</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;margin-bottom:2px;">${s.t}</div>
        <div style="font-size:12px;color:var(--muted);line-height:1.5;">${cur || done ? s.d : 'Pending'}</div>
        ${cur && n === 1 ? `<button class="btn btn-pu btn-sm" style="margin-top:9px;width:100%;" onclick="momoNext(2)">Send OTP →</button>` : ''}
        ${cur && n === 2 ? `
          <div class="otp-row" id="otp-row">
            ${[0,1,2,3,4,5].map(x => `<input class="otp-inp" id="oi-${x}" maxlength="1" oninput="otpFwd(this,${x})"/>`).join('')}
          </div>
          <p style="font-size:11px;color:var(--muted);margin-top:5px;">Demo: any 6 digits</p>
          <button class="btn btn-pu btn-sm" style="margin-top:8px;width:100%;" onclick="verOTP()">Verify OTP →</button>` : ''}
        ${cur && n === 3 ? `
          <div class="pin-row" id="pin-row">
            ${[0,1,2,3,4,5].map(() => '<div class="pin-d"></div>').join('')}
          </div>
          <p style="font-size:11px;color:var(--muted);text-align:center;">Waiting for PIN on your phone…</p>
          <button class="btn btn-pu btn-sm" style="margin-top:9px;width:100%;" onclick="simPIN()">Simulate PIN Entry →</button>` : ''}
        ${cur && n === 5 ? `<button class="btn btn-pu btn-sm" style="margin-top:10px;width:100%;"
            onclick="closeM('mod-pay');finalizeOrder();">View Receipt →</button>` : ''}
      </div>
    </div>`;
  }).join('')}`;
}

function startMomo() { S.ppStep = 1; $('mod-pay-body').innerHTML = momoHTML(1); openM('mod-pay'); }
function momoNext(step) { S.ppStep = step; $('mod-pay-body').innerHTML = momoHTML(step); }

function otpFwd(el, idx) {
  if (el.value.length === 1 && idx < 5) {
    const n = $('oi-' + (idx + 1));
    if (n) n.focus();
  }
}

function verOTP() {
  const vals = [0,1,2,3,4,5].map(i => ($('oi-' + i)?.value || ''));
  if (vals.join('').length < 6) { toast('Enter all 6 OTP digits.', 'error'); return; }
  toast('OTP verified ✓', 'success');
  momoNext(3);
}

function simPIN() {
  let i = 0;
  const iv = setInterval(() => {
    const dots = document.querySelectorAll('#pin-row .pin-d');
    if (dots[i]) dots[i].classList.add('filled');
    i++;
    if (i === 6) {
      clearInterval(iv);
      setTimeout(() => momoNext(4), 500);
      setTimeout(() => momoNext(5), 2000);
    }
  }, 250);
}

// ===================== FINALIZE ORDER =====================
function finalizeOrder() {
  const total = cartTotal(), ship = total > 500 ? 0 : 25;
  const oid = 'GSH-' + Date.now().toString().slice(-7);
  const email = $('co-em')?.value.trim() || S.user?.email || '';
  const phone = $('co-ph')?.value.trim() || S.user?.phone || '';
  const name  = [$('co-fn')?.value.trim(), $('co-ln')?.value.trim()].filter(Boolean).join(' ') || S.user?.name || '';
  const addr  = [$('co-addr')?.value, $('co-city')?.value, $('co-region')?.value].filter(Boolean).join(', ');

  const order = {
    id: oid, userId: S.user.id, name, email, phone, addr,
    items: S.cart.map(i => ({ ...i, product: PRODS.find(p => p.id === i.id) })),
    total: total + ship, subtotal: total, ship, pay: S.pay,
    status: 'Confirmed',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  S.cart.forEach(item => {
    const p = PRODS.find(p => p.id === item.id);
    if (p) p.stock = Math.max(0, p.stock - item.qty);
  });

  S.orders.unshift(order);
  S.cart = [];
  renderNav();
  showReceipt(order);
}

function showReceipt(order) {
  const sentTo = [];
  if (order.email) sentTo.push(`📧 ${order.email}`);
  if (order.phone) sentTo.push(`📱 ${order.phone}`);
  $('receipt-sent').innerHTML = sentTo.length
    ? `Receipt sent to: <strong>${sentTo.join(' & ')}</strong>` : '';

  const payLabel = {
    card: 'Credit/Debit Card', momo: 'Mobile Money',
    bank: 'Bank Transfer',     cod:  'Cash on Delivery'
  }[order.pay] || order.pay;

  $('receipt-box').innerHTML = `<div class="receipt">
    <div class="receipt-head">
      <div style="font-family:var(--font-d);font-size:17px;font-weight:700;">✦ Gabriella Style Haven</div>
      <div style="font-size:11px;opacity:.8;margin-top:3px;">${order.date}</div>
      <div style="background:rgba(255,255,255,.2);display:inline-block;padding:3px 12px;
        border-radius:20px;font-size:12px;font-weight:600;margin-top:7px;">${order.id}</div>
    </div>
    <div class="receipt-body">
      ${order.items.map(i => `
        <div class="rrow">
          <span>${i.product.name} ×${i.qty}</span>
          <span style="font-weight:600;">${fmt(i.product.price * i.qty)}</span>
        </div>`).join('')}
      <div class="rrow"><span style="color:var(--muted);">Shipping</span><span>${order.ship === 0 ? 'Free' : fmt(order.ship)}</span></div>
      <div class="rrow"><span style="color:var(--muted);">Payment</span><span class="tag tg-pu">${payLabel}</span></div>
      <div class="rrow"><span style="color:var(--muted);">Deliver to</span>
        <span style="font-size:11px;max-width:170px;text-align:right;">${order.addr}</span></div>
      <div class="rtotal"><span>Total Paid</span><span style="color:var(--p700);">${fmt(order.total)}</span></div>
      <div style="text-align:center;margin-top:13px;font-size:11px;color:var(--muted);">Thank you for shopping with us ✦</div>
    </div>
  </div>`;
  openM('mod-ok');
}

// ===================== ORDERS PAGE =====================
function renderOrders() {
  const list = $('orders-list');
  const mine = S.user?.role === 'admin'
    ? S.orders
    : S.orders.filter(o => o.userId === S.user?.id);

  if (!mine.length) {
    list.innerHTML = `<div class="empty"><div class="empty-ic">📦</div><h3>No orders yet</h3>
      <p>Your purchases will appear here.</p>
      <button class="btn btn-pu" style="margin-top:14px;" onclick="goPage('shop')">Start Shopping</button></div>`;
    return;
  }

  list.innerHTML = mine.map(o => `
    <div style="background:var(--white);border:1px solid var(--border);border-radius:14px;
      overflow:hidden;margin-bottom:14px;animation:fadeUp .3s ease;">
      <div style="padding:13px 17px;display:flex;align-items:center;justify-content:space-between;
        border-bottom:1px solid var(--border);flex-wrap:wrap;gap:7px;">
        <div>
          <div style="font-weight:700;font-size:14px;">${o.id}</div>
          <div style="font-size:11px;color:var(--muted);">${o.date} · ${o.items.reduce((s,i) => s+i.qty,0)} items · ${o.pay.toUpperCase()}</div>
        </div>
        <div style="text-align:right;">
          <span class="tag tg-green">${o.status}</span>
          <div style="font-weight:700;color:var(--p700);margin-top:3px;">${fmt(o.total)}</div>
        </div>
      </div>
      <div style="padding:12px 17px;">
        <div style="font-size:12px;color:var(--muted);margin-bottom:9px;">📍 ${o.addr}</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;">
          ${o.items.map(i => `
            <div style="display:flex;align-items:center;gap:7px;background:var(--p50);
              border-radius:8px;padding:6px 10px;font-size:12px;font-weight:500;">
              <img src="${pImg(i.product.id, i.product.name)}"
                style="width:28px;height:28px;object-fit:cover;border-radius:5px;" onerror="imgErr(this)"/>
              ${i.product.name} ×${i.qty}
            </div>`).join('')}
        </div>
      </div>
    </div>`).join('');
}

// ===================== ADMIN SECTIONS =====================
function aSection(sec) {
  S.adminSec = sec;
  document.querySelectorAll('.asb').forEach(b => b.classList.remove('on'));
  const btn = $('as-' + sec); if (btn) btn.classList.add('on');
  const m = $('admin-main');
  ({ dash: renderDash, prods: renderProds, inv: renderInv,
     orders: renderAdmOrders, cust: renderCust, add: renderAddProd })[sec]?.(m);
}

function renderDash(m) {
  const rev = S.orders.reduce((s, o) => s + o.total, 0);
  m.innerHTML = `<div class="admin-h">Dashboard</div>
  <div class="stats-grid">
    <div class="stat"><div class="stat-l">Revenue</div><div class="stat-v">${fmt(rev)}</div></div>
    <div class="stat"><div class="stat-l">Orders</div><div class="stat-v">${S.orders.length}</div></div>
    <div class="stat"><div class="stat-l">Products</div><div class="stat-v">${PRODS.length}</div></div>
    <div class="stat"><div class="stat-l">Customers</div><div class="stat-v">${S.customers.length}</div></div>
    <div class="stat"><div class="stat-l">Stock Units</div><div class="stat-v">${PRODS.reduce((s,p) => s+p.stock, 0)}</div></div>
    <div class="stat"><div class="stat-l">Out of Stock</div>
      <div class="stat-v" style="color:var(--danger);">${PRODS.filter(p => p.stock === 0).length}</div></div>
  </div>
  <h3 style="font-family:var(--font-d);font-size:17px;font-weight:700;margin-bottom:12px;color:var(--p800);">Recent Orders</h3>
  ${S.orders.length
    ? `<div class="tbl-wrap"><table>
        <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>${S.orders.slice(0,5).map(o => `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.name}</td>
            <td style="color:var(--p700);font-weight:700;">${fmt(o.total)}</td>
            <td>${o.date}</td>
            <td><span class="tag tg-green">${o.status}</span></td>
          </tr>`).join('')}
        </tbody></table></div>`
    : '<p style="color:var(--muted);font-size:13px;">No orders yet.</p>'}`;
}

function renderProds(m) {
  m.innerHTML = `<div class="admin-h">Products</div>
  <div class="tbl-wrap"><table>
    <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
    <tbody>${PRODS.map(p => `
      <tr>
        <td><div style="display:flex;align-items:center;gap:9px;">
          <img src="${pImg(p.id, p.name)}" style="width:38px;height:38px;object-fit:cover;border-radius:7px;" onerror="imgErr(this)"/>
          <strong>${p.name}</strong></div></td>
        <td><span class="tag tg-pu">${p.cat}</span></td>
        <td style="color:var(--p700);font-weight:700;">${fmt(p.price)}</td>
        <td style="color:${stockC(p.stock)};font-weight:600;">${p.stock}</td>
        <td><div style="display:flex;gap:5px;">
          <button class="btn btn-ghost btn-sm" onclick="editProd(${p.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="delProd(${p.id})">Del</button>
        </div></td>
      </tr>`).join('')}
    </tbody></table></div>`;
}

function renderInv(m) {
  m.innerHTML = `<div class="admin-h">Inventory</div>
  <div class="tbl-wrap"><table>
    <thead><tr><th>Product</th><th>Level</th><th>Units</th><th>Status</th><th>Restock</th></tr></thead>
    <tbody>${PRODS.map(p => {
      const pct = Math.min(100, (p.stock / 50) * 100);
      const col = p.stock === 0 ? '#c0392b' : p.stock < 10 ? '#d4850a' : 'var(--success)';
      return `<tr>
        <td><div style="display:flex;align-items:center;gap:7px;">
          <img src="${pImg(p.id, p.name)}" style="width:32px;height:32px;object-fit:cover;border-radius:5px;" onerror="imgErr(this)"/>
          ${p.name}</div></td>
        <td style="min-width:110px;">
          <div class="inv-bar"><div class="inv-fill" style="width:${pct}%;background:${col};"></div></div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px;">${pct.toFixed(0)}%</div></td>
        <td style="font-weight:700;color:${col};">${p.stock}</td>
        <td><span class="tag ${p.stock===0?'tg-red':p.stock<10?'tg-orange':'tg-green'}">
          ${p.stock===0?'Out of Stock':p.stock<10?'Low':'In Stock'}</span></td>
        <td><button class="btn btn-ghost btn-sm" onclick="restockP(${p.id})">+20</button></td>
      </tr>`;
    }).join('')}
    </tbody></table></div>`;
}

function restockP(id) {
  const p = PRODS.find(p => p.id === id);
  if (p) { p.stock += 20; toast(`${p.name} restocked → ${p.stock}`, 'success'); renderInv($('admin-main')); }
}

function delProd(id) {
  const i = PRODS.findIndex(p => p.id === id);
  if (i > -1) { PRODS.splice(i, 1); delete IMG_STORE[id]; }
  toast('Product deleted.', 'info');
  renderProds($('admin-main'));
}

function editProd(id) {
  const p = PRODS.find(p => p.id === id);
  $('mod-edit-body').innerHTML = `<h2 class="modal-h">Edit Product</h2>
    <div class="fg"><label>Name</label><input id="ep-n" value="${p.name}"/></div>
    <div class="g2">
      <div class="fg"><label>Price (GH₵)</label><input id="ep-p" type="number" value="${p.price}"/></div>
      <div class="fg"><label>Stock</label><input id="ep-s" type="number" value="${p.stock}"/></div>
    </div>
    <div class="fg"><label>Category</label>
      <select id="ep-c">${CATS.filter(c => c !== 'All').map(c =>
        `<option ${c === p.cat ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
    <div class="fg"><label>Description</label><textarea id="ep-d">${p.desc}</textarea></div>
    <div class="fg">
      <label>Product Image — Upload from Device</label>
      <div class="up-zone" onclick="$('ep-img-i').click()">
        <input type="file" id="ep-img-i" accept="image/*" onchange="handleEditImg(${id},this)"/>
        📁 Click to upload image from device
      </div>
      ${IMG_STORE[id] ? `<img src="${IMG_STORE[id]}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;margin-top:8px;" alt=""/>` : ''}
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
      <input type="checkbox" id="ep-f" ${p.featured ? 'checked' : ''} style="width:auto;cursor:pointer;accent-color:var(--p600);"/>
      <label for="ep-f" style="margin:0;font-size:13px;cursor:pointer;">Featured product</label>
    </div>
    <button class="btn btn-pu" style="width:100%;" onclick="saveEdit(${id})">Save Changes</button>`;
  openM('mod-edit');
}

function handleEditImg(id, input) {
  if (!input.files[0]) return;
  if (input.files[0].size > 5 * 1024 * 1024) { toast('Max 5MB.', 'error'); return; }
  const r = new FileReader();
  r.onload = e => { IMG_STORE[id] = e.target.result; toast('Image updated ✓', 'success'); };
  r.readAsDataURL(input.files[0]);
}

function saveEdit(id) {
  const p = PRODS.find(p => p.id === id);
  p.name    = $('ep-n').value;
  p.price   = parseFloat($('ep-p').value) || p.price;
  p.stock   = parseInt($('ep-s').value) || 0;
  p.cat     = $('ep-c').value;
  p.desc    = $('ep-d').value;
  p.featured= $('ep-f').checked;
  closeM('mod-edit');
  toast('Product updated ✓', 'success');
  aSection('prods');
}

function renderAdmOrders(m) {
  m.innerHTML = `<div class="admin-h">All Orders</div>
  ${!S.orders.length
    ? '<p style="color:var(--muted);">No orders yet.</p>'
    : `<div class="tbl-wrap"><table>
        <thead><tr><th>Order ID</th><th>Customer</th><th>Contact</th><th>Total</th><th>Pay</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>${S.orders.map(o => `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.name}</td>
            <td style="font-size:11px;color:var(--muted);">${o.email}<br>${o.phone}</td>
            <td style="color:var(--p700);font-weight:700;">${fmt(o.total)}</td>
            <td><span class="tag tg-pu">${o.pay.toUpperCase()}</span></td>
            <td>${o.date}</td>
            <td><select onchange="updOrd('${o.id}',this.value)"
                style="font-size:12px;padding:4px 7px;border:1px solid var(--border);border-radius:6px;background:var(--white);">
              ${['Confirmed','Processing','Shipped','Delivered','Cancelled']
                .map(s => `<option ${o.status===s?'selected':''}>${s}</option>`).join('')}
            </select></td>
          </tr>`).join('')}
        </tbody></table></div>`}`;
}

function updOrd(id, st) {
  const o = S.orders.find(o => o.id === id);
  if (o) { o.status = st; toast(`Order ${id} → ${st}`, 'success'); }
}

function renderCust(m) {
  m.innerHTML = `<div class="admin-h">Customers</div>
  <div class="tbl-wrap"><table>
    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Orders</th></tr></thead>
    <tbody>
      ${S.customers.map(u => `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td style="font-size:12px;color:var(--muted);">${u.email}</td>
          <td style="font-size:12px;color:var(--muted);">${u.phone || '—'}</td>
          <td style="font-size:12px;">${u.joined}</td>
          <td>${S.orders.filter(o => o.userId === u.id).length}</td>
        </tr>`).join('')}
      ${!S.customers.length
        ? '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px;">No customers registered yet.</td></tr>'
        : ''}
    </tbody></table></div>`;
}

function renderAddProd(m) {
  m.innerHTML = `<div class="admin-h">Add Product</div>
  <div style="max-width:520px;">
    <div class="g2">
      <div class="fg"><label>Name *</label><input id="ap-n" placeholder="e.g. Silk Blouse"/></div>
      <div class="fg"><label>Category *</label>
        <select id="ap-c">${CATS.filter(c => c !== 'All').map(c => `<option>${c}</option>`).join('')}</select></div>
    </div>
    <div class="g2">
      <div class="fg"><label>Price (GH₵) *</label><input id="ap-p" type="number" placeholder="150"/></div>
      <div class="fg"><label>Stock *</label><input id="ap-s" type="number" placeholder="20"/></div>
    </div>
    <div class="fg"><label>Description</label><textarea id="ap-d" placeholder="Describe the product…"></textarea></div>
    <div class="g2">
      <div class="fg"><label>Sizes (comma-separated)</label><input id="ap-sz" placeholder="XS, S, M, L"/></div>
      <div class="fg"><label>Colors</label><input id="ap-cl" placeholder="Black, White"/></div>
    </div>
    <div class="fg">
      <label>Product Image — Upload from Device Storage</label>
      <div class="up-zone" id="ap-zone"
        onclick="$('ap-img-i').click()"
        ondragover="event.preventDefault();this.classList.add('drag')"
        ondragleave="this.classList.remove('drag')"
        ondrop="handleDrop(event)">
        <input type="file" id="ap-img-i" accept="image/*" onchange="handleNewImg(this)"/>
        <div style="font-size:28px;margin-bottom:7px;opacity:.5;">🖼️</div>
        <div style="font-size:13px;font-weight:600;color:var(--p600);">Click to upload or drag &amp; drop</div>
        <div style="font-size:11px;color:var(--muted);margin-top:3px;">JPG, PNG, WebP · Max 5MB</div>
      </div>
      <div class="up-preview" id="ap-preview"></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
      <input type="checkbox" id="ap-f" style="width:auto;accent-color:var(--p600);cursor:pointer;"/>
      <label for="ap-f" style="margin:0;font-size:13px;cursor:pointer;">Mark as featured</label>
    </div>
    <button class="btn btn-pu btn-lg" style="width:100%;" onclick="saveNewProd()">Add Product →</button>
  </div>`;
  window._newImg = null;
}

let _newImg = null;

function handleNewImg(input) {
  if (!input.files[0]) return;
  if (input.files[0].size > 5 * 1024 * 1024) { toast('Max 5MB.', 'error'); return; }
  const r = new FileReader();
  r.onload = e => {
    _newImg = e.target.result;
    $('ap-preview').innerHTML = `
      <div class="up-thumb-wrap">
        <img class="up-thumb" src="${e.target.result}" alt=""/>
        <button class="up-del" onclick="_newImg=null;$('ap-preview').innerHTML=''">✕</button>
      </div>`;
    toast('Image ready ✓', 'success');
  };
  r.readAsDataURL(input.files[0]);
}

function handleDrop(e) {
  e.preventDefault();
  $('ap-zone').classList.remove('drag');
  const f = e.dataTransfer.files[0];
  if (!f || !f.type.startsWith('image/')) { toast('Drop an image file.', 'error'); return; }
  handleNewImg({ files: [f] });
}

function saveNewProd() {
  const name  = $('ap-n').value.trim();
  const price = parseFloat($('ap-p').value);
  const stock = parseInt($('ap-s').value);
  if (!name || isNaN(price) || isNaN(stock)) { toast('Fill in all required fields.', 'error'); return; }
  const newId = Date.now();
  const p = {
    id: newId, name, cat: $('ap-c').value, price, stock,
    desc:   $('ap-d').value  || 'A beautiful addition to any wardrobe.',
    sizes:  $('ap-sz').value.split(',').map(s => s.trim()).filter(Boolean) || ['S','M','L'],
    colors: $('ap-cl').value.split(',').map(s => s.trim()).filter(Boolean) || ['Multi'],
    featured: $('ap-f').checked
  };
  if (_newImg) IMG_STORE[newId] = _newImg;
  PRODS.push(p);
  _newImg = null;
  toast(`"${name}" added ✓`, 'success');
  aSection('prods');
}

// ===================== INIT =====================
selPay('card');
