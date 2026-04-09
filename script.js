/* ========================================
   FERRETERÍA PAULINO ALBA
   JavaScript - Interactividad y Funcionalidades
   ======================================== */

console.log('🔧 Ferretería Paulino Alba - Cargando interactividad...');

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('✓ Aplicación inicializada');
    initializeSearchBar();
    initializeCart();
    initializeCarousel();
    initializeProductButtons();
    initializeNavigation();
    initializeScrollEffects();
}

// ==================== VARIABLES GLOBALES PARA BÚSQUEDA ====================
let suggestionIndex = -1;
let suggestionItems = [];

// ==================== BARRA DE BÚSQUEDA ====================
function initializeSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.getElementById('mainSearchInput') || searchBar.querySelector('input');
    const searchBtn = document.getElementById('mainSearchBtn') || document.querySelector('.btn-search');
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput || !resultsContainer) {
        console.error('❌ Search elements not found');
        return;
    }

    // Accessibility: ensure ARIA roles and live region
    searchInput.setAttribute('role', 'combobox');
    searchInput.setAttribute('aria-autocomplete', 'list');
    searchInput.setAttribute('aria-controls', 'searchResults');
    searchInput.setAttribute('aria-expanded', 'false');
    resultsContainer.setAttribute('role', 'listbox');

    // Create small live region for screen readers
    let searchLive = document.getElementById('searchLiveRegion');
    if (!searchLive) {
        searchLive = document.createElement('div');
        searchLive.id = 'searchLiveRegion';
        searchLive.setAttribute('aria-live', 'polite');
        searchLive.setAttribute('aria-atomic', 'true');
        Object.assign(searchLive.style, {
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: '0',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            border: '0'
        });
        document.body.appendChild(searchLive);
    }

    // Debounce helper
    function debounce(fn, wait) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // Focus styling
    searchInput.addEventListener('focus', () => {
        searchBar.style.borderColor = '#1e5ba8';
        searchBar.style.boxShadow = '0 0 0 3px rgba(30, 91, 168, 0.1)';
        if (searchInput.value.trim()) openSearchResults();
    });

    searchInput.addEventListener('blur', () => {
        searchBar.style.borderColor = '#e0e0e0';
        searchBar.style.boxShadow = 'none';
        setTimeout(closeSearchResults, 150);
    });

    // Input -> live suggestions (debounced)
    const debouncedUpdate = debounce((val) => {
        const q = val.trim();
        if (!q) {
            clearSearchResults();
            return;
        }
        updateSearchSuggestions(q);
    }, 180);

    searchInput.addEventListener('input', (e) => {
        console.log('Input event:', e.target.value);
        debouncedUpdate(e.target.value);
    });

    // Keyboard navigation for suggestions
    searchInput.addEventListener('keydown', (e) => {
        const visible = resultsContainer && resultsContainer.style.display !== 'none';
        if (!visible) {
            if (e.key === 'Enter') {
                performSearch();
                closeSearchResults();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            suggestionIndex = Math.min(suggestionIndex + 1, suggestionItems.length - 1);
            updateSuggestionActive();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            suggestionIndex = Math.max(suggestionIndex - 1, 0);
            updateSuggestionActive();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (suggestionIndex >= 0 && suggestionIndex < suggestionItems.length) {
                suggestionItems[suggestionIndex].click();
            } else {
                performSearch();
                closeSearchResults();
            }
        } else if (e.key === 'Escape') {
            closeSearchResults();
        }
    });

    // Button click -> perform search
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
        closeSearchResults();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target)) closeSearchResults();
    });

    console.log('✓ Barra de búsqueda inicializada');
}

function openSearchResults() {
    const container = document.getElementById('searchResults');
    const inputEl = document.getElementById('mainSearchInput');
    if (container) {
        container.style.display = 'block';
        container.setAttribute('aria-hidden', 'false');
    }
    if (inputEl) {
        inputEl.setAttribute('aria-expanded', 'true');
    }
}

function closeSearchResults() {
    const container = document.getElementById('searchResults');
    const inputEl = document.getElementById('mainSearchInput');
    if (container) {
        container.style.display = 'none';
        container.setAttribute('aria-hidden', 'true');
    }
    if (inputEl) {
        inputEl.setAttribute('aria-expanded', 'false');
        inputEl.removeAttribute('aria-activedescendant');
    }
    suggestionIndex = -1;
    suggestionItems = [];
    const live = document.getElementById('searchLiveRegion');
    if (live) live.textContent = '';
}

