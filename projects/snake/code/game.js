(function() {
	function Vector(x, y) {
		this.x = x;
		this.y = y;
	};

	Vector.prototype.plus = function(other) {
		return new Vector(other.x + this.x, other.y + this.y);
	};

	Vector.prototype.times = function(fraction) {
		return new Vector(this.x * fraction, this.y * fraction);
	};

	let actorsChars = {
		'|': Snake,
		'*': Point
	};

	function Space(map, scale, point) {
		this.width = map[0].length;
		this.height = map.length;
		this.grid = [];
		this.actors = [];
		this.scale = scale;
		this.currentPoint = 0;
		this.maxPoint = point;
		
		for(var y = 0; y < this.height; ++y) {
			let line = map[y], gridLine = [];

			for(var x = 0; x < this.width; ++x) {
				let char = line[x], fieldType = null;

				let Actor = actorsChars[char];
				if(Actor) {
					this.actors.push( new Actor( new Vector(x, y) ) );
				} else if(char == '#') {
					fieldType = 'wall';
				}

				gridLine.push(fieldType);
			}

			this.grid.push(gridLine);
		}

		this.status = null;
	};

	Space.prototype.isFinished = function() {
		return this.status != null;
	};

	Space.prototype.updateOffset = function(keys) {
		this.actors.forEach(function(actor) {
			actor.action(keys, this);
		}, this);
	};

	Space.prototype.obstacleAt = function(pos) {
		let elem = Jtool.findELem(pos.x, pos.y, this.scale);

		if(!elem) return;

		if(elem.matches('.point')) {
			return 'point';
		} else if(elem.matches('.wall')) {
			return 'wall';
		} else if(elem.matches('.snake')) {
			return 'snake';
		}
	};

	Space.prototype.playerTouched = function(obstacle, actor) {
		if(obstacle == 'wall' || obstacle == 'snake') {
			this.status = 'lost';
			sound.play('clash');
		} else if(obstacle == 'point') {
			++this.currentPoint;
			actor.newElem = true;
			sound.play(obstacle);

			if(this.currentPoint >= this.maxPoint) {
				this.status = 'win';
			}

			this.actors.filter(function(actor) {
				if(actor.type != 'point') return;
				actor.isWait = false;
				actor.newPlace(this);
			}, this);
		}
	};
	//objects of actors
	//Snake
	function Snake(pos) {
		this.pos = pos;
		this.basePos = new Vector(pos.x, pos.y);
		--this.pos.y;
		this.size = new Vector(1, 1);
		this.pieces = new Array(2);
		this.pieceInx = 0;
		this.isEmpty = true;
		this.newElem = false;
		this.direction = new Vector(0, -1);
		this.lastPressed = 'top';
	};

	Snake.prototype.action = function(keys, space) {
		if(this.direction.x != -1 && this.direction.x != 1) {
			if(keys.left) {
				this.direction = new Vector(-1, 0);
				sound.play('move');
			} else if(keys.right) {
				this.direction = new Vector(1, 0);
				sound.play('move');
			}
		} else {
			if(keys.top) {
				this.direction = new Vector(0, -1);
				sound.play('move');
			} else if(keys.bottom) {
				this.direction = new Vector(0, 1);
				sound.play('move');
			}
		}

		let motion = this.pos.plus(this.direction);
		let obstacle = space.obstacleAt(motion);
		if(obstacle) {
			space.playerTouched(obstacle, this);
		} else {
			this.pos = motion;
		}
	};

	Snake.prototype.type = 'snake';

	//Point
	function Point(pos) {
		this.pos = pos;
		this.size = new Vector(1, 1);
		this.isWait = false;
	};

	Point.prototype.newPlace = function(space) {
		let cX, cY;
		let fieldType = null
		
		do {
			cX = Jtool.random(1, space.width - 1);
			cY = Jtool.random(1, space.height - 1);
			fieldType = Jtool.findELem(cX, cY, space.scale);

			if(!fieldType) continue;

		} while(fieldType.classList.contains('snake') || 
				fieldType.classList.contains('wall'));
		
		this.pos.x = cX;
		this.pos.y = cY;
	};

	Point.prototype.action = function() {};
	Point.prototype.type = 'point';
	//_objects of actors

	function RenderSpace(where, space, scale) {
		this.hint = where.querySelector('.hint');
		this.where = where;
		this.table = where.appendChild( Jtool.createElem('table', 'background') );
		this.space = space;
		this.scale = scale;

		this.drawBackround();
		this.updateFrame();
	};

	RenderSpace.prototype.drawBackround = function() {
		this.table.style.width = this.where.style.width = 
		this.space.width * this.scale + 'px';
		this.hint.style.left = Jtool.getCoords(this.table).right + 'px';
		
		this.space.grid.forEach(function(row) {
			let line = this.table.appendChild( Jtool.createElem('tr', 
				'background__row') );
			line.style.height = this.scale + 'px';

			row.forEach(function(type) {
				line.appendChild( Jtool.createElem('td', 'background__data ' + type) );
			});

		}, this)
	};

	RenderSpace.prototype.offsetAt = function(elem, actor) {
		elem.style.left = actor.pos.x * this.scale + 'px';
		elem.style.top = actor.pos.y * this.scale + 'px';
		elem.style.width = actor.size.x * this.scale + 'px';
		elem.style.height = actor.size.y * this.scale + 'px';
	};

	RenderSpace.prototype.drawActors = function() {
		this.space.actors.forEach(function(actor) {
			if(actor.type == 'snake') {
				if(actor.isEmpty) {
					let part = [];
					for(var count = 0; count < actor.pieces.length; ++count) {
						let piece = this.table.appendChild( Jtool.createElem('div', 
							actor.type) );
						actor.pos.y = ++actor.pos.y;
						this.offsetAt(piece, actor);

						part.unshift(piece);
					}

					actor.pos.y = actor.basePos.y;	
					actor.pieces = part.slice();
					actor.isEmpty = false;
				} else {
					if(actor.newElem) {
						let piece = this.table.appendChild( Jtool.createElem('div', 
							actor.type));
						this.offsetAt(piece, actor);

						actor.pieces.push(piece);		
						actor.newElem = false;

						return;
					}

					actor.pieceInx = actor.pieceInx % actor.pieces.length;
					this.offsetAt(actor.pieces[actor.pieceInx], actor);
					++actor.pieceInx;
				}
			} else {
				if(actor.isWait) {
					//animation
					return;
				}
					
				let point = this.table.querySelector('.point');
				if(point) {
					this.table.removeChild(point);
				}

				point = this.table.appendChild(Jtool.createElem('div', 'point'))
				this.offsetAt(point, actor);
				actor.isWait = true;
			}	
		}, this);
	};

	RenderSpace.prototype.updateFrame = function() {
		this.drawActors();
	};

	RenderSpace.prototype.clear = function() {
		this.table.parentNode.removeChild(this.table)
	};

	new Interface({
		elem: document.getElementById('interface'),
		space: Space,
		display: RenderSpace,
		scale: 25
	});
})(); 