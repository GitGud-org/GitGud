"use strict";
const React = require("react");

const { useEffect, useState, useRef } = require("react");
const { Text, Box, measureElement, Newline, Spacer } = require("ink");

const Renderer = require("./components/Divider");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");

const importJsx = require("import-jsx");
const Selector = importJsx("./Selector.js");
const Logo = importJsx("./components/Logo")

const gitBranchCall = require("./currentBranch");
const gitStatusPull = require('./actions/gitStatusPull')
const gitStatusProcess = require('./actions/gitStatusProcess')
const gitBranchVisualPull = require('./actions/gitBranchVisualPull')
const gitBranchVisualProcess = require('./actions/gitBranchVisualProcess')

const enterAltScreenCommand = "\x1b[?1049h";
const leaveAltScreenCommand = "\x1b[?1049l";

const {showLogo, defaultColor, accentColor} = require('./styleFile')

const exitFullScreen = () => {
	process.stdout.write(leaveAltScreenCommand);
};

const App = () => {
	const [status, setStatus] = useState("");
	const [branch, setBranch] = useState("");
	const [visual, setVisual] = useState("");
	const [appWidth, setWidth] = useState(null);

	const ref = useRef(null);

	useEffect(() => {
		const intervalStatusCheck = setInterval(() => {
			setStatus(gitStatusPull());
			setBranch(gitBranchCall());
			setVisual(gitBranchVisualPull());
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
			{showLogo && <Logo />}
			<Box
				borderStyle="round"
				borderColor={accentColor}
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
								<Text color={accentColor} bold underline>
									Unstaged Changes
								</Text>
									{statusProcessed.unstaged.map(file => <Box alignItems="flex-start" key={file}><Text color={defaultColor}>{file}</Text></Box>)}
							</Box>
						</Box>
					</Box>
					<Text color={accentColor}>
						<Newline />
						<Renderer width={appWidth} />
					</Text>

					<Box className="stage-area" height="50%">
						<Box height="100%">
							<Box flexDirection="column" alignItems="flex-start">
								<Text color={accentColor} bold underline>
									Staged Changes
								</Text>
								{statusProcessed.staged.map(file => <Box alignItems="flex-start" key={file}><Text color={defaultColor}>{file}</Text></Box>)}
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					className="gitBranch"
					borderStyle="round"
					borderColor={accentColor}
					className="left-box"
					width="65%"
					margin="-1"
					flexDirection="column"
				>
					<Box flexDirection="row">
						<Text color={accentColor} bold underline>
							Git Branch --{">"}
						</Text>
						<Text color={defaultColor}> {branch}</Text>
						<Spacer />
						<Text color={defaultColor}>Newest to Oldest </Text>
					</Box>
					<Box flexDirection="row">
						<Text color={defaultColor} bold>
							{visualProcessed.sorted}
						</Text>
						<Text> </Text>
					</Box>
				</Box>
			</Box>
			<Selector defaultColor={defaultColor} accentColor={accentColor} />
		</Box>
	);
};

module.exports = App;