function performSearch() {
    const inputEl = document.getElementById('mainSearchInput') || document.querySelector('.search-bar input');
    const query = inputEl ? inputEl.value.trim().toLowerCase() : '';

    const productEls = document.querySelectorAll('.product-card, .catalogo-card');

    // Si no hay término, mostrar notificación
    if (!query) {
        showNotification('Por favor, ingresa un término de búsqueda', 'warning');
        return;
    }

    // Buscar el primer producto que coincida
    let found = false;
    productEls.forEach(el => {
        const nameEl = el.querySelector('h4') || el.querySelector('.catalogo-product-name');
        const brandEl = el.querySelector('.catalogo-brand');
        const textParts = [];
        if (nameEl) textParts.push(nameEl.textContent.toLowerCase());
        if (brandEl) textParts.push(brandEl.textContent.toLowerCase());
        textParts.push(el.textContent.toLowerCase());

        const combined = textParts.join(' ');
        if (combined.includes(query) && !found) {
            // Navegar al primer resultado
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('search-flash');
            setTimeout(() => el.classList.remove('search-flash'), 1400);
            found = true;
            showNotification(`✓ Encontrado: ${nameEl ? nameEl.textContent : 'Producto'}`, 'success');
            clearSearchResults();
        }
    });

    if (!found) {
        showNotification(`No se encontraron resultados para "${query}"`, 'warning');
    }
}

// ==================== BÚSQUEDA - SUGERENCIAS EN TIEMPO REAL ====================
function escapeHtml(str) {
    return String(str).replace(/[&<>"'`]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[s]);
}

function clearSearchResults() {
    const container = document.getElementById('searchResults');
    if (!container) return;
    container.innerHTML = '';
    container.style.display = 'none';
    container.setAttribute('aria-hidden', 'true');
    const inputEl = document.getElementById('mainSearchInput');
    if (inputEl) {
        inputEl.setAttribute('aria-expanded', 'false');
        inputEl.removeAttribute('aria-activedescendant');
    }
    const live = document.getElementById('searchLiveRegion');
    if (live) live.textContent = '';
}

function updateSearchSuggestions(query) {
    console.log('🔍 updateSearchSuggestions() called with:', query);
    const q = query.trim().toLowerCase();
    const container = document.getElementById('searchResults');
    
    if (!container) {
        console.error('❌ searchResults container not found!');
        return;
    }
    
    container.innerHTML = '';
    
    if (!q) {
        container.style.display = 'none';
        container.setAttribute('aria-hidden', 'true');
        return;
    }

    const productEls = Array.from(document.querySelectorAll('.product-card, .catalogo-card'));
    console.log('🛍️ Found total products:', productEls.length);
    const results = [];

    productEls.forEach(el => {
        const nameEl = el.querySelector('h4') || el.querySelector('.catalogo-product-name');
        const brandEl = el.querySelector('.catalogo-brand');
        const priceEl = el.querySelector('.product-price strong') || el.querySelector('.catalogo-price');
        const name = nameEl ? nameEl.textContent.trim() : '';
        const brand = brandEl ? brandEl.textContent.trim() : '';
        const price = priceEl ? priceEl.textContent.trim() : '';
        const hay = (name + ' ' + brand + ' ' + el.textContent).toLowerCase();
        
        if (hay.includes(q)) {
            results.push({ el, name, brand, price });
        }
    });

    console.log('✅ Matching results:', results.length);

    if (results.length === 0) {
        container.innerHTML = '<div class="search-none">No se encontraron productos</div>';
        container.style.display = 'block';
        container.setAttribute('aria-hidden', 'false');
        const live0 = document.getElementById('searchLiveRegion');
        if (live0) live0.textContent = '0 resultados';
        const inputEl0 = document.getElementById('mainSearchInput');
        if (inputEl0) inputEl0.setAttribute('aria-expanded', 'true');
        return;
    }

    // Limitar resultados
    suggestionIndex = -1;
    results.slice(0, 8).forEach((r, idx) => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.setAttribute('data-idx', idx);
        item.setAttribute('role', 'option');
        item.id = `searchResult-${idx}`;
        
        const highlightedName = escapeHtml(r.name).replace(
            new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 
            match => `<span class="search-highlight">${escapeHtml(match)}</span>`
        );
        
        item.innerHTML = `
            <div class="search-result-left">
                <strong>${highlightedName}</strong>
                <div class="search-result-brand">${escapeHtml(r.brand)}</div>
            </div>
            <div class="search-result-right">${escapeHtml(r.price || '')}</div>
        `;
        
        item.addEventListener('click', () => {
            r.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            r.el.classList.add('search-flash');
            setTimeout(() => r.el.classList.remove('search-flash'), 1400);
            clearSearchResults();
            const inputEl = document.getElementById('mainSearchInput');
            if (inputEl) inputEl.value = r.name;
        });
        
        item.addEventListener('mouseenter', () => {
            suggestionIndex = idx;
            updateSuggestionActive();
        });
        
        container.appendChild(item);
    });

    // Cache items para navegación por teclado
    suggestionItems = Array.from(container.querySelectorAll('.search-result-item'));
    
    const live = document.getElementById('searchLiveRegion');
    if (live) live.textContent = `${results.length} resultado(s)`;
    
    const inputEl1 = document.getElementById('mainSearchInput');
    if (inputEl1) inputEl1.setAttribute('aria-expanded', 'true');

    container.style.display = 'block';
    container.setAttribute('aria-hidden', 'false');
}

function updateSuggestionActive() {
    const container = document.getElementById('searchResults');
    if (!container) return;
    suggestionItems.forEach((it, i) => {
        if (i === suggestionIndex) {
            it.classList.add('active');
            it.scrollIntoView({ block: 'nearest' });
        } else {
            it.classList.remove('active');
        }
    });
}

// ==================== CARRITO ====================
let cartCount = 0;
let cartItems = [];

function initializeCart() {
    const cartBadge = document.querySelector('.badge-cart');
    cartBadge.textContent = cartCount;

    // Crear contenedor para dropdown dentro de header-icons
    const headerIcons = document.querySelector('.header-icons');
    if (headerIcons && !document.querySelector('.cart-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'cart-dropdown';
        dropdown.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
        headerIcons.appendChild(dropdown);
    }

    // Toggle cart dropdown al hacer click en el icono
    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartDropdown();
        });
    }

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.cart-dropdown');
        const cartToggleEl = document.getElementById('cartToggle');
        if (!dropdown || !cartToggleEl) return;

        if (!dropdown.contains(e.target) && !cartToggleEl.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    console.log('✓ Carrito inicializado');
}

