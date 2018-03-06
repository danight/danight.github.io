(function() {
let arrowCodes = {37: 'left', 38: 'top', 39: 'right', 40: 'bottom'};

function Interface(options) {
	this.elem = options.elem;
	
	this.space = options.space;

	this.display = options.display;
	this.scale = options.scale;

	this.total = this.elem.querySelector('.total');
	this.timing = this.elem.querySelector('.timing')
		.children;
	this.time = new Date(0, 0, 0);

	this.volume = this.elem.querySelector('.volume');
	this.timerId = null;

	this.speed = 140;
	this.point = 5;
	this.currentLevel = 0;
	this.isWait = false;
	this.statistic = {};

	this.directions = this.catchKeys(arrowCodes);
	this.enable(this.currentLevel);
};

Interface.prototype.prompt = function() {
	
};

Interface.prototype.catchKeys = function(codes) {
	let pressed = Object.create(null);
	let self = this;

	function handler(e) {
		let char = String.fromCharCode(e.keyCode);
		
		if(e.type == 'keydown') {
			if(char == 'M') self.statusVolume();
			if(char == 'P') self.wait();
		}

		if(e.keyCode in codes) {
			let down = e.type == 'keydown';
			pressed[ codes[e.keyCode] ] = down;
		}

		e.preventDefault();
	}

	document.addEventListener('keydown', handler);
	document.addEventListener('keyup', handler);
		
	return pressed;
};

Interface.prototype.setTotal = function(point) {	
	this.total.children[1].textContent = point + '/' + this.point;
};

Interface.prototype.statusVolume = function() {
	let status = sound.mute();
	if(status) {
		this.volume.classList.add('interface__volume_mute');
	} else this.volume.classList.remove('interface__volume_mute');
};
	
function addZero(val) {
	if(val < 10) val = '0' + val;
	return val;
}

Interface.prototype.addTime = function(hh, mm, ss) {
 	this.timing[0].textContent = addZero(hh) + ':';
	this.timing[1].textContent = addZero(mm) + ':';
	this.timing[2].textContent = addZero(ss);
};

Interface.prototype.removeTime = function() {
 	this.timing[0].textContent = '00:';
	this.timing[1].textContent = '00:';
	this.timing[2].textContent = '00';
};

Interface.prototype.renderTiming = function() {
	this.time.setSeconds( this.time.getSeconds() + 1 );

	let hh = this.time.getHours(),
		mm = this.time.getMinutes(),
		ss = this.time.getSeconds();

	this.addTime(hh, mm, ss);
};

Interface.prototype.startTiming = function() {
	if(this.timerId) return;
	let self = this;

	this.timerId = setInterval(function() {
		self.renderTiming();
	}, 1000);

};

Interface.prototype.stopTiming = function() {
	clearInterval(this.timerId);
	this.timerId = null;
};

Interface.prototype.render = function(space, display, andThen) {
	let prevTime = null;
	let self = this;

	function animation(time) {
		if(prevTime != null) {
			if(time - prevTime > self.speed) {			
				if(!self.isWait) {
					space.updateOffset(self.directions);
					display.updateFrame();		
				
					self.setTotal(space.currentPoint);
					self.startTiming();

					if(space.status != null) {
 						display.clear();
						self.stopTiming();
						self.removeTime();
						self.time = new Date(0, 0, 0);

						andThen(space.status);
					}
				
					prevTime = time;
				} else self.stopTiming(); 
			} 

		} else prevTime = time;
		
		requestAnimationFrame(animation);
	}

	requestAnimationFrame(animation);
};

Interface.prototype.enable = function() {
	let self = this;

	function startLevel(n) {
		let space = new self.space(LEVELS_MAP[n], self.scale, self.point);
		let display = new self.display(self.elem, space, self.scale);
		
		self.render(space, display, function(status) {
			if(status == 'lost') {
			startLevel(n);
			} else if(status == 'win' && 
				n != LEVELS_MAP.length - 1) {
				self.point += 5;
				self.speed -= 10;
				startLevel(n + 1);
			} else {
				document.write('Game over:)');
			}
		});

	}

	startLevel(this.currentLevel);
};

Interface.prototype.wait = function() {
	this.isWait = !this.isWait;
};

	window.Interface = Interface;
})(); 	















