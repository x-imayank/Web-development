const user = {
	username: "Javascript",
	website: "js.com",

	WelcomeMessage: function () {
		console.log(`${this.username}, this is the username.`);
	}
}

console.log(user.WelcomeMessage())