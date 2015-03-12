var typed = false;
var typeHandler = function() {
	var segmentData = {
		location: 'Blog Post: ' + document.title
	};
	var eventName = 'Typed into email subscription';
	$('#mc-embedded-subscribe-form .email').unbind('keydown', typeHandler);
};
$('#mc-embedded-subscribe-form .email').bind('keydown', typeHandler);

var submitHandler = function() {
	var segmentData = {
		location: 'Blog Post: ' + document.title
	};
	var eventName = 'Submitted email subscription';
	$('#mc-embedded-subscribe-form').unbind('click', submitHandler);
};

$('#mc-embedded-subscribe-form').bind('submit', submitHandler);

$(document).on('ready', function() {
	var winHeight = $(window).height();
	var docHeight = $(document).height();
	var progressBar = $('progress');
	var max, value;

	/* Set the max scrollable area */
	max = docHeight - winHeight;
	progressBar.attr('max', max);

	$(document).on('scroll', function() {
		value = $(window).scrollTop();
		progressBar.attr('value', value);
	});
});