<!-- EJEMPLOS DE PERSONALIZACIÓN - FERRETERÍA PAULINO ALBA -->

# 🎨 EJEMPLOS DE PERSONALIZACIÓN

## 1️⃣ Cambiar una Imagen de Producto

### ANTES (Placeholder):
```html
<div class="catalogo-image">
    <img src="https://via.placeholder.com/600x700?text=Cemento" alt="Cemento">
</div>
```

### DESPUÉS (Con tu imagen):
```html
<div class="catalogo-image">
    <img src="imagenes/productos/cemento-premium.jpg" alt="Cemento Premium 50kg">
</div>
```

---

## 2️⃣ Cambiar Todos los Datos de un Producto

### ANTES:
```html
<div class="catalogo-card">
    <div class="catalogo-image">
        <img src="https://via.placeholder.com/600x700?text=Cemento" alt="Cemento">
    </div>
    <div class="catalogo-info">
        <h4 class="catalogo-product-name">Cemento Premium 50kg</h4>
        <div class="catalogo-code-ref">
            <span><strong>CÓDIGO:</strong> CP-50K</span>
            <span><strong>REF:</strong> 001234</span>
        </div>
        <p class="catalogo-brand">Holcim</p>
        <p class="catalogo-price">RD$ 245.99</p>
    </div>
</div>
```

### DESPUÉS (Ejemplo: Cambiar a arena):
```html
<div class="catalogo-card">
    <div class="catalogo-image">
        <img src="imagenes/arena-construccion.jpg" alt="Arena para Construcción">
    </div>
    <div class="catalogo-info">
        <h4 class="catalogo-product-name">Arena de Construcción Silícea</h4>
        <div class="catalogo-code-ref">
            <span><strong>CÓDIGO:</strong> AR-SILICEA-50</span>
            <span><strong>REF:</strong> 004521</span>
        </div>
        <p class="catalogo-brand">SandPro</p>
        <p class="catalogo-price">RD$ 180.50</p>
    </div>
</div>
```

---

## 3️⃣ Agregar un Descuento a una Oferta

### SIN DESCUENTO:
```html
<p class="catalogo-price">RD$ 1,250.00</p>
```

### CON DESCUENTO:
```html
<p class="catalogo-price">RD$ 750.00 <span class="catalogo-old-price">RD$ 1,250.00</span></p>
```

### CON BADGE DE DESCUENTO:
```html
<div class="catalogo-image">
    <img src="..." alt="...">
    <span class="badge-oferta">-40%</span>  <!-- ← Agrega esto -->
</div>
```

---

## 4️⃣ Agregar un Nuevo Producto a una Categoría

1. Ve a la sección que quieras (ej: `#cat-construccion`)
2. Busca `<div class="catalogo-grid">`
3. Copia esta estructura y pégala al final (antes del cierre `</div>`):

```html
<div class="catalogo-card">
    <div class="catalogo-image">
        <img src="imagenes/tu-producto.jpg" alt="Nombre del Producto">
    </div>
    <div class="catalogo-info">
        <h4 class="catalogo-product-name">Nombre del Producto Aquí</h4>
        <div class="catalogo-code-ref">
            <span><strong>CÓDIGO:</strong> TU-CODIGO</span>
            <span><strong>REF:</strong> 009999</span>
        </div>
        <p class="catalogo-brand">Tu Marca</p>
        <p class="catalogo-price">RD$ 999.99</p>
    </div>
</div>
```

**Importante:** Cambiar `REF` (cada producto debe tener número único)

---

## 5️⃣ Eliminar un Producto

Simplemente busca la tarjeta que quieras eliminar y borra TODO este bloque:

```html
<div class="catalogo-card">
    <!-- ... contenido ... -->
</div>
```

---

## 6️⃣ Cambiar el Nombre de una Categoría

Busca la sección (ej: `#cat-construccion`) y encuentra:

```html
<h2 class="catalogo-title">Construcción</h2>
```

Cámbialo a:

```html
<h2 class="catalogo-title">Materiales de Construcción Pesada</h2>
```

---

## 7️⃣ Cambiar la Descripción de una Categoría

Busca después del título:

```html
<p class="catalogo-subtitle">Todos los materiales que necesitas para tus proyectos</p>
```

Cámbialo a:

