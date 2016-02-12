---
published: true
layout: post
title: The best way to inherit and extend events in Backbone
date_created: 6 August 2014
location: London, UK
comments: true
category: popular
---

My latest client project is a fairly big and complex app, with a lot of small modules for views. In order to keep my code nice and DRY, some good-old-fashioned inheritance has done the trick.

One of these views is a modal view. There are a few modals, which all have an "X" button in the corner to close them, and the behaviour is the same when you click the X. I tried a few solutions that StackOverflow and many other places suggested, eventually settling (for now, at least) on one simple solution that I preferred, for all instances where events need to be inherited from a parent view, and extended to meet further requirements.

Here's how I did it. The child views are just examples

~~~js
// ModalView.js
var ModalView = Backbone.View.extend({
	events: {
		'click .close-button': 'closeButtonClicked'
	},
	closeButtonClicked: function() { /* Whatever */ }
	// Other stuff that the modal does
});

ModalView.extend = function(child) {
	var view = Backbone.View.extend.apply(this, arguments);
	view.prototype.events = _.extend({}, this.prototype.events, child.events);
	return view;
};

// MessageModalView.js
var MessageModalView = ModalView.extend({
	events: {
		'click .share': 'shareButtonClicked'
	},
	shareButtonClicked: function() { /* Whatever */ }
});

// ChatModalView.js
var ChatModalView = ModalView.extend({
	events: {
		'click .send-button': 'sendButtonClicked'
	},
	sendButtonClicked: function() { /* Whatever */ }
});
~~~

There are [other solutions](http://stackoverflow.com/a/9403713/403406) of course, but **this is my favourite**. Why?

1. The child view (and by extension, you) does not need to know anything about the view it is extending to inherit its behaviour.
2. It can be done over and over again, with Views inheriting from views which inherit from Views and so on.
3. Rather than having to write code to inherit events in each child view, you only write the inheritance code once.

But **beware**, this solution comes with some warnings:

* **Don't over-inherit**. This is good advice for inheritance in general. Keep an eye on what behaviours your view is picking up.
* **Be careful what you overwrite**. This is more good advice for inheritance in general. Don't overwrite parent functions accidentally, and remember that in JavaScript, if you're overwriting a function but you still want to call the parent function, you need to do so using `Parent.prototype.theFunction.apply`.

Do you prefer a different solution? What is it, and why?