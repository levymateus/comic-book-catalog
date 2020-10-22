# Comic Book Catalog


## Project structure

The folder structure of this project follows:

	.
	├── src 		        # Source files.
	    |── components 	    # The app React components. Cannot access the store.
	    |── containers	    # The the app logic and can access store data.
	    |── reducer 		# The handle redux actions an handle store data.
	    |── saga	    	# The async call to populate the store data.
	    |── store		    # The actions and store stypes.
	...
	└── README.md


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

(don't forget to run `yarn install` before)
