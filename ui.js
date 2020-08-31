"use strict";
const React = require("react");

const { useEffect, useState, useRef } = require("react");
const { Text, Box, measureElement, Newline, Spacer } = require("ink");

const Renderer = require("./components/Divider");
const gitBranchCall = require("./currentBranch");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");

const importJsx = require("import-jsx");
const Selector = importJsx("./Selector.js");

const gitStatusPull = require('./actions/gitStatusPull')
const gitStatusProcess = require('./actions/gitStatusProcess')
const gitBranchVisualPull = require('./actions/gitBranchVisualPull')
const gitBranchVisualProcess = require('./actions/gitBranchVisualProcess')

const enterAltScreenCommand = "\x1b[?1049h";
const leaveAltScreenCommand = "\x1b[?1049l";

const exitFullScreen = () => {
	process.stdout.write(leaveAltScreenCommand);
};

const App = () => {
	const [status, setStatus] = useState("");
	const [branch, setBranch] = useState("");
	const [visual, setVisual] = useState("");
	// const [text, setText] = useState('')
	const [appWidth, setWidth] = useState(null);

	const ref = useRef(null);

	useEffect(() => {
		const intervalStatusCheck = setInterval(() => {
			setStatus(gitStatusPull());
			setBranch(gitBranchCall());
			setVisual(gitBranchVisualPull());
			// setText(branchVisualText())
		}, 1000);

		exitFullScreen();
		process.stdout.write(enterAltScreenCommand);
		const { width, height } = measureElement(ref.current);
		setWidth(width);

		return () => {
			clearInterval(intervalStatusCheck);
		};
	}, []);

	const statusProcessed = gitStatusProcess(status)
	const visualProcessed = gitBranchVisualProcess(visual)

	return (
		<Box flexDirection="column">
			<Box justifyContent="center">
				<Gradient name="morning">
					<BigText text="GITGUD" />
				</Gradient>
			</Box>
			<Box
				borderStyle="round"
				borderColor="red"
				className="full-app"
				height={20}
				flexGrow={1}
			>
				<Box
					className="left-box"
					width="50%"
					height="100%"
					flexDirection="column"
					ref={ref}
				// flexGrow={1}
				>
					<Box className="changed-files" height="50%">
						<Box height="100%">
							<Box flexDirection="column" alignItems="flex-start">
								<Text color="red" bold underline>
									Unstaged Changes
								</Text>
								{/* <Newline /> */}
								{/* <Box flexDirection="column" alignItems="flex-start"> */}
									{statusProcessed.unstaged.map(file => <Box alignItems="flex-start" key={file}><Text>{file}</Text></Box>)}
								{/* </Box> */}
							</Box>
						</Box>
					</Box>
					<Text color="red">
						<Newline />
						<Renderer width={appWidth} />
					</Text>

					<Box className="stage-area" height="50%">
						<Box height="100%">
							<Box flexDirection="column" alignItems="flex-start">
								<Text color="red" bold underline>
									Staged Changes
								</Text>
								{/* <Newline /> */}
								{statusProcessed.staged.map(file => <Box alignItems="flex-start" key={file}><Text>{file}</Text></Box>)}
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					className="gitBranch"
					borderStyle="round"
					borderColor="red"
					className="left-box"
					width="65%"
					margin="-1"
					flexDirection="column"
				>
					<Box flexDirection="row">
						<Text color="red" bold underline>
							Git Branch --{">"}
						</Text>
						<Text> {branch}</Text>
						<Spacer />
						<Text>Newest to Oldest </Text>
					</Box>
					<Box flexDirection="row">
						{/* <Text color="green">{visual.astrix}</Text> */}
						<Text color="white" bold>
							{visualProcessed.sorted}
						</Text>
						<Text> </Text>
						{/* <Text color='white'>{text.sorted}</Text>  */}
					</Box>
				</Box>
			</Box>
			<Selector />
		</Box>
	);
};

module.exports = App;
