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
	// VARIABLES

	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	const mouse = { x: undefined, y: undefined };
	const base = { x: innerWidth / 2, y: innerHeight };
	const cannon = new Cannon(30, '#fff');
	const projectiles = [];
	const targets = [];
}();