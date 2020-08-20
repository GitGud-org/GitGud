const React = require('react')
const {render} = require('ink');
const Divider = require('ink-divider');

const Renderer = () => (
	render(<Divider title={'Title'} />)
)

module.exports = Renderer
