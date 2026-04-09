<!-- DOCUMENTACIÓN TÉCNICA - FERRETERÍA PAULINO ALBA -->

# 🔧 DOCUMENTACIÓN TÉCNICA - CATÁLOGO

## Para el Equipo de Desarrollo

---

## 📚 TABLA DE CONTENIDOS

1. [Estructura de Archivos](#estructura)
2. [Cómo Funciona la Navegación](#navegación)
3. [Clases CSS Disponibles](#clases-css)
4. [Variables CSS](#variables-css)
5. [Breakpoints Responsivos](#breakpoints)
6. [Funciones JavaScript](#javascript)
7. [Integración con Backend](#backend)
8. [Mejoras Futuras](#futuras)

---

## 📁 Estructura de Archivos {#estructura}

```
Ferreteria Paulino Alba/
│
├── index.html                    # HTML principal (1236 líneas)
│   ├── Top Header Bar           # Información de contacto
│   ├── Main Header              # Logo y búsqueda
│   ├── Navigation Bar           # Menú con anclas
│   ├── Hero Section             # Carousel
│   ├── Featured Categories      # Categorías destacadas
│   ├── Featured Products        # Productos destacados
│   ├── Catalog Sections (9x)    # Nuestro nuevo catálogo
│   │   ├── Construcción
│   │   ├── Plomería
│   │   ├── Electricidad
│   │   ├── Herramientas
│   │   ├── Pinturas
│   │   ├── Iluminación
│   │   ├── Seguridad
│   │   ├── Sanitarios
│   │   └── Ofertas
│   ├── Info Section             # Beneficios
│   └── Footer                   # Información y enlaces
│
├── assets/
│   ├── style.css               # CSS integrado (~950 líneas)
│   │   ├── Variables :root
│   │   ├── Estilos generales
│   │   ├── Header y Nav
│   │   ├── Secciones (nuevas)
│   │   └── Responsive queries
│   │
│   └── script.js               # JavaScript (~450 líneas)
│       ├── Inicialización
│       ├── Búsqueda
│       ├── Carrito
│       ├── Navegación (mejorada)
│       ├── Efectos scroll
│       ├── Notificaciones
│       └── Listeners de eventos
│
├── GUIA_CATALOGO.md            # Guía de uso
├── EJEMPLOS_PERSONALIZACION.md # Ejemplos prácticos
├── CATALOGO_RESUMEN.txt        # Resumen visual
└── README.md                   # Documentación original

```

---

## 🔗 Cómo Funciona la Navegación {#navegación}

### ANTES (Sin funcionalidad):
```html
<li><a href="#" class="nav-link">Construcción</a></li>
```

### AHORA (Con anclas):
```html
<li><a href="#cat-construccion" class="nav-link active">Construcción</a></li>
```

### Flujo de Funcionamiento:

```
Usuario hace clic en "Construcción"
         ↓
initializeNavigation() detecta el click
         ↓
Verifica que href comience con "#"
         ↓
Extrae el ID: "cat-construccion"
         ↓
Busca elemento con ese ID en el DOM
         ↓
Calcula posición (con offset del navbar)
         ↓
window.scrollTo() con behavior: 'smooth'
         ↓
updateActiveNavLink() actualiza indicador
```

### Código de Navegación:

```javascript
// Detecta clicks en links de navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Si es una ancla (#cat-...)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // Activa visualmente el link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll suave a la sección
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('.navbar-main').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
```

---

## 🎨 Clases CSS Disponibles {#clases-css}

### Contenedores

```css
.catalogo-section          /* Sección completa (padding, bg, border) */
.catalogo-header           /* Título y descripción de categoría */
.catalogo-grid             /* Grid container (CSS Grid 5 columnas) */
```

### Tarjetas

```css
.catalogo-card             /* Tarjeta individual (flex column) */
.catalogo-card:hover       /* Estados hover */
.catalogo-image            /* Contenedor de imagen (position: relative) */
.catalogo-image img        /* Imagen con object-fit */
.catalogo-info             /* Contenedor de información */
```

### Tipografía

```css
.catalogo-title            /* Título de categoría (2rem, #1e5ba8) */
.catalogo-subtitle         /* Descripción (1rem, #666666) */
.catalogo-product-name     /* Nombre del producto (95%, weight 700) */
.catalogo-brand            /* Marca (90%, #1e5ba8) */
.catalogo-price            /* Precio (125%, weight 800) */
```

### Información

```css
.catalogo-code-ref         /* Código y referencia (pequeño, gris) */
.catalogo-old-price        /* Precio original tachado */
.badge-oferta              /* Badge de descuento (#c41e3a) */
```

---

## 📊 Variables CSS {#variables-css}

```css
:root {
    /* COLORES */
    --color-primary: #1e5ba8;           /* Azul corporativo */
    --color-primary-light: #2a7bc9;     /* Azul más claro */
    --color-yellow: #f4c430;            /* Amarillo */
    --color-red: #c41e3a;               /* Rojo */
    --color-white: #ffffff;             /* Blanco */
    --color-text: #333333;              /* Texto oscuro */
    --color-text-light: #666666;        /* Texto claro */
    --color-bg: #f8f9fa;                /* Fondo */
    --color-border: #e0e0e0;            /* Bordes */
    
    /* ESPACIADO */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* TIPOGRAFÍA */
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    /* ANIMACIONES */
    --transition: 300ms ease-in-out;
}
```

**Uso en CSS:**
```css
background-color: var(--color-primary);
padding: var(--spacing-lg);
transition: all var(--transition);
```

---

## 📱 Breakpoints Responsivos {#breakpoints}

```css
/* Desktop completo - Sin media query necesaria */
.catalogo-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* Tablets grandes */
@media (max-width: 1200px) {
    .catalogo-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}

/* Tablets medianas */
@media (max-width: 992px) {
    .catalogo-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
    .catalogo-image { height: 180px; }
}

/* Tablets pequeñas */
@media (max-width: 768px) {
    .catalogo-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
    .catalogo-image { height: 160px; }
}

/* Móviles */
@media (max-width: 576px) {
    .catalogo-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .catalogo-image { height: 140px; }
}
```

**Cambios en cada breakpoint:**
- Columnas del grid
- Alto de imágenes
- Tamaño de fuentes
- Espacios (gap)
- Padding

---

## ⚙️ Funciones JavaScript {#javascript}

### 1. `initializeNavigation()`

```javascript
// Propósito: Configurar navegación con smooth scroll
// Ejecutado: Al cargar la página (DOMContentLoaded)
// Eventos: Click en links de navegación
```

**Lo que hace:**
- Detecta clicks en `.nav-link`
- Valida que sea una ancla (#...)
- Calcula posición de la sección
- Desplaza suavemente
- Actualiza indicador visual

---

### 2. `updateActiveNavLink(scrollPosition)`

```javascript
// Propósito: Actualizar nav al hacer scroll manual
// Ejecutado: Continuamente mientras hace scroll
// Parámetro: Posición actual del scroll (pageYOffset)
```

**Lo que hace:**
- Detecta qué sección es visible
- Compara rangos de scroll
- Actualiza clase `active` en nav
- Crea experiencia fluida

---

### 3. `showNotification(message, type)`

```javascript
// Propósito: Mostrar notificaciones toast
// Tipos: 'success', 'error', 'warning', 'info'
// Auto-cierre: Después de 4 segundos
```

**Ejemplo de uso:**
```javascript
showNotification('Producto añadido al carrito', 'success');
showNotification('Por favor ingresa un término', 'warning');
```

---

### 4. `addToCart(productName, price)`

```javascript
// Propósito: Agregar producto al carrito
// Efecto: Incrementa contador, muestra notificación
// Integración: Botones "Añadir al Carrito"
```

---

## 🔌 Integración con Backend {#backend}

### Para Agregar Carrito Real:

```javascript
// En lugar de:
function addToCart(productName, price) {
    cartCount++;
    updateCartBadge();
    showNotification(`Agregado: ${productName}`, 'success');
}

// Hacer:
function addToCart(productName, price) {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: productName,
            price: price
        })
    })
    .then(response => response.json())
    .then(data => {
        cartCount = data.cartCount;
        updateCartBadge();
        showNotification(`Agregado: ${productName}`, 'success');
    })
    .catch(error => {
        showNotification('Error al agregar producto', 'error');
    });
}
```

### Para Hacer Búsqueda Funcional:

```javascript
// Actualmente es un placeholder
function performSearch() {
    const query = document.querySelector('.search-bar input').value;
    if (query.trim()) {
        // AQUÍ: Hacer llamada a API
        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                // Filtrar productos en el DOM
                filterProducts(data);
            });
    }
}

function filterProducts(results) {
    // Mostrar/ocultar tarjetas según resultados
    document.querySelectorAll('.catalogo-card').forEach(card => {
        const productName = card.querySelector('.catalogo-product-name').textContent;
        card.style.display = results.some(r => r.name === productName) ? 'block' : 'none';
    });
}
```

### Para Filtrado por Categoría:

```javascript
// Agregar botones de filtro
document.querySelectorAll('.category-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        document.querySelectorAll('.catalogo-card').forEach(card => {
            const cardCategory = card.dataset.category;
            card.style.display = cardCategory === category ? 'block' : 'none';
        });
    });
});
```

---

## 🚀 Mejoras Futuras {#futuras}

### Corto Plazo (Semanas 1-2):
- [ ] Reemplazar todas las imágenes placeholder
- [ ] Conectar búsqueda a base de datos
- [ ] Hacer funcional el carrito
- [ ] Agregar filtros por precio
- [ ] Agregar ordenamiento (más vendido, precio)

### Mediano Plazo (Mes 1):
- [ ] Sistema de comentarios/reseñas
- [ ] Galería de imágenes múltiples
- [ ] Comparador de productos
- [ ] Favoritos/Wishlist
- [ ] Historial de búsquedas

### Largo Plazo (Meses 2-3):
- [ ] Inteligencia artificial para recomendaciones
- [ ] Sistema de stock en tiempo real
- [ ] Notificaciones push
- [ ] Chat en vivo
- [ ] Programa de lealtad

---

## 📈 Métricas y Monitoreo

### Google Analytics:
```html
<!-- Agregar al </body> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Eventos a Rastrear:
```javascript
// Cuando usuario hace click en categoría
gtag('event', 'view_category', {
    'category': 'Construcción'
});

// Cuando agrega al carrito
gtag('event', 'add_to_cart', {
    'product': productName,
    'price': price
});

// Búsqueda
gtag('event', 'search', {
    'search_term': query
});
```

---

## 🔒 Seguridad

### Validación de Datos:
```javascript
// Validar entrada de búsqueda
function validateSearchInput(query) {
    // Sin scripts
    const sanitized = query.replace(/<script[^>]*>.*?<\/script>/gi, '');
    // Sin caracteres especiales peligrosos
    return sanitized.trim();
}
```

### Headers de Seguridad (Backend):
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'
```

---

## 🧪 Testing

### Unit Tests (JavaScript):
```javascript
// Probar función de navegación
test('Navigation smooth scroll works', () => {
    const link = document.querySelector('a[href="#cat-construccion"]');
    link.click();
    expect(window.pageYOffset).toBeLessThan(document.querySelector('#cat-construccion').offsetTop);
});
```

### E2E Tests (Cypress):
```javascript
describe('Catalog Navigation', () => {
    it('Should navigate to construction category', () => {
        cy.visit('/');
        cy.get('a[href="#cat-construccion"]').click();
        cy.url().should('include', '#cat-construccion');
    });
});
```

---

## 📋 Checklist de Deployament

- [ ] Todas las imágenes optimizadas
- [ ] CSS minificado
- [ ] JavaScript minificado
- [ ] Pruebas en todos los navegadores
- [ ] Pruebas en dispositivos móviles reales
- [ ] Performance audit (Lighthouse > 90)
- [ ] SEO checklist completado
- [ ] Backups realizados
- [ ] Monitoring configurado
- [ ] Instrucciones de rollback preparadas

---

## 🆘 Troubleshooting

### Problema: Navigation no funciona
**Solución:** Verificar que los IDs en secciones coincidan con href en nav

```html
<!-- En nav -->
<a href="#cat-construccion">  <!-- ✓ Coincide -->
<!-- En sección -->
<section id="cat-construccion">  <!-- ✓ Coincide -->
```

### Problema: Imágenes no se ven
**Solución:** Verificar rutas relativas

```
./imagenes/producto.jpg  ✓ Correcto
imagenes/producto.jpg    ✓ Correcto
/imagenes/producto.jpg   ✗ Incorrecto
```

### Problema: Styles se solapan
**Solución:** Verificar especificidad CSS

```css
/* Menos específico */
.catalogo-price { color: red; }

/* Más específico (gana) */
.catalogo-card .catalogo-price { color: blue; }
```

---

## 📞 Contacto de Soporte

Para problemas técnicos:
1. Revisar GUIA_CATALOGO.md
2. Revisar EJEMPLOS_PERSONALIZACION.md
3. Revisar esta documentación técnica
4. Contactar al equipo de desarrollo

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025  
**Desarrollado por:** Frontend Development Team
