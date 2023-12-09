# Weather app for Reservamos coding challenge by Gus Ramirez

This is a simple weather app that uses the OpenWeatherMap API to get the weather for a given city.
And it uses Reservamos's API to get geo location data for a given city.

## Usage

The app is simple to use, just type the name of the city you want to get the weather for and after 450ms the app will make a request to the OpenWeatherMap API and display the weather for the given city.
Is also possible to get the weather for a given city with partial name, for example: "New" will return the weather for "New York".
The actual "locale" is set to 'es' (Spanish).
At the bottom of the page there are mini cards with the weather for the next 5 days and is possible to navigate between days by clicking over the mini cards.

## Installation

> **Note:** This app requires Node.js v16 or v18 to run.

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
