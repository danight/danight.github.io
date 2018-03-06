(function() {
	window.onload = function() {
		let wrapBackground = document.getElementById('interface');
		let sound = new Sound(document.body);

		window.wrapBackground = wrapBackground;
		window.sound = sound;
	}
})();