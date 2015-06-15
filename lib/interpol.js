(function(factory) {

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(window);
    } else {
        self.Interpol = self.iN = factory(window);
    }

})(function(w) {

	'use strict';

	var _ = {};

	_.fps = 60;

	/*
	 *
	 *	TERMS OF USE - EASING EQUATIONS
	 * 
	 *	Open source under the BSD License. 
	 *
	 *	Copyright © 2001 Robert Penner
	 *	All rights reserved.
	 *
	 *	Redistribution and use in source and binary forms, with or without modification, 
	 *	are permitted provided that the following conditions are met:
	 *
	 *	Redistributions of source code must retain the above copyright notice, this list of 
	 *	conditions and the following disclaimer.
	 *	Redistributions in binary form must reproduce the above copyright notice, this list 
	 *	of conditions and the following disclaimer in the documentation and/or other materials 
	 *	provided with the distribution.
	 *
	 *	Neither the name of the author nor the names of contributors may be used to endorse 
	 *	or promote products derived from this software without specific prior written permission.
	 *
	 *	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
	 *	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 *	MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
	 *	AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
	 *	OF THE POSSIBILITY OF SUCH DAMAGE. 
	 *
	 */

	_.easing = {
		easeNone: function(t, b, c, d) {
			return c * t / d + b;
		},
		easeInQuad: function(t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function(t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function(t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function(t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function(t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function(t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function(t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function(t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function(t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function(t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function(t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function(t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function(t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function(t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function(t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function(t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function(t, b, c, d) {
			return c - this.easeOutBounce (d-t, 0, c, d) + b;
		},
		easeOutBounce: function(t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function (t, b, c, d) {
			if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
			return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	};

	_.rafLast = 0;

	_.requestAnimFrame = (function(){
		return	w.requestAnimationFrame			||
				w.webkitRequestAnimationFrame	||
				w.mozRequestAnimationFrame		||
				function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - _.rafLast));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
					_.rafLast = currTime + timeToCall;
					return id;
				};
	})();

	_.cancelAnimFrame = (function() {
		return	w.cancelAnimationFrame				||
				w.cancelRequestAnimationFrame		||
				w.webkitCancelAnimationFrame		||
				w.webkitCancelRequestAnimationFrame	||
				w.mozCancelAnimationFrame			||
				w.mozCancelRequestAnimationFrame	||
				function(id) {
					clearTimeout(id);
				};
	})();

	_.noop = function() {};
	_.tick = function() {
		var _t = this;
		return function() {
			_t.raf = _.requestAnimFrame.call(w, _.tick.call(_t));
			_t.now = new Date().getTime();
			_t.delta = _t.now - _t.then;
			if (_t.delta > _t.interval) {
				for (var n in _t.pipeline) {
					_t.pipeline[n]();
				}
				_t.then = _t.now - (_t.delta % _t.interval);
			}
		}
	}

	_.FramePipeline = function() {
		var _t = this;
		_t.pipeline = {};
		_t.then = new Date().getTime();
		_t.now = undefined;
		_t.raf = undefined;
		_t.delta = undefined;
		_t.interval = 1000 / _.fps;
	};

	_.FramePipeline.prototype = {
		add : function(name, fn) {
			this.pipeline[name] = fn;
		},
		remove : function(name) {
			delete this.pipeline[name];
		},
		start : function() {
			_.tick.call(this)();
		},
		has : function(name) {
			return name in this.pipeline;
		},
		pause : function() {
			_.cancelAnimFrame.call(w, this.raf);
		},
		setFPS : function(fps) {
			this.interval = 1000 / fps;
		}
	};

	_.pipeline = new _.FramePipeline();
	_.pipeline.start();


	_.TweenController = function() {
		this.q = [];
	};

	_.TweenController.prototype = {
		queue : function() {
			var nt = new _.Tween(this);
			var pt = this.q[this.q.length - 1];
			if (!pt || pt && pt.hasCompleted) {
				nt.canStart = true;
			} else {
				nt.canStart = false;
				pt.then(function() {
					nt.canStart = true;
					nt.start();
				});
			}
			this.q.push(nt);
			return nt;
		}
	}

	_.Tween = function(ctlr) {
		var _t = this;
		_t.name = '$interpol-' + parseInt(Math.random() * new Date().getTime());
		_t.controller = ctlr || new _.TweenController();
		_t.startVal = 0;
		_t.endVal = 0;
		_t.differences = {};
		_t.canStart = true;
		_t.hasStarted = false;
		_t.hasCompleted = false;
		_t.tweenDuration = 400;
		_t.delayDuration = 0;
		_t.isDelayed = false;
		_t.repeatCount = 0;
		_t.paused = false;
		_t.easing = _.easing.easeNone;
		_t.onStep = _.noop;
		_t.onComplete = _.noop;
		_t.onStopped = _.noop
		_t.andThen = _.noop;
	};

	_.Tween.prototype = {
		from : function(val) {
			this.startVal = val;
			return this;
		},
		to : function(val) {
			this.endVal = val;
			return this;
		},
		duration : function(ms) {
			this.tweenDuration = ms;
			return this;
		},
		delay : function(ms) {
			this.delayDuration = ms;
			return this;
		},
		repeat : function(count) {
			this.repeatCount = count;
			return this;
		},
		ease : function(fn) {
			this.easing = fn;
			return this;
		},
		step : function(fn) {
			this.onStep = fn;
			return this;
		},
		complete : function(fn) {
			this.onComplete = fn;
			return this;
		},
		stopped : function(fn) {
			this.onStopped = fn;
			return this;
		},
		then : function(fn) {
			this.andThen = fn;
			return this;
		},
		reverse : function() {
			var sV = this.startVal,
				eV = this.endVal;

			this.startVal = eV;
			this.endVal = sV;
			this.start();
		},
		start : function() {
			var _t = this;
			if (!_t.canStart) return _t;
			if (_t.delayDuration > 0 && !_t.isDelayed) {
				setTimeout(function() {
					_t.start();
				}, _t.delayDuration);
				_t.isDelayed = true;
				return _t;
			}

			var	stepDuration = 1000 / _.fps,
				steps = _t.tweenDuration / stepDuration;

			if (typeof _t.endVal === 'object') {
				if (typeof _t.startVal !== 'object') {
					_t.startVal = {};
				}
				for (var val in _t.endVal) {
					if (!_t.startVal.hasOwnProperty(val)) {
						_t.startVal[val] = 0;
					}
					_t.differences[val] = _t.endVal[val] - _t.startVal[val];
				}
			} else {
				_t.differences['$itp-main'] = _t.endVal - _t.startVal;
			}

			_t.hasStarted = true;
			_t.stpFn = function() {
				if (steps >= 0 && _t.hasStarted) {
					var s = _t.tweenDuration;
					s = s - (steps * stepDuration);
					steps--;
					var vals = _t.differences.hasOwnProperty('$itp-main') ? _t.easing.call(_.easing, s, _t.startVal, _t.differences['$itp-main'], _t.tweenDuration) : {};
					if (typeof vals === 'object') {
						for (var v in _t.differences) {
							vals[v] = _t.easing.call(_.easing, s, _t.startVal[v], _t.differences[v], _t.tweenDuration);
						}
					}
					_t.onStep.call(_t, vals);
				} else if (!_t.hasStarted) {
					_.pipeline.remove(_t.name);
					_t.onStopped.call(_t);
				} else {
					_.pipeline.remove(_t.name);
					_t.hasStarted = false;
					_t.isDelayed = false;
					if (_t.repeatCount > 0 || _t.repeatCount === -1 || _t.repeatCount === Infinity) {
						_t.repeatCount = _t.repeatCount < 0 || _t.repeatCount === Infinity ? _t.repeatCount : _t.repeatCount--;
						_t.onComplete.call(_t, _t.end);
						_t.start();
					} else {
						_t.hasCompleted = true;
						_t.onComplete.call(_t, _t.end);
						_t.andThen.call(_t);
						_t.controller.q.shift();
					}
				}
			};
			_.pipeline.add(_t.name, _t.stpFn);
			return _t;
		},
		stop : function() {
			this.hasStarted = false;
			return this;
		},
		pause : function() {
			_.pipeline.remove(this.name);
			return this;
		},
		play : function() {
			if (_.pipeline.has(this.name)) return;
			_.pipeline.add(this.name, this.stpFn);
			return this;
		},
		queue : function() {
			return this.controller.queue();
		}
	}

	var _iN = function(fps) {
		_.fps = fps;
		_.pipeline.setFPS(_.fps);
		return _iN;
	};

	_iN.easing = _.easing;
	_iN.tween = function() {
		return new _.Tween();
	};
	_iN.queue = function() {
		return new _.TweenController().queue();
	};

	_iN.pipeline = _.pipeline;

	return _iN;

});