'use strict';
const React = require('react');
const {Text, Box} = require('ink');

const App = () => (

	<Box borderStyle="round" borderColor="green" className="full-app">

		<Box borderStyle="round" borderColor="green" className="left-box" width="50%" flexDirection="column">
			<Box className="changed-files" borderStyle="round" borderColor="green" height="50%">

			</Box>
			<Box className="stage-area" borderStyle="round" borderColor="green" height="50%">

			</Box>
		</Box>
		<Box borderStyle="round" borderColor="green" className="left-box" width="50%">

		</Box>

	</Box>
);

module.exports = App;
