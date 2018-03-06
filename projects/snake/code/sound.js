(function() {
	function Sound(place) {
		this.place = place || document.body;
		this.soundsPath = {
			'clash': './sounds/clash.mp3',
			'point': './sounds/point.mp3',
			'move': './sounds/move.mp3'					
		}
		this.isMute = false;
		this.player = null;
	};	

	Sound.prototype.mute = function() {
		this.isMute = !this.isMute;
		return this.isMute;
	};

	Sound.prototype.removePlayer = function() {
		let self = this;
		setTimeout(function() {
			self.place.querySelector('audio').remove();
		}, 500);
	};

	Sound.prototype.initPlayer = function(actor) {
		this.player = this.place.appendChild( document.createElement('audio') );
		this.player.classList.add('audio');
		this.player.setAttribute('autoplay', '');
		let source = this.player.appendChild( document.createElement('source') );
		source.setAttribute('src', this.soundsPath[actor]);
		source.setAttribute('type', 'audio/mpeg');
	};

	Sound.prototype.play = function(actor) {
		if(this.isMute) return;

		this.initPlayer(actor);
		this.removePlayer();
	};

	window.sound = new Sound;
})();