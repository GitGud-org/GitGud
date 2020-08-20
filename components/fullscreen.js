const { useEffect } = require('react');

const enterAltScreenCommand = '\x1b[?1049h';
const leaveAltScreenCommand = '\x1b[?1049l';

const exitFullScreen = () => {
  process.stdout.write(leaveAltScreenCommand);
};

const FullScreen = ({ children }) => {
  useEffect(() => {
    // destroy alternate screen on unmount
    return exitFullScreen;
  }, []);
  // trigger alternate screen
  process.stdout.write(enterAltScreenCommand);
  return children;
};

module.exports = {
	FullScreen,
	exitFullScreen };

