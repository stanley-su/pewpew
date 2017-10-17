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

	// VARIABLES

	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	const mouse = { x: undefined, y: undefined };
	const base = { x: innerWidth / 2, y: innerHeight };
	const cannon = new Cannon(30, '#fff');
	const projectiles = [];
	const targets = [];
}();