"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { Text, Box, Spacer, Newline } = require("ink");
const statusOutput = require("./testChildProcess");

const App = () => {
	const [status, setStatus] = useState("");

	useEffect(() => {
		setStatus(statusOutput());
	}, []);

	return (
		<Box
			borderStyle="classic"
			borderColor="green"
			className="full-app"
			height="100%"
		>
			<Box
				borderStyle="round"
				borderColor="red"
				className="left-box"
				width="50%"
				flexDirection="column"
			>
				<Box
					className="changed-files"
					borderStyle="round"
					borderColor="white"
					height="100%"
				>
					<Box height="100%" alignItems="center">
						<Text>
							<Text color="red" bold underline>
								Modified files:
							</Text>
							<Newline />
							{status}
						</Text>
					</Box>
				</Box>
				<Box
					className="stage-area"
					borderStyle="round"
					borderColor="white"
					height="100%"
				>
					<Text>Staged-Area</Text>
				</Box>
			</Box>
			<Box
				className="gitBranch"
				borderStyle="round"
				borderColor="red"
				className="left-box"
				width="50%"
			>
				<Text>Git Branch</Text>
			</Box>
		</Box>
	);
	//hi
};

module.exports = App;
