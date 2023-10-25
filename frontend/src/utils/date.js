const date = {
	get _current() {
		return new Date();
	},
	timestamp() {
		return this._current.getTime();
	},
	parseTimeToHuman(data) {
		const date = new Date(data);
		return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
	}
}

export default date;