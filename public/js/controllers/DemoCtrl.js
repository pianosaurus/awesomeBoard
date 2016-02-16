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

		// Snap token to chess board squares.
		token.onMouseDrag = function (event) {
			this.position = {
				x: Math.max(1.5, Math.min(Math.floor(event.point.x) + 0.5, 8.5)),
				y: Math.max(1.5, Math.min(Math.floor(event.point.y) + 0.5, 8.5))
			};
		};

		// Zoom to fit if the browser window is resized.
		paper.view.onResize = function () {
			var bounds = paper.view.viewSize;
			var zoom = Math.min(bounds.width, bounds.height) / 10;
			paper.view.setZoom(zoom);
			paper.view.setCenter(5, 5);
		};
		paper.view.onResize();

		// Draw the view now:
		paper.view.draw();
	});

}]);
