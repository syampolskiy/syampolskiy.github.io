$(function() {
	// Click tabs
	$('.js-click-tab').click(function() {
		var hr = $($(this).closest('.nav').data('hr'));
		var number = $(this).data('tab-number');
		hr.removeClass(function(index, className) {
			return (className.match(/(^|\s)num--\S+/g) || []).join(' ');
		});
		hr.addClass('num--' + number);
	})
	// Click tabs --/

	// browser detection
	$('body').addClass(getBrowser().name.toLowerCase());

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
			tem = ua.match(/\bOPR\/(\d+)/)
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
	// browser detection --/
});