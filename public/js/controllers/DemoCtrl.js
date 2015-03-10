angular.module('DemoCtrl', []).controller('DemoController', ['$document', function ($document) {
	'use strict';

	$document.ready(function () {
		// Get a reference to the canvas object
		var canvas = $('#demoCanvas')[0];

		// Create an empty project and a view for the canvas:
		paper.setup(canvas);

		var outline = new paper.Path.Rectangle({
			x: 0,
			y: 0,
			width: 10,
			height: 10
		});
		outline.style = {
			fillColor: 'green',
		};

		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j <= 8; j++) {
				var rect = new paper.Path.Rectangle({
					x: i,
					y: j,
					width: 1,
					height: 1
				});
				if ((i + j) % 2 === 1)
					rect.style = {
						fillColor: 'black',
						strokeColor: null
					};
				else
					rect.style = {
						fillColor: 'white',
						strokeColor: null
					};
			}
		}

		var token = new paper.Path.Circle({
			center: [1.5, 1.5],
			radius: 0.4
		});
		token.style = {
			fillColor: 'red'
		};

		token.onMouseDrag = function (event) {
			var delta = Math.min(paper.view.bounds.width, paper.view.bounds.height) / 10;

			var x = Math.round((event.point.x - this.position.x) / delta) * delta + this.position.x;
			var y = Math.round((event.point.y - this.position.y) / delta) * delta + this.position.y;
			this.position = {
				x: x,
				y: y
			};
		};

		paper.view.onResize = function () {
			paper.project.activeLayer.fitBounds(paper.view.bounds, false);
		};
		paper.view.onResize();

		// Draw the view now:
		paper.view.draw();
	});

}]);
