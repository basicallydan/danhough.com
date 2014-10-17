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