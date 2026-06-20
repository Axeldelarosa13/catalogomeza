# Articulos Meza

Catalogo web estatico para productos de cocina, hogar y mesa. Esta version esta pensada para subirla directo a GitHub y publicarla con GitHub Pages, sin Firebase, sin panel administrativo y sin servicios de pago.

## Que incluye

- Pagina principal profesional con header de Grupo Meza.
- Catalogo con busqueda en tiempo real.
- Filtros por categoria y productos destacados.
- Pagina individual por producto usando slug.
- Galeria de imagenes por producto.
- Boton de contacto por WhatsApp: `+52 1 315 120 3120`.
- Diseno responsive para celular, tablet y computadora.
- SEO basico para portada, catalogo y productos.
- Imagenes locales dentro de `public/productos-meza`.

## Cambiar productos

Los productos estan cargados en:

```txt
src/lib/mock-data.ts
```

Para cambiar textos, categorias, destacados, credito, enganche o pago semanal, edita ese archivo y vuelve a subir los cambios a GitHub.

Las imagenes estan en:

```txt
public/productos-meza
```

Para cambiar una imagen, agrega el archivo a esa carpeta y actualiza la ruta del producto en `src/lib/mock-data.ts`.

## Variables opcionales

Crea `.env.local` solo si quieres cambiar el sitio local o el WhatsApp:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_WHATSAPP_NUMBER=5213151203120
```

Para GitHub Pages no necesitas configurar Firebase ni Secrets.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre:

```txt
http://localhost:3000
```

Comandos de verificacion:

```bash
npm run lint
npm run typecheck
npm run build
```

## Subir a GitHub

La forma mas sencilla es con GitHub Desktop:

1. Extrae el ZIP del proyecto.
2. Abre GitHub Desktop.
3. Usa `File > Add local repository`.
4. Selecciona la carpeta extraida.
5. Publica el repositorio.

Si lo subes desde la web de GitHub, arrastra los archivos del proyecto, no el ZIP completo.

## Publicar con GitHub Pages

Este proyecto ya trae el workflow:

```txt
.github/workflows/github-pages.yml
```

En GitHub:

1. Entra a `Settings > Pages`.
2. En `Build and deployment`, selecciona `GitHub Actions`.
3. Sube los archivos a la rama `main`.
4. Espera a que termine la accion `Deploy GitHub Pages`.

La pagina quedara en:

```txt
https://TU_USUARIO.github.io/NOMBRE_REPO/
```

El workflow ajusta automaticamente la ruta base para que funcione aunque el repositorio se llame `catalogomeza`, `articulos-meza` u otro nombre.
