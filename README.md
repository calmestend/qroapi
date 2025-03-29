# QROapi: Revitalizando el transporte colectivo

_______________________________________________________________________________________
Este proyecto se crea bajo la licencia MIT, cuyo testamento se encuentra en el archivo **LICENSE.md**, donde se especifica el uso a dar de este proyecto. El objetivo es proveer un proyecto open-source, habilitado para implementarse en usos comerciales.
_______________________________________________________________________________________

# QROapi
El queretano promedio ocupa el 5% de su vida transportándose. Más nos vale tratar de hacer este tiempo de provecho, o en su mínima expresión, sin estrés.


El objetivo es recrear, revitalizar, la forma de interactuar en plataformas de movilidad: tanto estatales como privadas. En este caso, el enfoque fue total a la aplicación QroBus. Mucha de la argumentación ya viene incluída en el video demo a continuación.

[video]

Una de las mayores quejas del transporte público: Las rutas, y en específico, las estimaciones de ¿Cuándo llega mi qroBus? son actualmente ambiguas. Tanto así, que durante el hackathon realizamos una encuesta de la que se resumen dos observaciones:

- 80% Usa o ha usado el qroBus, junto con su aplicación
- Al 76% de los usuarios, la app no le satisface.

Y, aunque el enfoque central del proyecto es de aplicación móvil, la esencia del mismo puede ser aplicable tanto para el sitio web, como para los mismos kioskos con pantallas táctiles en las paradas.

## Problemas observados:

- Barrera de entrada para nuevos usuarios, tanto por la baja disposición por migrar a un medio colectivo de transporte, como por el servicio. 
- La brecha tecnológica de una aplicación móvil para ciertos sectores.
- La incorrecta estimación de horarios de los autobuses.
- Falta de sencillez, automatización.
- Falta de personalización.

## QROAPI al rescate:

- Entras a la aplicación, presionas el botón de viajar, escribes "casa", o "trabajo". Se te propone una ruta con indicaciones para llegar a tu destino. Y ya.

- No hay registro de información manual. En el mejor escenario, demoras 15 segundos.

- En caso de que no se pueda calcular automáticamente una ruta, escribes por chat, sin importar los modismos y coloquialismos que uses al escribir (lo que permite inclusividad en brecha tecnológica por edad o por sector social), hasta que la inteligencia artificial sea capaz de entender tu destino y posición actual, para ajustar las paradas de autobus pertinentes.

- Además, incorporamos el uso de la IA para buscar y filtrar eventualidades relevantes para tu viaje, sin importar si este ocurre ahora mismo, o lo consultaste, para mañana! Permítanos explicarlo:

1.-" Usamos datos del clima para evaluar si existen recomendaciones adicionales para el viaje (Ej: Ponerse bloqueador! llevar paraguas! Que te recomendemos usar shorts?! Sí!)."

2.-"El segundo factor, es llevar un registro de las noticias actuales que potencialmente impactan el recorrido. ¿Con qué propósito? Para no proponerte una ruta que sabemos que en el momento que la tomes: Mañana hay obra en 5 de febrero, o hay una calle cerrada, o se programó una manifestación, o sucederá un evento".

De esta manera, no solo la interacción es más rápida. Es ágil, es eficiente, es automática, es inclusiva, es personalizable, es sencilla. Y, por último, integrable.

Cabe recalcar que de inspeccionarse los scripts del repositorio, todo el generative_ia de QROAPIv1.0 parte del uso de los modelos de GEMINI.

## Propósitos de sencilla integración
En el equipo creemos en el uso de esfuerzo y recursos de manera inteligente. Vimos una integración mucho más elocuente al entenderlo como un servicio que incorporas a la infraestructura de qroBUS ya existente. Es por eso que solo se emulo cierta sección de la aplicación QROBUS, pero se piensa mantener en endpoints, como un servicio consumible!

## Visión
Una vez implementado qroAPI en la aplicación de QROBUS, no hay por que no llevarlo más allá. Que tuzoBus en Pachuca, MueveTex en Toluca, "Va y ven" en Yucatan, incluso miBici en Guadalajara, utilicen qroAPI.

