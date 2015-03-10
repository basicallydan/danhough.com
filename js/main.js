window.analytics = window.analytics || [], window.analytics.methods = ["identify", "group", "track", "page", "pageview", "alias", "ready", "on", "once", "off", "trackLink", "trackForm", "trackClick", "trackSubmit"], window.analytics.factory = function(t) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return a.unshift(t), window.analytics.push(a), window.analytics
	}
};
for (var i = 0; i < window.analytics.methods.length; i++) {
	var key = window.analytics.methods[i];
	window.analytics[key] = window.analytics.factory(key)
}
window.analytics.load = function(t) {
		if (!document.getElementById("analytics-js")) {
			var a = document.createElement("script");
			a.type = "text/javascript", a.id = "analytics-js", a.async = !0, a.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.io/analytics.js/v1/" + t + "/analytics.min.js";
			var n = document.getElementsByTagName("script")[0];
			n.parentNode.insertBefore(a, n)
		}
	}, window.analytics.SNIPPET_VERSION = "2.0.9",
	window.analytics.load("op3yqkz6gp");
window.analytics.page();

// open external links in new window
$(document).ready(function() {
	$("a[href^=http]").each(function() {
		if (this.href.indexOf(location.hostname) == -1) {
			$(this).attr('target', '_blank');
		}
	});

	var renderEmail = function() {
		$(".email-address-placeholder").each(function() {
			var classes = $(this).attr('class');
			classes = classes.replace(/email-address-placeholder/, '');
			$(this).html('<a href="mailto:dan' + '@' + '' + '' + 'danhough.com">dan' + '@' + '' + '' + 'danhough.com</a>').attr('class', classes);
		});

		$(document).unbind('mousemove.email').unbind('keydown.email').unbind('focus.email');
		console.log('Unbound events');
	};

	$(document).bind('mousemove.email', renderEmail).bind('keydown.email', renderEmail).bind('focus.email', renderEmail);

	$('[data-segment]').click(function() {
		var segmentData = $(this).attr('data-segment');
		var eventName;
		if (!segmentData) return true;
		if ($.parseJSON) {
			segmentData = $.parseJSON(segmentData);
			eventName = segmentData.name;
			segmentData.name = undefined;

			analytics.track(eventName, segmentData);
		}
	});

	$(function() {
		var $allVideos = $('.center iframe');

		$allVideos.each(function() {
			$(this).data('aspectRatio', this.height / this.width)
				.removeAttr('height')
				.removeAttr('width');
		});

		$(window).resize(function() {
			$allVideos.each(function() {
				var $el = $(this);
				var newWidth = $el.parent().width();
				$el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
			});
		}).resize();

	});
});