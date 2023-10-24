
const pokemon = {
	base: "https://pokeapi.co/api/v2",
	retrieve(){
		return fetch(`${this.base}/pokemon?limit=5`).then(response => response.json())
	}
}

export default pokemon