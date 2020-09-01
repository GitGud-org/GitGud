const React = require('react')
const {Text} = require('ink');

//Divider line for unstaged changes/staged changes
//Instead of having two seperate boxes, the information within both boxes can flow -- therefore a dotted/divider line

const Renderer = (props) => {
	let divider = '-'.repeat(props.width)
	return divider
}

module.exports = Renderer
