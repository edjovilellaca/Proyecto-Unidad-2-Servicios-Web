Instrucciones para configurar el entorno.

1.- Realizamos la instalacion de las dependencias que utilizamos
 npm i

2.- Deben implementarse llaves proveídas por Amazon, colocamos una guía dentro del documento de las Apis, para evitar tener problemas con el uso publico de las llaves. Esto creando un archivo .env en la raiz del proyecto y declarandolas como "AMAZONKEY1" y "AMAZONKEY2"

3.- De ser necesario, si no se encuentra en la region implementada, deberá ingresar a la carpeta "apis/generarPDF.js" y modificar la region del AWS

4.- Implementar las llaves necesarias de Twilio en el archivo .env con los nombres "TULIOKEY1" y "TULIOKEY2"

5.- Implementa la llave necesarias de Stripe en el archivo .env con el nombre "STRIPE_KEY"

6.- Implementar las llaves necesarias de Mailjet en el archivo .env con los nombres "MAILJET1" y "MAILJET2"

6.- Implementar la llave necesaria de Facturapi en el archivo .env con el nombre "FACTURAKEY"

Documentación de las APIs:
https://app.swaggerhub.com/apis-docs/NAANESTRELLARO/ProyectoServicios/1.0.0#/Productos
