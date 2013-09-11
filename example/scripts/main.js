(function() {

	window.onload = function() {
		
		var t = Interpol.tween()
					.to(360)
					.duration(4000)
					.ease(Interpol.easing.easeInOutBounce)
					.delay(1000)
					.step(function(val) {
						$('.rotate').css('transform', 'rotate(' + val + 'deg)');
					})
					.complete(function() {
						this.reverse();
					})
					.start();

	};

})();