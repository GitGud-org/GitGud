'use strict';
const React = require('react');
const {useEffect, useState} = require('react');
const {Text, Box, Spacer} = require('ink');
const statusOutput = require('./testChildProcess')
const Renderer = require('./components/divider')

const App = () => {
	const [status, setStatus] = useState('');

	useEffect(() => {
		setStatus(statusOutput())
	}, [])

	return(
	<Box borderStyle="round" borderColor="red" className="full-app" height='100%' >

		<Box className="left-box" width="50%" flexDirection="column">
			<Box className="changed-files" height="50%">
				<Text >Here: {status}</Text>
			</Box>
			<Renderer />
			<Box className="stage-area" height="50%">
				<Text>
					Staged-Area
				</Text>
			</Box>
		</Box>
		<Box className='gitBranch' borderStyle="round" borderColor="red" className="left-box" width="50%" margin="-1">
			<Text>Git Branch</Text>
		</Box>

	</Box>
)};

module.exports = App;
