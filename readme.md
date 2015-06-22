# Hoodsense

Searching the listings of Craigslist, Kijiji and ViewIt for apartment listings.

Using [NodeJS](http://nodejs.com), [Express](http://expressjs.com/), [X-Ray](https://github.com/lapwinglabs/x-ray) and [React](https://facebook.github.io/react/) to scrape the web and present apartments to the user.

Built as a collabo and learning tool between [Jen Thorn](http://jenthorn.ca) and [Drew Minns](http://drewminns.com).

## How to use

Fork the repo and clone to your computer.

Open up the command line and navigate to the base folder.

	cd hoodsense

Run the following command to install the dev dependencies

	npm install

Once installed, you have two choices: **development** or **production**

###Development

All client-side development is done within the `src` directory, the Sass, React components and HTML is modified within that folder. To run all the dev tasks and serve through browser-sync, run the following command.

	gulp

The task will compile all the Sass within the `src/css` directory and compile them the to `build/css` directory, As well, any React Components will be transformed from **JSX** to **JS**, concatenated, uglified and dumped in `build/js`. Any files with an extension of `.html` will be moved over to the `build` directory.

Browser-sync will then proxy the routes served from the express app. Basically `localhost:8080` becomes `localhost:3000`.

### Production
If you're interested in simply running the app, just run the following

	gulp serve

### API

To get apartment listings, the endpoint will be `http://localhost:8080/api` or `http://localhost:3000/api`.

You MUST the following parameters: Location, rooms and price. So the endpoint becomes

	http://localhost:3000/api?location=queen+west&price=2000&rooms=2

## Party on


