# Weather app for Reservamos coding challenge by Gus Ramirez

This is a simple weather app that uses the OpenWeatherMap API to get the weather for a given city.
And it uses Reservamos's API to get geo location data for a given city.

## Usage

> **Note:** This app requires Node.js v16 or v18 to run.

## Installation

### Install dependencies

```shell
    # Install commands

    # Npm
    npm install

    # Or

    # Yarn
    yarn install
```

### Run in dev mode (local)

```shell
    # Run commands

    # Npm
    npm run dev

    # Or

    # Yarn
    yarn dev
```

### Run containerized app (Docker)

```shell
    # build image
    docker build -t reservamos .

    # run image
    docker run --name weather-reservamos --rm -p 5000:80 reservamos:latest

    ##    Open browser and navigate to http://localhost:5000
    ##    http://localhost:5000/

    # to exit container
    ##   press ctrl + c
    ##   automatically container will be removed
```

## Stack

- [Angular framework](https://angular.io/)
- [Tailwindcss](https://tailwindcss.com/)

## Contact info

> Created by [Gus Ramírez](https://gusramirez.dev) ([**email**](mailto:g.ram.bt@hotmail.com)) - feel free to contact me!
