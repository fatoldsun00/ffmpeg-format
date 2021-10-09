# ffmpeg-format

The purpose of this project is a demo of light web server based on nodejs.
The web server translate parameter for ffmpeg overlay text feature into a CLI ffmpeg command.

## Installation

-   Binarie

There are a binary for a standalone, destkop install, don't worries with node and dependacies installation

-   Source

Clone the repo, in a CLI (command line interface) type this command

```
git clone https://github.com/fatoldsun00/ffmpeg-format.git
```

Go inside the directory of cloned repo and install node_module with this command

```
npm install
```

setup an .env file (optionnal) by creating a file with the name `.env` and paste

```
NODE_ENV=dev
PORT=8080
CORSALLOWURL=http://localhost:8080
```

And launch app with

```
node ./index.js
```

## Demo HTML page

Be careful of port used by web server, there are a trace into the console. The default port is 8000 but an .env file can override it.
Demo page is accessible by [http://localhost:8000/demo](http://localhost:8000/demo)

## Requete CURL

-   baseUrl: http://localhost:8000
-   Endpoint: /api/overlay/text
-   Method: POST
-   Request content-type: application/x-www-form-urlencoded or multipart/form-data

## Change langage response

You can change langage response by adding `?lang=en` queryString at the end URI

## Unit test

For launch unit test `npm test`

## Package app

For create dist `pkg .` make a standalone binary and write thenm into /dist directory
