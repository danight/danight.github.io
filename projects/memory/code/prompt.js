(function() {
	function Prompt(options) {
		this.playField = options.playField;
		this.menu = options.menu;
		this.elems = this.menu.children[1].elements;

		this.isRun = true;
		this.isClearingClasses = false;

		this.initHandler();		
		this.runMenu();
	};

	Prompt.prototype.elemsParse = function() {
		let self = this; 
		this.settings = {
			playField: self.playField,
			players: [{
				avatar: './avatars/captain-america.png',
				color: '#ff8f8f',
				total: 0
			}, {
				avatar: './avatars/iron-man.png',
				color: '#b9b9ff',
				total: 0
			}]
		};

		this.requiredElems = [];
		let inx = 0;

		Array.prototype.forEach.call(this.elems, function(elem) {
			let lowerTag = elem.tagName.toLowerCase(); 
			
			if(lowerTag == 'fieldset' || elem.type == 'submit') return;
			
			if(lowerTag == 'input') {	
				if(elem.type == 'checkbox') {
					if(elem.checked) this.settings.mode = 'bot';
					else this.settings.mode = 'player';
				}
				if(elem.type == 'text') {
					if(elem.value == '') {
						this.requiredElems.push(elem);
					} else {
						this.settings.players[inx].nick = elem.value;
					}

					++inx;
				}	
			} else  {
				if(elem.name == 'dimension') this.settings.size = elem.value;
				if(elem.name == 'subjects')  this.settings.subjects = elem.value;
			}

		}, this);
	};

	Prompt.prototype.onClick = function(e) {
		if(!this.isRun) return;
		this.elemsParse();	

		if(e.target.dataset.action == 'playAgain') {
			this.begin('previous');
		} else if(e.target.dataset.action == 'menu') {
			this.runMenu();
		}
	};
	
	Prompt.prototype.onInput = function(e) {
		if(!this.isRun) return;
		
		let target = e.target;
		
		if(target.value.length > 15) {
			target.value = target.value.slice(0, 15);
		}

		if(this.requiredElems.indexOf(target) != -1) {
			if(target.value <= 0) {
				target.nextElementSibling
					.classList.add('tooltip_show');
			} else {
				target.nextElementSibling
					.classList.remove('tooltip_show');
			}
		}
	};
	
	Prompt.prototype.alignment = function(tooltip, elem, dir) {
		let left;
		if(!dir || dir == 'right') {
			left = Jtool.getCoords(elem).left -
				   Jtool.getCoords(elem.form.parentNode).left + 
				   elem.offsetWidth + 12;
		} else {
			left = Jtool.getCoords(elem).left - 
				   Jtool.getCoords(elem.form.parentNode).left - 
				   tooltip.offsetWidth - 5;
		}

		tooltip.style.left = left + 'px';
		tooltip.style.top = Jtool.getCoords(elem).top -
							Jtool.getCoords(elem.form.parentNode).top +
							(elem.offsetHeight - tooltip.offsetHeight) / 2 + 'px';
	};

	Prompt.prototype.addTooltip = function() {
		this.requiredElems.forEach(function(elem) {
			let nextSibl = elem.nextElementSibling;
			if(nextSibl) {
				if(nextSibl.classList.contains('tooltip')) {
					
					if(!nextSibl.classList.contains('tooltip_show')) {
						nextSibl.classList.add('tooltip_show');
					}
					return;
				}
			}


			let tooltip = elem.parentNode.insertBefore(
				Jtool.createElem('div', 'tooltip'), elem.nextSibling);
				tooltip.innerHTML = elem.dataset.required;

			this.alignment(tooltip, elem, 'right');
			tooltip.classList.add('tooltip_show');

		}, this);
	};

	Prompt.prototype.removeTooltip = function() {
		let tooltips = document.body.querySelectorAll('.tooltip');
		if(!tooltips) return;

		Array.prototype.forEach.call(tooltips, function(tooltip) {
			setTimeout(function() {
				tooltip.parentNode.removeChild(tooltip);
			}, 400);

			tooltip.classList.remove('tooltip_show');

		}, this);

	};

	Prompt.prototype.onSubmit = function(e) {
		if(this.requiredElems.length) {
			this.addTooltip();
		} else {
			this.begin('new');
		}

		e.preventDefault();
	};

	Prompt.prototype.initHandler = function() {
		document.addEventListener('click', this.onClick.bind(this));
		document.addEventListener('input', this.onInput.bind(this));
		document.addEventListener('submit', this.onSubmit.bind(this));
	};

	Prompt.prototype.clearClasses = function() {
		if(this.isClearingClasses) return;

		if(this.fstPlayer) {
			this.fstPlayer.style.transition = 
			this.scnPlayer.style.transition = 'top .4s ease-out';

			this.fstPlayer.classList.remove('statistic__fstPlayer_gamesEnd');
			this.scnPlayer.classList.remove('statistic__scnPlayer_gamesEnd');		
			this.fstAmount.classList.remove('amount__item_counting');
			this.scnAmount.classList.remove('amount__item_counting');
			this.scnPlayer.classList.remove('statistic__scnPlayer_winner');
			this.fstPlayer.classList.remove('statistic__fstPlayer_loser');	
			this.fstPlayer.classList.remove('statistic__fstPlayer_winner');
			this.scnPlayer.classList.remove('statistic__scnPlayer_loser');	
			this.fstPlayer.classList.remove('statistic__fstPlayer_dead-heat');
			this.scnPlayer.classList.remove('statistic__scnPlayer_dead-heat');
	
			document.body.classList.remove('page_bg-color');
			
			this.fstPlayer.style.top = this.scnPlayer.style.top = '';
			
			this.fstAmount.previousElementSibling.style.width = 
			this.scnAmount.previousElementSibling.style.width = '';
			
			this.fstAmount.parentNode.removeChild(this.fstAmount);
			this.scnAmount.parentNode.removeChild(this.scnAmount);			
			

			let self = this;
			setTimeout(function() {
				self.fstPlayer.style.transition = 
				self.scnPlayer.style.transition = 
				self.afterGameItems[0].style.transition = 
				self.afterGameItems[1].style.transition = '';
			}, 400);

			this.afterGameItems[0].style.transition = 
			this.afterGameItems[1].style.transition = 'transform .4s ease-out';				

			this.afterGameItems[0].classList.remove('after-game__item_show');
			this.afterGameItems[1].classList.remove('after-game__item_show');
			
			this.isClearingClasses = !this.isClearingClasses;
		}
	};

	Prompt.prototype.begin = function(status) {			
		this.clearClasses();
		this.isRun = false;

		this.removeTooltip();

		if(status == 'new') {
			this.menu.classList.remove('main-menu_show');
			new Desk(this.settings);
		}
	
		if(status == 'previous') {
			new Desk(this.previousSettings);
		}
	};

	Prompt.prototype.end = function(fstPlayer, scnPlayer, fstAmount, scnAmount, settings) {
		this.fstPlayer = fstPlayer;
		this.scnPlayer = scnPlayer;
		this.fstAmount = fstAmount;
		this.scnAmount = scnAmount;
		this.previousSettings = settings;
		
		this.afterGameItems = this.playField
			.querySelectorAll('.after-game__item');

		this.afterGameItems[0].classList.add('after-game__item_show');
		this.afterGameItems[1].classList.add('after-game__item_show');
		
		this.isRun = true;
		
		this.isClearingClasses = false;
	};

	Prompt.prototype.runMenu = function() {
		this.clearClasses();
		this.menu.classList.add('main-menu_show');	
	};

	window.Prompt = Prompt;
})();