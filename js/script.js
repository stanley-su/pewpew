"use strict";

/* CODE STRUCTURE:
 *
 * GAME: UTILITY FUNCTIONS
 * GAME: GAME FUNCTIONS
 * GAME: VARIABLES
 * GAME: FUNCTION EXECUTION
 *
 */

const GAME = function() {
	// UTILITY FUNCTIONS

	// gets a random integer ranging from min to max
	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// gets 1 or -1
	const getRandomSign = () => Math.random() < 0.5 ? 1 : -1;

	// returns if 2 objects are colliding
	const isColliding = function(x1, y1, r1, x2, y2, r2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) <= (r1 + r2);
	};

	// GAME FUNCTIONS

	// constructor for cannons
	const Cannon = function(length, color) {
		this.length = length;
		this.color = color;
		this.a;
		this.baseX;
		this.baseY;
		this.endX;
		this.endY;
		this.update = function() {
			this.a = Math.atan2(base.y - mouse.y, mouse.x - base.x);
			this.baseX = base.x;
			this.baseY = base.y;
			this.endX = base.x + this.length * Math.cos(this.a);
			this.endY =	base.y - this.length * Math.sin(this.a);
			this.draw();
		};
		this.draw = function() {
			c.beginPath();
			c.moveTo(this.baseX, this.baseY);
			c.lineTo(this.endX, this.endY);
			c.lineWidth = 10;
			c.strokeStyle = this.color;
			c.stroke();
			c.beginPath();
			c.arc(this.baseX, this.baseY, 20, 0, Math.PI * 2);
			c.fill();
		};
	};

	// constructor for projectiles
	const Projectile = function(x, y, v, a, r, color) {
		this.x = x;
		this.y = y;
		this.v = v;
		this.a = a;
		this.r = r;
		this.color = color;
		this.update = function() {
			this.x += this.v * Math.cos(this.a);
			this.y -= this.v * Math.sin(this.a);
			this.draw();
		};
		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			c.fillStyle = this.color;
			c.fill();
		};
	};

	// constructor for targets
	const Target = function(x, y, v, r, color) {
		this.x = x;
		this.y = y;
		this.v = v;
		this.r = r;
		this.color = color;
		this.update = function() {
			this.x += this.v;
			this.draw();
		};
		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			c.fillStyle = this.color;
			c.fill();
		};
	};

	// spawns a projectile
	const spawnProjectile = function() {
		let x = cannon.endX;
		let y = cannon.endY;
		let v = 20;
		let a = Math.atan2(base.y - mouse.y, mouse.x - base.x);
		let r = 10;
		let color = '#fff';
		projectiles.push(new Projectile(x, y, v, a, r, color));
	};

	// spawns a target
	const spawnTarget = function() {
		let v = getRandomInt(1, 10) * getRandomSign();
		let r = getRandomInt(5, 10);
		let color = '#fff';
		let y = 100;
		// if positive, place target at left side of screen, else the opposite
		let x = (v > 0 ? -100 : canvas.width + 100);
		targets.push(new Target(x, y, v, r, color));
	};

	const resize = function() {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		base.x = canvas.width / 2;
		base.y = canvas.height;
	};

	const init = function() {
		resize();
		// add event listeners
		window.addEventListener('resize', resize);
		canvas.addEventListener('mousemove', function(e) {
			mouse.x = e.x;
			mouse.y = e.y;
		});
		window.addEventListener('keydown', function(e) {
			if (e.which === 32) {
				spawnProjectile();
			}
		});
		// spawn targets
		for (let i = 0; i < 100; ++i) {
			spawnTarget();
		}
	};

	const animate = function() {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);
		projectiles.map((projectile, i, arr) => {
			projectile.update();
		});
		targets.map(target => {
			target.update()
			// if target moves outside the screen
			if (target.v > 0 && target.x > canvas.width) {
				target.x = -200;
			} else if (target.v < 0 && target.x < 0) {
				target.x = canvas.width + 200;
			}
		});
		cannon.update();
	};

	// VARIABLES

	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	const mouse = { x: undefined, y: undefined };
	const base = { x: innerWidth / 2, y: innerHeight };
	const cannon = new Cannon(30, '#fff');
	const projectiles = [];
	const targets = [];
}();