```html
<p class="catalogo-subtitle">Cementos, bloques, acero y materiales de primera calidad</p>
```

---

## 8️⃣ Agregar una Nueva Categoría

1. Copia esta estructura completa:

```html
<!-- CATEGORÍA: MI NUEVA CATEGORÍA -->
<section id="cat-micategoria" class="catalogo-section">
    <div class="container">
        <div class="catalogo-header">
            <h2 class="catalogo-title">Mi Nueva Categoría</h2>
            <p class="catalogo-subtitle">Descripción de mi nueva categoría</p>
        </div>
        <div class="catalogo-grid">
            <!-- Aquí pega 5 tarjetas de productos -->
        </div>
    </div>
</section>
```

2. Pégalo antes de `<!-- ==================== INFORMACIÓN ==================== -->`

3. Agrega el enlace en la navegación:

```html
<li><a href="#cat-micategoria" class="nav-link">Mi Nueva Categoría</a></li>
```

**Importante:** 
- Cambiar `id="cat-micategoria"` por un ID único
- Cambiar `href="#cat-micategoria"` que coincida con el ID
- El ID debe estar en minúsculas y sin espacios

---

## 9️⃣ Cambiar Colores de los Productos

Los colores están definidos en `assets/style.css` en la sección `:root`:

```css
:root {
    --color-primary: #1e5ba8;        /* Azul - Títulos, Marcas */
    --color-yellow: #f4c430;         /* Amarillo */
    --color-red: #c41e3a;            /* Rojo - Descuentos */
    --color-text: #333333;           /* Negro - Textos */
    --color-text-light: #666666;     /* Gris claro - Códigos */
    --color-bg: #f8f9fa;             /* Gris muy claro - Fondo */
    --color-border: #e0e0e0;         /* Gris - Bordes */
}
```

**Ejemplo:** Si quieres que las marcas sean rojas en lugar de azules:

Antes:
```css
color: var(--color-primary);  /* Azul */
```

Después:
```css
color: var(--color-red);  /* Rojo */
```

---

## 🔟 Cambiar Espacios Entre Productos

En `assets/style.css`, busca:

```css
.catalogo-grid {
    gap: var(--spacing-lg);  /* Esto es el espacio */
}
```

Puedes cambiar `var(--spacing-lg)` a:
- `var(--spacing-sm)` = espacios pequeños
- `var(--spacing-md)` = espacios medianos
- `var(--spacing-xl)` = espacios grandes
- `2rem` = espacios personalizados

---

## 📋 CHECKLIST DE PERSONALIZACIÓN

- [ ] Reemplazar todas las imágenes placeholder
- [ ] Actualizar precios
- [ ] Actualizar códigos y referencias
- [ ] Actualizar marcas
- [ ] Agregar descuentos en ofertas
- [ ] Agregar/eliminar productos según sea necesario
- [ ] Cambiar nombres de categorías si es necesario
- [ ] Cambiar descripciones de categorías
- [ ] Verificar que los IDs de anclas sean únicos
- [ ] Probar navegación en móvil

---

## ⚠️ ERRORES COMUNES A EVITAR

❌ **NO hagas esto:**
```html
<p class="catalogo-price">RD$ $ 245.99</p>  <!-- Doble $ -->
```

✅ **Haz esto:**
```html
<p class="catalogo-price">RD$ 245.99</p>
```

---

❌ **NO hagas esto:**
```html
<span><strong>CÓDIGO</strong> CP-50K</span>  <!-- Falta : -->
```

✅ **Haz esto:**
```html
<span><strong>CÓDIGO:</strong> CP-50K</span>
```

---

❌ **NO hagas esto:**
```html
<section id="construccion">  <!-- ID duplicado con otra sección -->
```

✅ **Haz esto:**
```html
<section id="cat-construccion">  <!-- ID único -->
```

---

## 🆘 NECESITAS AYUDA?

1. **Imagen no aparece:** Verifica que la ruta sea correcta
2. **Texto se sale:** No cambies las clases, solo el contenido
3. **Estilos raros:** No edites style.css a menos que sepas CSS
4. **Navegación no funciona:** Verifica que el `id` en la sección coincida con `href` en la nav

---

**¡Listo para personalizar tu catálogo! 🎉**

Versión: 1.0.0 | Enero 2025
