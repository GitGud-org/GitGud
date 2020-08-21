const React = require('react')
const {Text} = require('ink');


const Renderer = (props) => {
	// const {width} = props
	let divider = '-'.repeat(props.width)
	console.log('hello')
	return divider
}

module.exports = Renderer