function addToCart(productName, price, imageSrc, quantity = 1) {
    // Buscar si el producto ya existe en el carrito
    const existingItem = cartItems.find(item => item.name === productName && item.price === price);
    
    if (existingItem) {
        // Si existe, aumentar la cantidad
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
    } else {
        // Si no existe, agregarlo nuevo
        cartItems.push({ 
            name: productName, 
            price: price, 
            image: imageSrc || '',
            quantity: quantity
        });
    }
    
    // Actualizar cartCount (total de unidades)
    cartCount += quantity;
    updateCartBadge();
    renderCartDropdown();
    showNotification(`✓ ${productName} x${quantity} agregado al carrito (${price})`, 'success');
    console.log('Producto agregado al carrito:', productName, 'Cantidad:', quantity);
}

function updateCartBadge() {
    const badge = document.querySelector('.badge-cart');
    if (!badge) return;
    badge.textContent = cartCount;
    badge.style.animation = 'pulse 0.5s ease-out';
    setTimeout(() => {
        badge.style.animation = '';
    }, 500);
}

function toggleCartDropdown() {
    const dropdown = document.querySelector('.cart-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('show');
}

function renderCartDropdown() {
    const dropdown = document.querySelector('.cart-dropdown');
    if (!dropdown) return;

    if (cartItems.length === 0) {
        dropdown.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
        return;
    }

    dropdown.innerHTML = '';
    cartItems.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        const qty = item.quantity || 1;
        itemEl.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/56'}" alt="${item.name}">
            <div class="cart-item-info">
                <h5>${item.name} <span class="cart-qty">x${qty}</span></h5>
                <p>${item.price}</p>
            </div>
            <div class="cart-actions">
                <button class="btn btn-sm btn-outline-danger cart-remove" data-idx="${idx}"><i class="fas fa-trash"></i></button>
            </div>
        `;

        dropdown.appendChild(itemEl);
    });

    const footer = document.createElement('div');
    footer.className = 'p-2';
    footer.innerHTML = `<div class="d-flex justify-content-between align-items-center"><strong>Total:</strong><span>${calculateTotal()}</span></div><div class="mt-2 text-end"><button class="btn btn-primary btn-sm btn-checkout">Ir al Pago</button></div>`;
    dropdown.appendChild(footer);

    // Attach remove handlers
    dropdown.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-idx'), 10);
            removeFromCart(idx);
        });
    });
}

function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        const item = cartItems[index];
        const qty = item.quantity || 1;
        cartCount -= qty;  // Restar la cantidad del producto removido
        cartItems.splice(index, 1);
        updateCartBadge();
        renderCartDropdown();
    }
}

function calculateTotal() {
    // Extract numeric values from price strings like "$89.99" or "RD$ 500"
    let total = 0;
    cartItems.forEach(item => {
        const num = item.price.replace(/[^\d.,]/g, '').replace(',', '.');
        const val = parseFloat(num) || 0;
        total += val;
    });
    return `$${total.toFixed(2)}`;
}

// ==================== CARRUSEL ====================
function initializeCarousel() {
    const carousel = document.querySelector('#carouselHero');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            keyboard: true
        });
        console.log('✓ Carrusel inicializado');
    }
}

// ==================== BOTONES DE PRODUCTOS ====================
let currentProductData = {
    name: '',
    price: '',
    image: ''
};

function initializeProductButtons() {
    // Botones existentes "Añadir al Carrito"
    const productBtns = document.querySelectorAll('.product-card .btn');
    productBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const card = btn.closest('.product-card');
            const productName = card.querySelector('h4').textContent;
            const productPrice = card.querySelector('.product-price strong').textContent;
            const img = card.querySelector('.product-image img') ? card.querySelector('.product-image img').src : '';

            addToCart(productName, productPrice, img);
        });
    });

    // Añadir pequeño botón de carrito en esquina inferior derecha de las tarjetas de productos
    document.querySelectorAll('.product-card, .catalogo-card').forEach(card => {
        // evitar duplicados
        if (card.querySelector('.product-cart-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'product-cart-btn';
        btn.title = 'Agregar al carrito';
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i>';

        // Determinar datos según estructura
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            let productName = '';
            let productPrice = '';
            let img = '';

            if (card.classList.contains('product-card')) {
                productName = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Producto';
                const priceEl = card.querySelector('.product-price strong');
                productPrice = priceEl ? priceEl.textContent : '';
                img = card.querySelector('.product-image img') ? card.querySelector('.product-image img').src : '';
            } else if (card.classList.contains('catalogo-card')) {
                productName = card.querySelector('.catalogo-product-name') ? card.querySelector('.catalogo-product-name').textContent : 'Producto';
                const priceEl = card.querySelector('.catalogo-price');
                productPrice = priceEl ? priceEl.textContent : '';
                img = card.querySelector('.catalogo-image img') ? card.querySelector('.catalogo-image img').src : '';
            }

            // Mostrar modal en lugar de agregar directo
            showQuantityModal(productName, productPrice, img);
        });

        card.appendChild(btn);
    });

    // Inicializar modal de cantidad
    initializeQuantityModal();

    console.log('✓ Botones de productos inicializados');
}

// ==================== NAVEGACIÓN ====================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si es una ancla interna
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Remover clase active de todos los enlaces
                navLinks.forEach(l => l.classList.remove('active'));
                // Añadir clase active al enlace actual
                link.classList.add('active');
                
                // Smooth scroll a la sección
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar-main').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Click en logo para volver al inicio
    const logoContainer = document.querySelector('.logo-container');
    logoContainer.style.cursor = 'pointer';
    logoContainer.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('✓ Navegación inicializada');
}

// ==================== EFECTOS DE SCROLL ====================
function initializeScrollEffects() {
    // Detectar scroll para activar header sticky
    let lastScrollTop = 0;
    const mainNav = document.querySelector('.navbar-main');

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 100) {
            mainNav.style.boxShadow = '0 4px 12px rgba(30, 91, 168, 0.2)';
        } else {
            mainNav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }

        // Actualizar link activo en nav según scroll
        updateActiveNavLink(currentScroll);

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    console.log('✓ Efectos de scroll inicializados');
}

/**
 * Actualiza el link activo en la navegación según la sección visible
 */
function updateActiveNavLink(scrollPosition) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('[id^="cat-"]');
    const navHeight = document.querySelector('.navbar-main').offsetHeight;

    let currentSection = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==================== NOTIFICACIONES ====================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Estilos de notificación
    const styles = {
        notification: `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            background-color: white;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.4s ease-out;
            z-index: 9999;
            border-left: 4px solid;
        `,
        'notification-success': `
            border-left-color: #28a745;
        `,
        'notification-error': `
            border-left-color: #c41e3a;
        `,
        'notification-warning': `
            border-left-color: #f4c430;
        `,
        'notification-info': `
            border-left-color: #1e5ba8;
        `,
        content: `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.25rem;
            gap: 1rem;
            color: #333;
            font-weight: 500;
        `,
        close: `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            padding: 0;
            transition: color 0.3s;
        `
    };

    // Aplicar estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        animation: 'slideInRight 0.4s ease-out',
        zIndex: '9999',
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid'
    });

    // Establecer color según tipo
    const colors = {
        'success': '#28a745',
        'error': '#c41e3a',
        'warning': '#f4c430',
        'info': '#1e5ba8'
    };

    notification.style.borderLeftColor = colors[type] || colors['info'];

    // Estilos para contenido
    const contentDiv = notification.querySelector('.notification-content');
    Object.assign(contentDiv.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.25rem',
        gap: '1rem',
        color: '#333',
        fontWeight: '500'
    });

    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#999',
        padding: '0',
        transition: 'color 0.3s'
    });

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.color = '#333';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.color = '#999';
    });

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    });

    // Añadir a la página
    document.body.appendChild(notification);

    // Remover automáticamente después de 4 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.4s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }
    }, 4000);
}

// ==================== INTERACTIVIDAD DE CATEGORÍAS ====================
document.querySelectorAll('.categoria-card').forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        showNotification(`Explorando categoría: ${categoryName}`, 'info');
        console.log('Categoría seleccionada:', categoryName);
    });
});

// ==================== BOTONES DE INFORMACIÓN ====================
document.querySelectorAll('.btn-primary, .btn-yellow, .btn-light').forEach(btn => {
    if (!btn.classList.contains('btn-search') && !btn.closest('.product-card')) {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            if (text === 'Ver Ofertas' || text === 'Ver Promociones') {
                showNotification('Redirigiendo a ofertas especiales...', 'info');
            } else if (text === 'Ver Todos los Productos') {
                showNotification('Cargando catálogo completo...', 'info');
            } else if (text.includes('Explorar') || text.includes('Descubrir')) {
                showNotification('Cargando contenido...', 'info');
            }
        });
    }
});

// ==================== ENLACES DE FOOTER ====================
document.querySelectorAll('.footer-links a, .social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            showNotification('Sección en desarrollo...', 'info');
        }
    });
});

// ==================== ESTILOS CSS DINÁMICOS ====================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    .badge-cart {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
`;

document.head.appendChild(styleSheet);

// ==================== MODAL DE CANTIDAD ====================
function initializeQuantityModal() {
    const modal = document.getElementById('quantityModal');
    const closeBtn = document.getElementById('closeQuantityModal');
    const qtyInput = document.getElementById('qtyInput');
    const qtyDecrement = document.getElementById('qtyDecrement');
    const qtyIncrement = document.getElementById('qtyIncrement');
    const confirmBtn = document.getElementById('confirmAddCart');

    // Cerrar modal
    closeBtn.addEventListener('click', closeQuantityModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeQuantityModal();
    });

    // Controles de cantidad
    qtyDecrement.addEventListener('click', () => {
        const val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
    });

    qtyIncrement.addEventListener('click', () => {
        const val = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = val + 1;
    });

    qtyInput.addEventListener('change', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < 1) val = 1;
        qtyInput.value = val;
    });

    // Confirmar y agregar al carrito
    confirmBtn.addEventListener('click', () => {
        const quantity = parseInt(qtyInput.value, 10) || 1;
        addToCart(currentProductData.name, currentProductData.price, currentProductData.image, quantity);
        closeQuantityModal();
    });
}

function showQuantityModal(productName, productPrice, imageSrc) {
    currentProductData = {
        name: productName,
        price: productPrice,
        image: imageSrc
    };

    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductPrice').textContent = productPrice;
    document.getElementById('qtyInput').value = '1';

    const modal = document.getElementById('quantityModal');
    modal.classList.add('show');
}

function closeQuantityModal() {
    const modal = document.getElementById('quantityModal');
    modal.classList.remove('show');
}

// ==================== LOG DE INICIALIZACIÓN ====================
console.log('🎉 Ferretería Paulino Alba - Lista para usar');
console.log('📊 Versión: 1.0.0');
console.log('🛠️ Características: Búsqueda, Carrito, Notificaciones, Scroll Smooth, Modal de Cantidad');
