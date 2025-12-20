# PORTAFOLIO ERY CURSOS - Arquitectura de Software

> Plataforma educativa moderna para el curso de Arquitectura de Software

## 🚀 Características

- **Diseño Moderno**: Interfaz premium con glassmorphism, gradientes y animaciones
- **Modo Oscuro**: Soporte completo para tema claro y oscuro
- **Responsive Design**: Optimizado para dispositivos móviles, tablets y escritorio
- **Sistema de Progreso**: Trackeo automático del avance en las lecciones
- **Carga de Archivos**: Integración con Supabase para almacenar archivos
- **Navegación Intuitiva**: Breadcrumbs y menú móvil optimizado
- **Accesibilidad**: ARIA labels y navegación por teclado

## 📚 Estructura del Curso

El curso está dividido en 4 unidades:

1. **UNIDAD I**: Fundamentos de Arquitectura de Software
2. **UNIDAD II**: Patrones y Estilos Arquitectónicos
3. **UNIDAD III**: Diseño y Modelado de Arquitecturas
4. **UNIDAD IV**: Evaluación y Optimización

Cada unidad contiene 4 semanas de contenido con material descargable y espacio para subir tareas.

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript (Vanilla)**: Sin frameworks, código limpio y modular
- **Supabase**: Backend para almacenamiento de archivos
- **Google Fonts**: Inter y Poppins

## 📦 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/TU_USUARIO/PORTAFOLIO_ERY_CURSOS.git
cd PORTAFOLIO_ERY_CURSOS
```

2. Configura Supabase (opcional pero recomendado):
   - Crea una cuenta en [Supabase](https://supabase.com)
   - Crea un nuevo proyecto
   - Crea un bucket llamado `course-uploads` en Storage
   - Copia tus credenciales (URL y Anon Key)
   - Actualiza las meta tags en cada archivo HTML:

   ```html
   <meta name="supabase-url" content="TU_SUPABASE_URL">
   <meta name="supabase-key" content="TU_SUPABASE_ANON_KEY">
   ```

3. Abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con VS Code Live Server
# Instala la extensión Live Server y haz clic derecho > "Open with Live Server"
```

## 🌐 Despliegue en GitHub Pages

1. Sube el código a GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Ve a Settings > Pages en tu repositorio
3. Selecciona la rama `main` y carpeta `/root`
4. Haz clic en "Save"
5. Tu sitio estará disponible en `https://TU_USUARIO.github.io/PORTAFOLIO_ERY_CURSOS/`

## ⚙️ Configuración de Supabase Storage

### Crear el Bucket

```sql
-- En el SQL Editor de Supabase
-- El bucket se crea desde la interfaz web en Storage
```

### Configurar Políticas RLS

```sql
-- Permitir subida pública
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'course-uploads');

-- Permitir lectura pública
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-uploads');

-- Permitir eliminar propios archivos
CREATE POLICY "Allow delete own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'course-uploads');
```

## 📱 Características del Sistema

### Sistema de Progreso

- Guardado automático en localStorage
- Indicadores visuales de completitud
- Cálculo de porcentaje por unidad
- Exportación/importación de datos

### Sistema de Carga de Archivos

- Drag & Drop
- Validación de tamaño (máx 10MB)
- Tipos permitidos: PDF, Word, PowerPoint, imágenes
- Almacenamiento en Supabase (opcional)
- Fallback a localStorage si no hay Supabase

### Tema Oscuro

- Detección automática de preferencia del sistema
- Toggle manual
- Transiciones suaves
- Persistencia en localStorage

## 🎨 Personalización

### Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
    --color-primary: hsl(250, 84%, 54%);
    --color-secondary: hsl(340, 82%, 52%);
    --color-accent: hsl(170, 77%, 46%);
    /* ... más colores */
}
```

### Fuentes

Cambia las fuentes en `css/styles.css`:

```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-display: 'Poppins', sans-serif;
}
```

## 📄 Estructura de Archivos

```
PORTAFOLIO_ERY_CURSOS/
├── index.html              # Página principal
├── courses.html            # Vista general del curso
├── unidad1.html            # Unidad I
├── unidad2.html            # Unidad II
├── unidad3.html            # Unidad III
├── unidad4.html            # Unidad IV
├── contact.html            # Página de contacto
├── login.html              # Página de login
├── dashboard.html          # Dashboard del estudiante
├── css/
│   ├── styles.css          # Estilos principales
│   ├── components.css      # Componentes reutilizables
│   └── animations.css      # Animaciones
├── js/
│   ├── main.js             # JavaScript principal
│   ├── progress.js         # Sistema de progreso
│   ├── fileUpload.js       # Sistema de carga de archivos
│   ├── auth.js             # Autenticación
│   ├── search.js           # Búsqueda
│   └── dashboard.js        # Dashboard
├── assets/
│   └── images/
│       └── upla-logo.png   # Logo UPLA
├── README.md               # Este archivo
└── .gitignore              # Archivos ignorados por Git
```

## 👤 Autor

**Edwin Ramirez**

- Email: <edwramirezy@gmail.com>
- Teléfono: +51 967013078

## 📝 Licencia

© 2025 Edwin Ramirez. Todos los derechos reservados.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor crea un issue en GitHub con:

- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots (si aplica)

## 📞 Soporte

Para soporte, contacta a <edwramirezy@gmail.com>

---

**Nota**: Este proyecto fue creado como portafolio educativo para el curso de Arquitectura de Software. La integración con Supabase es opcional y el sistema funciona completamente con localStorage si no se configura.
