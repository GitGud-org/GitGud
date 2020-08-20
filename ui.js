'use strict';
const {React, useEffect} = require('react');
const {Text, Box, render} = require('ink');
const {exitFullScreen, FullScreen} = require('./components/fullscreen')

const App = () => {
	useEffect(() => {
    return FullScreen();
	}, [])
	return (
	<Box borderStyle="round" borderColor="green" className="full-app">

		<Box className="left-box" width="50%" flexDirection="column">
			<Box className="changed-files" borderStyle="round" borderColor="green" height="50%">

			</Box>
			<Box className="stage-area" borderStyle="round" borderColor="green" height="50%">

			</Box>
		</Box>
		<Box borderStyle="round" borderColor="green" className="left-box" width="50%" margin={-1}>

		</Box>

	</Box>)
};

module.exports = App;
