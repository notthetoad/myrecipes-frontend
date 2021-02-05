const ServerErrorMessageAlert = (statusCode, setState) => {
	if (statusCode !== 200) {
		setState(true);
		setTimeout(() => {
			setState(false)
		}, 1750);
	}
}

export default ServerErrorMessageAlert;