# 🔧 Ferretería Paulino Alba - Landing Page

## 📋 Descripción del Proyecto

Landing page profesional para **Ferretería Paulino Alba**, diseñada con un estilo clásico y robusto similar al sitio de **OchoA**. El sitio es completamente responsivo y está optimizado para dispositivos móviles.

---

## 🎨 Identidad Visual

### Paleta de Colores
- **Azul Brillante**: `#1e5ba8` (Color Primario)
- **Amarillo**: `#f4c430` (Acentos y Botones)
- **Rojo**: `#c41e3a` (Detalles y Descuentos)
- **Blanco**: `#ffffff` (Texto Principal)
- **Gris**: Varios tonos para fondos y bordes

---

## 📁 Estructura de Archivos

```
Ferreteria Paulino Alba/
│
├── index.html              # Archivo principal HTML
├── assets/
│   ├── style.css          # Estilos CSS
│   └── script.js          # JavaScript e Interactividad
└── README.md              # Este archivo
```

---

## 🚀 Características Implementadas

### 1. **Top Header Bar**
   - Información de contacto rápida
   - Teléfono y horario de atención
   - Enlaces a Sucursales y Preguntas Frecuentes

### 2. **Header Principal**
   - Logo circular con iconos de herramientas
   - Barra de búsqueda funcional
   - Iconos de "Mi Cuenta" y "Carrito"
   - Badge de contador de productos

### 3. **Navegación Horizontal**
   - Menú sticky con categorías principales
   - Efectos de hover con subrayado en amarillo
   - Responsive en dispositivos móviles

### 4. **Hero Section (Carousel)**
   - Slider automático de 3 banners
   - Controles manuales (flechas y puntos)
   - Textos y botones responsivos
   - Colores diferentes para cada slide

### 5. **Sección de Categorías**
   - Grid de 6 categorías principales
   - Iconos interactivos
   - Efectos hover con elevación
   - Bordes y sombras profesionales

### 6. **Sección de Promociones**
   - Banner destacado con gradiente amarillo
   - Call-to-action claro
   - Información de ofertas

### 7. **Productos Destacados**
   - Grid de 4 productos
   - Imágenes con overlay de descuento
   - Precios actuales y anteriores tachados
   - Botones "Añadir al Carrito" funcionales
   - Efectos hover suavizados

### 8. **Sección de Información**
   - 3 cajas con beneficios clave
   - Iconos representativos
   - Textos descriptivos

### 9. **Footer Profesional**
   - Información de la empresa
   - Enlaces a categorías
   - Enlaces de ayuda
   - Datos de contacto
   - Redes sociales con hover interactivo
   - Copyright y políticas

---

## 💻 Funcionalidades JavaScript

### 1. **Búsqueda Interactiva**
   - Validación de entrada
   - Notificaciones de búsqueda
   - Enter para enviar

### 2. **Carrito de Compras**
   - Contador dinámico
   - Animación de badge al agregar
   - Notificaciones con detalles

### 3. **Notificaciones**
   - Sistema de notificaciones toast
   - Diferentes tipos (success, error, warning, info)
   - Auto-cierre después de 4 segundos
   - Botón de cerrar manual

### 4. **Carousel Automático**
   - 5 segundos de intervalo
   - Navegación manual
   - Indicadores punteados

### 5. **Interactividad General**
   - Scroll suave
   - Efectos hover en botones
   - Logo clickeable (vuelve al inicio)
   - Enlaces responsivos en footer

---

## 📱 Responsividad

El sitio está optimizado para:
- **Desktop**: Ancho completo con grid de 4 columnas
- **Tablet** (768px): Grid de 2 columnas
- **Móvil** (576px): Grid de 1-2 columnas
- **Pequeños móviles**: Navegación simplificada

---

## 🎯 Instrucciones de Uso

### Para Abrir en el Navegador
1. Abre `index.html` con cualquier navegador moderno
2. El sitio se cargará completamente con todas las funcionalidades

### Para Personalizar

#### Cambiar Colores
Edita las variables CSS en `assets/style.css`:
```css
:root {
    --color-primary: #1e5ba8;        /* Azul */
    --color-yellow: #f4c430;         /* Amarillo */
    --color-red: #c41e3a;            /* Rojo */
}
```

#### Cambiar Textos
- Encabezados y descripciones en `index.html`
- Textos de categorías y productos

#### Reemplazar Imágenes
En la sección de productos, reemplaza:
```html
<img src="https://via.placeholder.com/250x250?text=Taladro" alt="Taladro">
```

Por la ruta de tu imagen:
```html
<img src="ruta/a/tu/imagen.jpg" alt="Taladro">
```

#### Añadir Más Productos
Copia una tarjeta de producto y adapta:
```html
<div class="col-lg-3 col-md-6 col-sm-6">
    <div class="product-card">
        <!-- Contenido aquí -->
    </div>
</div>
```

---

## 🔌 Dependencias Externas

El sitio usa:
- **Bootstrap 5.3.0**: Para estructura y grid responsivo
- **Font Awesome 6.4.0**: Para iconos

Ambos se cargan desde CDN, no requiere instalación.

---

## ✨ Características Extras

- Scroll suave en toda la página
- Animaciones CSS modernas pero clásicas
- Efectos de hover sutiles y profesionales
- Header sticky que se adapta al scroll
- Carrusel automático pero controlable
- Sistema de notificaciones elegante

---

## 🛠️ Soporte y Mantenimiento

Para cualquier modificación futura:

1. **Estilos**: Modifica `assets/style.css`
2. **Estructura**: Modifica `index.html`
3. **Interactividad**: Modifica `assets/script.js`

Todos los archivos están bien comentados para facilitar mantenimiento.

---

## 📞 Información de Contacto (Ejemplo)

- **Teléfono**: +34 XXX XXX XXX
- **Email**: info@paulinoalba.com
- **Horario**: Lunes a Sábado, 8:00 AM - 8:00 PM

---

## 📄 Licencia

© 2025 Ferretería Paulino Alba. Todos los derechos reservados.

---

**Desarrollado por**: Frontend Development Team  
**Fecha**: Enero 2025  
**Versión**: 1.0.0
