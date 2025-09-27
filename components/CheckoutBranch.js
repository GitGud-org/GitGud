const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Box, Text } = require("ink");
const { execSync } = require("child_process");
const AutoComplete = importJsx("./AutoComplete");
const {defaultColor, accentColor} = require('../styleFile')
//Uses git for-each-ref to display all available branches to checkout to
//Also removes the astrix that displays the current branch you are on
	//since it is not necessary here.

const CheckoutBranch = (props) => {
	const [query, setQuery] = useState("");

	let { refreshTab } = props;

	let branches = execSync(
		"git for-each-ref --format=%(refname:short) refs/heads/"
	).toString().split("\n");

	const checkoutBranch = (query) => {
		if (branches.includes(query)) {
			try {
				//checks out to an existing local branch
				execSync(`git checkout ${query}`);
				refreshTab("");
			} catch (error) {}
		} else {
			//creates a new branch if the query isn't already local
			execSync(`git checkout -b ${query}`);
			refreshTab("");
		}
	};
	let holder = ''
		let func = (input) => {
			holder = input
		}
	return (
		<Box flexDirection="column">
			<Box>
				<Text> </Text>
			</Box>
			<Box>
				<Text color={accentColor}> Branches: </Text>
				<Text color={defaultColor}>{branches.join(" | ")}</Text>
			</Box>
			<Box>
				<Box marginRight={1}>
					<Text color={accentColor}> Checkout branch:</Text>
					<AutoComplete valueControl={{val: query, setValue: setQuery}} baseList={branches}  handleSubmit={checkoutBranch} />
				</Box>
			</Box>
			<Box marginLeft={1}>
				<Text color="grey">Press ESC to go back</Text>
			</Box>
		</Box>
	);
};

module.exports = CheckoutBranch;
