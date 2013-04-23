/*
 * jQuery Color Animations 
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 */

(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

/*
 * Pixo Unav
 * Copyright 2013 Alexis Mangin
 * Licensed MIT.
 */

(function ($) {
	
	$.fn.pixo_unav = function() {
		
		var v = {
			nav: null,
			select: null
		};
		
		var methods = {

			init: function() {
				v.nav = this;

				if (!v.nav.is('ul')) {
					v.nav = v.nav.find('> ul');
				}
				v.nav.addClass('unav');
				
				var w = 0;
				v.nav.find('> li').each(function() {
					w += $(this).outerWidth();
				});
				v.nav.width(w+1);

				v.select = $('<li class="unav-selector"></li>');
				v.nav.append($('<li class="unav-underline"></li>')).append(v.select);

				methods.initEvents();
				setTimeout(function() {
					methods.start();
				}, 300);

			},

			initEvents: function() {
				v.nav.find('> li').on('mouseenter', 'a', function() {
					methods.goto($(this));
				});
				v.nav.find('> li').on('mouseleave', 'a', function() {
					methods.goto(v.nav.find('> li.unav-active > a'));
				});
			},

			start: function() {
				var active = v.nav.find('> li.unav-active > a');			
				if (active.html() == undefined) {
					active = v.nav.find('> li:first-child > a');
				}
				methods.goto(active);
				active.parent().addClass('unav-active', 500);
			},

			goto: function(item) {	

				v.nav.find('> li').removeClass('in', 500);
				item.parent().addClass('in', 500);

				var animation = {
					left: item.position().left,
					width: item.outerWidth()
				};
				if (item.parent().data('unav-color') != null) {
					animation.backgroundColor = item.parent().data('unav-color');
				}

				v.select.stop().animate(animation);
			}
		};
		
		methods.init.apply($(this));
	};
	
})(jQuery);