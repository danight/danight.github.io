(function() {
	function Desk(options) {
		this.options = options;
		this.playField = options.playField;

		this.cards = [];	

		this.scale = {
			6: {width: 150, height: 180, amount: 3},
			8: {width: 130, height: 140, amount: 4}
		};

		this.place = this.playField.querySelector('.desk');
		this.prepare = this.place.parentNode.querySelector('.prepare');
		this.shuffle = this.playField.querySelector('.shuffle');
		this.start = this.playField.querySelector('.start');

		this.size = options.size;
		this.subjects = options.subjects;
		this.players = options.players;
		this.players[0].total = 0;
		this.players[1].total = 0;

		this.createCards();
		this.isFlip = true;

		this.codesRat = [82, 65, 84];
		this.timerCheat = null;
		this.pressed = {};
		
		this.playField.onclick = this.handler.bind(this);
		document.onkeydown = this.onKeyDown.bind(this);
	};

	Desk.prototype.onKeyDown = function(e) {
		
		if(this.timerCheat == null) this.timerCheat = new Date();
		if(new Date() - this.timerCheat > 500) {
			this.pressed = {};
			this.timerCheat = new Date();
		}

		this.pressed[e.keyCode] = true;

		for(var i = 0; i < this.codesRat.length; ++i) {
			if(!this.pressed[this.codesRat[i]]) {
				return;
			}
		}

		this.pressed = {};
		this.cardsCheat();
		
	};

	Desk.prototype.cardsCheat = function() {
		Array.prototype.forEach.call(this.cards, function(card) {
			card.classList.toggle('desk__card_cheat');
		});
	};

	function alignment(elem, left, top) {
		if(left) elem.style.left = (window.innerWidth - elem.clientWidth) / 2 + 'px';
		if(top) elem.style.top = (window.innerHeight - elem.clientHeight) / 2 + 'px';
	}

	Desk.prototype.counting = function(amount, player, ms) {
		let acc = 0, self = this;
		let prevTime = null, stop = null;	
		
		function animation(time) {
			if(prevTime != null) {
				if(time - prevTime >= ms) {
					if(amount.textContent == player.total) {
						stop = true;
					} else {
						acc += 1;
						amount.textContent = acc;
					}

					prevTime = time;
				} 
			} else prevTime = time;

			if(!stop) {
				requestAnimationFrame(animation);
			}
		};

		requestAnimationFrame(animation);
	};

	function prepareAmount(elem) {
		let amount = Jtool.createElem('div', 
			'amount__item_counting');
		amount.textContent = 0;

		return elem.appendChild(amount);
	}

	Desk.prototype.gamesEnd = function() {
		let fstPlayer = this.playField.querySelector('.fstPlayer'),
			scnPlayer = this.playField.querySelector('.scnPlayer');

		document.body.classList.add('page_bg-color');

		fstPlayer.classList.add('statistic__fstPlayer_gamesEnd');
		scnPlayer.classList.add('statistic__scnPlayer_gamesEnd');

		let self = this;

		let fstAmount = prepareAmount(fstPlayer);
		let scnAmount = prepareAmount(scnPlayer);
		
		setTimeout(function() {
			self.counting(fstAmount, self.players[0], 150);
			self.counting(scnAmount, self.players[1], 150);
		}, 1600);

		setTimeout(function() {
			if(self.players[0].total == self.players[1].total) {
				fstPlayer.classList.add('statistic__fstPlayer_dead-heat');
				scnPlayer.classList.add('statistic__scnPlayer_dead-heat');
			}
			if(self.players[0].total > self.players[1].total) {
				fstPlayer.classList.add('statistic__fstPlayer_winner');
				scnPlayer.classList.add('statistic__scnPlayer_loser');	
			}	
			if(self.players[0].total < self.players[1].total) {
				scnPlayer.classList.add('statistic__scnPlayer_winner');
				fstPlayer.classList.add('statistic__fstPlayer_loser');	
			}

			sound.play('winner', 'mp3', 2300);
		}, 2000);

		if(this.place.rows) { this.place.innerHTML = '' };

		prompt.end(fstPlayer, scnPlayer, fstAmount, scnAmount, this.options);
	};

	Desk.prototype.handler = function(e) {		
		if(this.isStarted) {

			if(!this.isFlip) return;

			if(!e.target.classList.contains('desk__card')) return;
			if(e.target == this.prevElem) return;

			e.target.classList.add('desk__card_flip');

			let attr = e.target.dataset.inx;
			if(this.countSelect == 0) this.prevElem = e.target;
			this.players[this.moveNow].attr = attr;
			
			++this.countSelect;

			if(this.countSelect == 2) {
				this.isFlip = false;
				if(this.prevElem.dataset.inx == 
					this.players[this.moveNow].attr) {
					let self = this;
					setTimeout(function() {
						self.matches(e.target);
					}, 400);
				} else {
					this.notMatches(e.target);
				}

				this.countSelect = 0;
			}
		}

		if(this.isPrepare) return;
		if(e.target.dataset.action == 'shuffle') this.toShuffle();
		if(e.target.dataset.action == 'start') this.arrange();
		
		e.preventDefault();
	};

	Desk.prototype.matches = function(lastTarget) {
		this.players[this.moveNow].total += 1;

		let percent = this.players[this.moveNow].total * 
					(100 / this.size);

		if(percent > 100) percent = 100;
		let amount;

 		this.prevElem.classList.add('desk__card_matches');
 		lastTarget.classList.add('desk__card_matches');

		if(this.moveNow == 0) {                                                                  
			amount = this.playField.querySelector('.fstPlayer__amount');	
			this.prevElem.style.left = lastTarget.style.left = 
				-Jtool.getCoords(this.place).left + 28 + 'px';
		} else {
			amount = this.playField.querySelector('.scnPlayer__amount');
			this.prevElem.style.left = lastTarget.style.left = 
				Jtool.getCoords(this.place).right - 
				this.prevElem.clientWidth - 28 + 'px';
		}	

		this.prevElem.style.top = lastTarget.style.top = 
			-Jtool.getCoords(this.place).top + 
			this.prevElem.clientHeight - 40 + 'px';

		amount.style.width = percent + '%';

		let fstCard, scnCard;
		let self = this;

		setTimeout(function() {
			fstCard = self.prevElem.parentNode.removeChild(self.prevElem);
			scnCard = lastTarget.parentNode.removeChild(lastTarget);
			
			self.isFlip = true;
			
			self.cards.splice(self.cards.indexOf(fstCard), 1);
			self.cards.splice(self.cards.indexOf(scnCard), 1);

			if(self.cards.length == 0) self.gamesEnd();
		}, 800);
	};

	Desk.prototype.notMatches = function(lastTarget) {
		let players = this.playField.querySelectorAll('.statistic__item');

		if(this.moveNow == 1) {
			this.moveNow = 0;
			players[0].style.boxShadow = '0 0 7px 1px palegreen';
			players[1].style.boxShadow = '0 0 7px #ddd';
		} else {
			this.moveNow = 1;
			players[1].style.boxShadow = '0 0 7px 1px palegreen';
			players[0].style.boxShadow = '0 0 7px #ddd';
		}
		
		let self = this;
		setTimeout(function() {
			self.prevElem.classList.remove('desk__card_flip');
			self.prevElem = null;
			lastTarget.classList.remove('desk__card_flip');
			self.isFlip = true;
		}, 1200);
	};

	Desk.prototype.arrange = function() {
		let inx = 0;

		Array.prototype.forEach.call(this.place.rows, function(row) {
			
			Array.prototype.forEach.call(row.cells, function(cell) {
				let card = this.cards[inx];

				card.style.left = Jtool.getCoords(cell).left - 
					Jtool.getCoords(this.place).left + 'px';
				card.style.top = Jtool.getCoords(cell).top - 
					Jtool.getCoords(this.place).top + 'px';
				
				card.style.transform = '';
				card.style.borderRadius = '5px';
				
				++inx;
			}, this);

		}, this);
		
		this.isPrepare = this.isStarted = true;
		this.prepare.classList.remove('prepare_show');

		let players = this.playField.querySelector('.statistic');

		Array.prototype.forEach.call(players.children, function(player, inx) {
			player.style.boxShadow = '0 0 7px #ddd';
			player.style.top = '50px'; 

			player.children[0].style.background = 'url(' + this.players[inx].avatar +
				') ' + 'center center / cover no-repeat #fff';
			player.children[1].textContent = this.players[inx].nick;
		}, this);

		this.countSelect = 0;
		this.moveNow = Jtool.random(2);
		let player;

		if(this.moveNow == 0) {
			player = this.playField.querySelector('.statistic__fstPlayer');
		} else {
			player = this.playField.querySelector('.statistic__scnPlayer');
		}

		player.style.boxShadow = '0 0 7px 1px palegreen';
	};

	Desk.prototype.toShuffle = function() {
		for(var i = 0; i < this.cards.length; ++i) {
			let card = this.cards[i];

			card.style.left = Jtool.random(-100, 
				parseInt(this.place.style.width)) + 'px';
			card.style.top = Jtool.random(-50, 
				parseInt(this.place.style.height) - 113) + 'px';
			
			card.style.transform = 'rotate(' + Jtool.random(0, 180) + 'deg)';
		}

		this.cards.sort(function(a, b) {
			return Math.random() - 0.5;
		});

	};

	Desk.prototype.createCards = function() {
		let scale = this.scale[this.size];

		this.place.style.width = scale.width * 4 + 50 + 'px';
		this.place.style.height = scale.height * scale.amount + 50 + 'px';

		alignment(this.place, 'left', 'top');

		let leng = this.size / 2;
		
		for(var row = 0; row < leng; ++row) {
			let tr = this.place.appendChild(Jtool.createElem('tr', 
				'desk__row'));
			for(var cell = 0; cell < 4; ++cell) {
				let td = Jtool.createElem('td', 'desk__data');
				
				td.style.width = scale.width + 'px';
				td.style.height = scale.height + 'px';

				tr.appendChild(td);
			}
		}

		for(var i = 0; i < this.size; ++i) {	
			let card = Jtool.createElem('div', 'card desk__card');
			card.setAttribute('data-inx', '' + i);
			card.style.cssText = 
			    'background-image: url(./cards/' + this.subjects + '/' + 
			    	this.size + '/' + (i + 1) + '.png);' + 
			    'background-size: 100% ' + scale.height * 2 + 'px;' + 
				'width: ' + scale.width + 'px;' +
				'position: absolute;' + 
			    'height: ' + scale.height + 'px;';

			let clone = card.cloneNode(true);
			Jtool.addNode([card, clone], this.place);

			this.cards.push(card, clone);
		}

		this.prepare.classList.add('prepare_show');
		alignment(this.prepare, null, 'top');

		this.toShuffle();
	};	

	window.Desk = Desk;
})();