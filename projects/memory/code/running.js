(function() {
	let sound = new Sound({
		'matches': './sound/',
		'nomatches': './sound/',
		'winner': './sound/'
	});

	let prompt = new Prompt({
		playField: document.getElementById('playing-field'),
		menu: document.getElementById('main-menu')
	});

	window.onload = function() {	
		window.prompt = prompt;
		window.sound = sound;
	}
})();