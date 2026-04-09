<!-- GUÍA DE CATÁLOGO - FERRETERÍA PAULINO ALBA -->

# 📦 GUÍA DE CATÁLOGO - Ferretería Paulino Alba

## ✅ Lo que se ha implementado

### 1. **Navegación Funcional (Smooth Scroll)**
- Todos los botones de categorías en la navegación ahora funcionan como anclas
- Al hacer clic, la página hace scroll suave hacia la sección correspondiente
- La navegación detecta automáticamente qué sección estás viendo y actualiza el indicador visual

### 2. **Secciones de Catálogo**
Se han creado 9 secciones principales con 5 productos cada una:
- **Construcción** (#cat-construccion)
- **Plomería** (#cat-plomeria)
- **Electricidad** (#cat-electricidad)
- **Herramientas** (#cat-herramientas)
- **Pinturas** (#cat-pinturas)
- **Iluminación** (#cat-iluminacion)
- **Seguridad** (#cat-seguridad)
- **Sanitarios** (#cat-sanitarios)
- **Ofertas** (#cat-ofertas)

### 3. **Diseño de Tarjetas de Producto**
Cada tarjeta incluye:
```
┌─────────────────────────┐
│   IMAGEN (220px alto)   │
├─────────────────────────┤
│ Nombre del Producto     │
│                         │
│ CÓDIGO: XX-XXX  REF: X  │ (Gris pequeño)
│ MARCA (Azul)            │
│                         │
│ RD$ 1,250.00  (Grande)  │
└─────────────────────────┘
```

Características de diseño:
- Bordes sutiles y limpios (1px solid #e0e0e0)
- Hover effect: borde azul + sombra + elevación
- Textos alineados a la izquierda
- Colores heredados de la paleta existente

### 4. **Responsividad**
- Desktop: 5 columnas
- Tablet (992px): 4 columnas
- Dispositivos medianos (768px): 3 columnas
- Móvil (576px): 2 columnas

---

## 🔧 Cómo Personalizar

### Cambiar imágenes de productos
En cualquier sección, encuentra una tarjeta como esta:
```html
<div class="catalogo-image">
    <img src="https://via.placeholder.com/600x700?text=Cemento" alt="Cemento">
</div>
```

Reemplaza la URL `https://via.placeholder.com/600x700?text=Cemento` con:
```html
<img src="ruta/a/tu/imagen.jpg" alt="Cemento">
```

**Tamaño recomendado:** 600x700px (para que se vea bien en los placeholders)

### Cambiar datos de productos
Localiza la sección donde quieras cambiar el producto y edita:
```html
<h4 class="catalogo-product-name">Nombre del Producto Aquí</h4>
<div class="catalogo-code-ref">
    <span><strong>CÓDIGO:</strong> TU-CODIGO</span>
    <span><strong>REF:</strong> 001234</span>
</div>
<p class="catalogo-brand">Marca del Producto</p>
<p class="catalogo-price">RD$ 1,250.00</p>
```

### Agregar o eliminar productos
Para **agregar** un nuevo producto en una categoría:
1. Copia una tarjeta completa:
```html
<div class="catalogo-card">
    <div class="catalogo-image">
        <img src="..." alt="...">
    </div>
    <div class="catalogo-info">
        <h4 class="catalogo-product-name">...</h4>
        <!-- resto del contenido -->
    </div>
</div>
```

2. Pégala dentro del mismo `<div class="catalogo-grid">`
3. Modifica los datos

Para **eliminar** un producto, simplemente borra su `<div class="catalogo-card">` completo.

### Cambiar nombre de categoría
Busca el título de la sección:
```html
<h2 class="catalogo-title">Construcción</h2>
```

Y cámbialo al nombre que desees.

### Agregar descuento a ofertas
En la sección de **Ofertas**, las tarjetas tienen este badge:
```html
<span class="badge-oferta">-40%</span>
```

Solo necesitas cambiar el número `40` por el porcentaje que desees.

Para mostrar precio anterior (tachado), usa:
```html
<p class="catalogo-price">RD$ 1,299.00 <span class="catalogo-old-price">RD$ 2,165.00</span></p>
```

---

## 🎨 Mantener Consistencia Visual

### Colores Usados (del archivo CSS):
- **Azul Primario:** `#1e5ba8` (Títulos, marcas, precios)
- **Texto:** `#333333` (Nombres de productos)
- **Texto Claro:** `#666666` (Códigos, referencias)
- **Fondo:** `#f8f9fa` (Fondo de imágenes)
- **Bordes:** `#e0e0e0` (Líneas divisorias)
- **Rojo:** `#c41e3a` (Badges de descuento)

### Variables CSS Disponibles:
```css
--color-primary: #1e5ba8;
--color-yellow: #f4c430;
--color-red: #c41e3a;
--color-text: #333333;
--color-text-light: #666666;
--color-bg: #f8f9fa;
--color-border: #e0e0e0;
```

**No necesitas crear estilos nuevos**, todo usa las variables existentes.

---

## 📱 Estructura en Móvil

La cuadrícula se adapta automáticamente:
- Desktops: 5 productos por fila
- Tablets: 3-4 productos por fila  
- Móviles: 2 productos por fila
- Muy pequeños: 1-2 productos

El texto se reduce automáticamente en dispositivos pequeños, manteniendo legibilidad.

---

## 🔍 Búsqueda y Filtrado

Actualmente, la barra de búsqueda es un placeholder. Si quieres hacerla funcional:

1. En `script.js`, busca la función `performSearch()`
2. Modifica para filtrar productos por categoría o nombre
3. Usa JavaScript para mostrar/ocultar tarjetas según el término de búsqueda

---

## ⚠️ Notas Importantes

- ✅ **Todos los estilos ya existen** en tu CSS, no necesitas agregar nada nuevo
- ✅ **Las anclas funcionan automáticamente**, solo necesitas cambiar los datos
- ✅ **El diseño es completamente responsivo** en todos los dispositivos
- ✅ **Los colores son consistentes** con tu identidad visual
- ⚠️ **Las imágenes placeholder** son de ejemplo; reemplázalas con tus propias imágenes

---

## 📊 Estructura de Carpetas

```
Ferreteria Paulino Alba/
├── index.html              # Contiene todas las secciones
├── assets/
│   ├── style.css          # Estilos CSS (completo)
│   └── script.js          # JavaScript (con smooth scroll)
└── README.md
```

**No necesitas archivos adicionales.**

---

## 💡 Próximos Pasos Sugeridos

1. **Reemplaza las imágenes placeholder** con fotos reales de tus productos
2. **Actualiza datos de productos**: nombres, códigos, referencias, marcas, precios
3. **Conecta la barra de búsqueda** a un filtrado real de productos
4. **Vincula a carrito**: modifica los botones para agregar productos reales
5. **Integra con backend**: conecta a base de datos si lo necesitas

---

**¿Necesitas ayuda?** El código está completamente comentado y es fácil de editar. Todos los elementos siguen la estructura de `class="catalogo-..."` para facilitar búsqueda.

---

**Versión:** 1.0.0  
**Fecha:** Enero 2025  
**Desarrollado para:** Ferretería Paulino Alba
