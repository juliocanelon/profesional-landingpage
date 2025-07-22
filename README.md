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

## Visión y Valor de la Landing Page

La finalidad de esta landing page es presentar de forma clara y profesional el mi perfil profesional. Se muestra su trayectoria, proyectos y habilidades, y se ofrece un chatbot con IA que permite resolver dudas al instante. Esta interacción dinámica demuestra conocimientos de integración de IA y crea una experiencia más atractiva para posibles clientes o empleadores.

## Tecnologías Utilizadas

**Frontend:** React con React Router y React Bootstrap para los estilos.  
**Backend:** Función serverless en Node.js (Vercel) que consulta la API de OpenAI.  
**Base de Datos:** Actualmente no se utiliza una base de datos; la información se carga desde módulos JavaScript.  
**IA:** Integración con GPT-3.5-turbo de OpenAI para el chatbot.

## Limitaciones y Mejoras Futuras

- La información mostrada es estática, está guardada en archivos js; podría migrarse a una base de datos para editar el contenido sin desplegar nuevamente.
- El chatbot tiene un número limitado de preguntas y solo responde con la información proporcionada.
- Sería interesante agregar soporte multidioma y más ejemplos de proyectos.

## Información Académica

UNIVERSIDAD NACIONAL EXPERIMENTAL DE GUAYANA  
Asignatura Ingeniería del Software  
Maestría en Tecnologías de Información
Profa. MSC Karla López
julio 2025