## Expansión
Aunque este proyecto surgió en el marco de un hackathon de 24 horas, el equipo tiene una visión a largo plazo. Sabemos que QROapi puede ir más allá de una solución puntual!

A continuación, te compartimos funcionalidades que creemos valiosas de considerar en futuras iteraciones del proyecto:

1. **Navegación por Voz**
Nuestro objetivo es que incluso usuarios con limitaciones tecnológicas o físicas puedan interactuar con la plataforma sin barreras. Imagina que puedas simplemente decir:

“Llévame a casa”,
y QROapi entienda tu solicitud, calcule la mejor ruta y te dé instrucciones claras, paso a paso, sin necesidad de tocar una pantalla.

Tecnologías implicadas aquí son el reconocimiento de voz y modelos NPL. Objetivos que bien pueden cumplirse con herramientas de GCP.

2. **Propuesta del modelo predictivo de tiempos de rutas**
Uno de los retos fundamentales en movilidad es y seguirá siendo la precisión de las estimaciones. Por eso, un proceso iterativo similar al siguiente punto 3 se deberá seguir, recopilando los datos correctos para intentar converger a un óptimo global.

3. **Mejora del modelo predictivo para lugar de hogar y trabajo**
Sabemos que podemos mejorar las heurísticas tomadas, e incluso con un buen volumen de datos entrenar propiamente modelos mucho más robustos y generales. La propuesta es la siguiente:

DBSCAN (Density-Based Spatial Clustering): Agrupa ubicaciones cercanas para detectar casa, trabajo y otros puntos frecuentes visitados por el usuario.

Gaussian Mixture Model (GMM): Maneja situaciones donde el usuario tiene más de una casa o más de un sitio de trabajo.

HDBSCAN: Detecta lugares con menor número de visitas y los descarta para evitar ruido en los datos.

Google Places API: Nos proporciona información en tiempo real sobre el tipo de establecimiento en un lugar identificado.

Con esto la API puede aprender automáticamente dónde vive el usuario, su lugar de trabajo y sus sitios de interés, sin necesidad de que los introduzca manualmente.


## Ahora sí, probemos el proyecto!

Asegúrate de tener instaladas las siguientes herramientas:

- Python 3.8 o superior
- Node.js 20 o superior
- Git
- Yarn o npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) → `npm install -g expo-cli`
- Virtualenv → `pip install virtualenv`

---

## Instrucciones para uso de apiQRO DEMO v1.0

Para la utilización correcta de este proyecto y todas sus funcionalidades es
necesario montar los siguientes 3 servidores, por ende se utilizarán diferentes
terminales o entornos.

### Clonar repositorio 
```bash
git clone https://github.com/calmestend/qroapi
```

#### Despliegue de API
```bash
cd hackathon-troyano/ # Dentro de qroapi/
npm install
npm run start # Ejecutar servidor

```

#### Despliegue de Agente AI
```bash
cd hack-uaq/ # Dentro de qroapi/
python -m venv .venv
source .venv/bin/activate
source env/bin/activate  # Solo en Windows: env\Scripts\activate
pip install -r requirements.txt # de usar venv regular
python climaqro/manage.py runserver 0.0.0.0:8000 # Ejecutar servidor

# Agregar en .env
GOOGLE_API_KEY="APIKEY_GEMINI"
api_key="APIKEY_OPENWEATHER"
route_found="False"
```

#### Despliegue de simulacion de APP
```bash
cd my-app/ # Dentro de qroapi/
npm install
npx expo start # Ejecución mediante expo go
```

### QROapi es un proyecto diseñado por:
- André Robles Bueckmann (Estudiante de matemáticas y ciencia de datos)
- Valeria Osorio Ferreiro (Estudiante de ingeniería de datos e inteligencia artificial)
- Cristian Barac Fabregat Gallegos (Estudiante de ingenieria en desarrollo de software multiplataforma)
- Marco Antonio García Lavariega (Estudiante de TCU en entornos virtuales y negocios digitales)
- Carlos de Ávila León (Estudiante de entornos virtuales y negocios digitales).
