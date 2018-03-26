$(function() {
	// Click tabs
	$('.js-click-tab').click(function() {
		var hr = $($(this).closest('.nav').data('hr'));
		var number = $(this).data('tab-number');
		hr.removeClass(function(index, className) {
			return (className.match(/(^|\s)num--\S+/g) || []).join(' ');
		});
		hr.addClass('num--' + number);
	});
	// Click tabs --/

	// browser detection
	$('body').addClass(getBrowser().name.toLowerCase());
	if (isiOS()) {
		$('body').addClass('ios');
	}

	function getBrowser() {
		var ua = navigator.userAgent,
			tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return {
				name: 'IE ',
				version: (tem[1] || '')
			};
		}
		if (M[1] === 'Chrome') {
			tem = ua.match(/\bOPR\/(\d+)/);
			if (tem != null) {
				return {
					name: 'Opera',
					version: tem[1]
				};
			}
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
		if ((tem = ua.match(/version\/(\d+)/i)) != null) {
			M.splice(1, 1, tem[1]);
		}

		return {
			name: M[0],
			version: M[1]
		};
	}

	function isiOS() {
		return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	}
	// browser detection --/

	// smooth scrolling
	$(".js-scroll-to").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 450, function() {
				window.location.hash = hash;
			});
		}
	});
	// smooth scrolling --/

	// open in new window
	$('.js-open-in-new-window').click(function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		window.open(link, 'newwindow', 'width=600,height=400');
	});
	// open in new window --/

	// add visibility to the iframe
	$('.js-load-iframe').each(function() {
		var page = $(this).data('src');
		// $(this).load(page);

	});

	setInterval(function() {
		$('iframe').attr('style', 'display: block !important;');
	}, 10)
	// add visibility to the iframe --/
});