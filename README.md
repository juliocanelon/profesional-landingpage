# Landing Page de Julio C. Canelón

## Instalación
```bash
git clone <repo-url>
cd landing-page
npm install
```

Crea un archivo `.env.local` en la raíz con tu clave de OpenAI:

```bash
OPENAI_API_KEY=TU_API_KEY_AQUI
```

Si despliegas en Vercel y la ruta `/api/chat` devuelve `500`, revisa que la
variable `OPENAI_API_KEY` esté configurada en el panel de **Environment
Variables**. También puedes ejecutar `vercel logs` para obtener más detalles
del error.

## Desarrollo
```bash
npm start
```

## Build
```bash
npm run build
```

## Deploy en Vercel
1. Importa el repo en Vercel.
2. Framework: Create React App.
3. Build Command: `npm run build`.
4. Output Directory: `build`.
