#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');
// const {FullScreen, exitFullScreen} = require('./components/fullscreen')
const ui = importJsx('./ui');
const {FullScreen} = importJsx('./components/fullscreen');

const cli = meow(`
	Usage
	  $ GitGud

	Options
		--name  Your name

	Examples
	  $ GitGud --name=Jane
	  Hello, Jane
`);

render(React.createElement(FullScreen({ui}), cli.flags));
