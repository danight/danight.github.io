(function() {
	function Sound(paths) {
		this.paths = paths;
	};

	Sound.prototype.initPlayer = function(name, type) {
		this.player = document.body.appendChild(
				Jtool.createElem('audio', 'player'));
		
		this.player.setAttribute('autoplay', '');
		
		let source = this.player.appendChild( Jtool.createElem('source') );
		source.setAttribute('src', this.paths[name] + name + '.' + type);
		source.setAttribute('type', 'audio/' + type);
	};

	Sound.prototype.removePlayer = function(ms) {
		let self = this;
		setTimeout(function() {
			self.player.parentNode.removeChild(self.player);
		}, ms);

	};

	Sound.prototype.play = function(name, type, timing) {
		this.initPlayer(name, type);
		this.removePlayer(timing);
	};

	window.Sound = Sound;
})();