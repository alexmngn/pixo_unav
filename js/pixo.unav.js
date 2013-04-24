/*
 * jQuery Color Animations 
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 */

(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

/*
 * pixo.unav.js
 * version 1.0
 * 
 * Copyright 2013, Alexis Mangin
 * http://www.pixostudio.net/
 * Github: https://github.com/pixostudio/
 * 
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */

(function ($) {
	
	$.pixo_unav = function(el, options) {
		
		var pixo = this;
		pixo.$el = $(el);
		pixo.el = el;
		
		pixo.global = {
			$selector: null
		};
		
		pixo.init = function() {
			pixo.options = $.extend({}, $.pixo_unav.defaultOptions, options);

			if (!pixo.$el.is('ul')) {
				pixo.$el = pixo.$el.find('> ul');
			}
			
			if (!pixo.$el.hasClass('unav')) {
				pixo.$el.addClass('unav');
			}

			var w = 0;
			pixo.$el.find('> li').each(function() {
				w += $(this).outerWidth(true);
			});
			pixo.$el.width(w+1);

			pixo.global.$selector = $('<li class="unav-selector"></li>');
			pixo.$el.append($('<li class="unav-underline"></li>')).append(pixo.global.$selector);

			pixo.initEvents();
			setTimeout(function() {
				pixo.start();
			}, 300);
		};
		
		pixo.initEvents = function() {
			pixo.$el.find('> li').on('mouseenter', 'a', function() {
				pixo.goto($(this));
			});
			pixo.$el.on('mouseleave', function() {
				pixo.goto(pixo.$el.find('> li.unav-active > a'));
			});
		};
		
		pixo.start = function() {
			var $active = pixo.$el.find('> li.unav-active > a');			
			if ($active.html() == undefined) {
				$active = pixo.$el.find('> li:first-child > a');
			}
			pixo.goto($active);
			$active.parent().addClass('unav-active', 500);
		};
		
		pixo.goto = function($item) {
			pixo.$el.find('> li').removeClass('in', 500);
			$item.parent().addClass('in', 500);

			var animation = {
				left: $item.position().left,
				width: $item.outerWidth()
			};
			
			var color = $item.parent().data('unav-color');
			if (color != null) {
				animation.backgroundColor = color;
			}

			pixo.global.$selector.stop().animate(animation);
		};
		
		pixo.init();
	};
	
	$.pixo_unav.defaultOptions = {
	};
	
	$.fn.pixo_unav = function(options) {
		return this.each(function() {
			(new $.pixo_unav(this, options));
		});
	};
	
})(jQuery);