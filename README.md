# Bienvenido a ctm_practicas 👋

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> Proyecto dedicado al registro y seguimiento de los aprendices que se encuentren actualmente en la etapa practica de su programa de formacion

## Instalación

### Server y Client

```bash
> npm i 
```

### Instalación de la base de datos

Para poder importar la base correctamente debes tener <a href="https://dev.mysql.com/downloads/" target="_blank">MySQL Community</a> descargado. Luego de eso deberás abrir los servicios de tu sistema operativo (añadir imagen de los servicios). Luego, abrirás **MySQL Community** y entrarás a tu servidor local (añadir imágen). Irás a ```Server -> Data Import``` y seleccionarás los el archivo **.sql** alojado en ```server/src/db/db.sql```. Le das a **Import data** y listo.

<hr />

## Uso

### Server

```bash
> npm run dev
> npm run tsc
```

### Cliente

```bash
> npm run dev
```

## Notas en el API

En api crear un archivo llamado: .env que tenga la siguiente forma:

```env
# Ruta del servidor de express
PORT=3000
# Usuario del usuario MySQL
DB_USER=root
# Contraseña del usuario MySQL
DB_PASSWORD=root
# Host del usuario MySQL
DB_HOST=localhost
# nombre de la base de datos MySQL
DB_DATABASE=practicas_sena
# Puerto de conexión de SQL
DB_PORT=3306
SECRET=foo
```

Reemplazar credenciales para conectarte a MySQL. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible.

El contenido de client fue creado usando: Vite.
El contenido de server fue creado usando: npm init y tsc --init.

## Diseños de baja fidelidad

> Figma https://www.figma.com/file/kEti36tdXAc1RqEp7MVGGi/Dise%C3%B1os-de-baja-fidelidad-SENA?type=design&node-id=0%3A1&mode=design&t=VrfBPJ0BYJrpWkEp-1

## Tecnologías

### Front end

<p align="left"> 
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

### Back end

<p align="left"> 
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">  <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>    </p>

## 🏆 Autor

- 👤 **Stiven Blandon**

## 🎖 Colaboradores

- 👤 **Lorena Quiceno**
- 👤 **Kevin Chica**
- 👤 **Juan Carlos Prasca**
- 👤 **Jairo Elías Bellaco**

## 🤝 Contribuyentes

- 👤 **Stiven Benjumea**
- 👤 **Juan Guillermo Gomez**
- 👤 **Tatiana Mosquera**
- 👤 **Cristian David Bedoya Torres**
- 👤 **Carlos Eduardo Morales Estrada**

## Perfiles Github

- [@ConanGH-S](https://github.com/ConanGH-S)
- [@lorenqg](https://github.com/lorenqg)
- [@STBenji](https://github.com/STBenji)
- [@Axelchica759](https://github.com/Axelchica759)
- [@iLestar](https://github.com/iLestar)
- [@Tattoarco](https://github.com/Tattoarco)
- [@Cristian10-24](https://github.com/Cristian10-24)
- [@KrlosPK](https://github.com/KrlosPK)

## 🤝 Contribuciones

¡Contribuciones, problemas y nuevas características son bienvenidas!

Siéntete libre de generar un problema en nuestra [issues page](https://github.com/ConanGH-S/practicas_sena/issues).

## Ayúdanos

¡Danos una ⭐️ si te interesa este proyecto!
