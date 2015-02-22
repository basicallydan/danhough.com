---
published: true
layout: post
title: How to keep scroll position between views in Backbone
date_created: 29 January 2015
location: London, UK
comments: true
---

In the world of modern web applications it's common to feature "List Views" or "Table Views", which list to the user a bunch of things like To Do items, or Tweets, or Movies, or whatever it is that the application is a manager for. When you click one item, you're taken to the next screen where you see some more detail about it.

With a lot of item, there's nothing more frustrating to the user than clicking through, reading the detail, then going back to list to continue scrolling and finding they've been put back at the top.

<!-- Put a GIF here showing what happens when you scroll and then go to the  -->

This usually happens if the application does **not** manage state between views.

<img src="/img/keep-scroll-position.gif" class="float-right small-iphone-image">

## The Wrong Way: No View State

1. `Render list view`
2. User scrolls down for like 5 minutes, covering loads of content
3. User clicks item they're interested in
4. `Create & render new item detail view`
5. `Destroy list view instance`
6. User reads, clicks back
7. `Create & render new list view`
8. User closes app in frustration
9. `App cries itself to sleep` :sob:

The right way is surprisingly simple. The abstract solution, which I'll explain first, can be applied to any application where this a problem. Then, I'll go into the specific Backbone solution.

## The Right Way: View State

1. `Render list view`
2. User scrolls down for like 5 minutes, covering loads of content
	* `At each movement (big or small), store their current position in a static, i.e. not-attached-to-the-view-instance, property or variable`
3. User clicks item they're interested in
4. `Create & render new item detail view`
5. `Destroy list view instance`
6. User reads, clicks back
7. `Create & render new list view`
	* `Retrieve the stored position from the static property or variable, and make the view scroll to that position`
8. User continues scrolling, being sucked into the ever-expanding list of items appearing at the bottom of their list
9. `App happily continues doing its job` :relaxed:

Much better. Now let's look at how to do this using Backbone.

## Do it in Backbone

I'm gonna use a bit of jQuery here for some things like rendering, but for scroll position related stuff I'll show you the vanilla JS way, too.

~~~javascript
/* FirstView.js */
App.FirstView = Backbone.View.extend({
	render: function () {
		var listHTML = $('<ul></ul>');
		var i;
		// For this example the first view needs to be long enough to scroll
		for (i = 1; i <= 40; i++) {
			listHTML.append('<li><a href="#second">View 1, Item number ' + i + '</a></li>');
		}
		this.$el.html(listHTML);
		return this;
	}
});

/* Create something to store the view state in, statically attached to the View constructor itself, rather than an instance. The default scroll position should be 0, and remember this'll only be set *once*, when this file first loads. */
App.FirstView.viewState = new Backbone.Model();
App.FirstView.viewState.set('scrollPosition', 0);
~~~

You don't need to see SecondView.js as it just renders some HTML, but if you want to it's on GitHub.

Next is our "main" file, which for the purposes of brevity I'm just gonna stick the router in, too.

~~~javascript
App.Router = Backbone.Router.extend({
	routes: {
		"first": "first",
		"second": "second",
	},

	first: function() {
		var firstView = new App.FirstView();
		/* After rendering and inserting the view into the DOM, set the scroll position immediately. */
		$('body')
			.html(firstView.render().$el)
			.scrollTop(App.FirstView.viewState.get('scrollPosition'));
		/* By assigning the constructor of FirstView to a property accessible elsewhere we can modify its view state */
		App.currentView = App.FirstView;
	},

	second: function() {
		var secondView = new App.SecondView();
		$('body').html(secondView.render().$el);
		App.currentView = App.SecondView;
	}
});

/* This way we needn't worry about binding/unbinding from scroll for many different views */
$(document).on('scroll', function () {
	/* Not all views will be interested in maintaining scroll position, so we need to check them first. */
	if (App.currentView.viewState && typeof(App.currentView.viewState.get('scrollPosition')) !== 'undefined') {
		App.currentView.viewState.set('scrollPosition', document.body.scrollTop);
		// or
		// App.currentView.viewState.set('scrollPosition', $(document).scrollTop());
	}
});

App.router = new App.Router();

Backbone.history.start();

App.router.navigate("first", {
	trigger: true
});
~~~

This all works by assigning a new Backbone Model to the constructor of whatever view that you'd like to maintain scroll position for. In our case it's `FirstView`. Then, I attach a scroll event callback to the body and set the scroll position for the "current" view, as long as it already has a scroll position.

Then, whenever the view which *does* have a maintained scroll position is rendered, the `body` is scrolled down to that position.

## Some things to consider

1. In this approach, we're binding constantly to body. If you are concerned about having too many event bindings then you might consider binding to scroll position in an extended `delegateEvents` function and then unbinding in `undelegateEvents` on a view-by-view basis.
2. You might prefer to create a class of view which maintains scroll position and just extend from that with whatever views with which you need to do so, but my example is closer to composition than inheritance for the purpose of explicity. Using `.extends` would be an easy way to make your code more [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
3. Some views may not be scrolling directly on `body`, but on some other DOM element like a `div` - make sure you take this into consideration. This is a good reason for letting views manage their own scroll position without help from the index/router sections of the app.

## Conclusion

There you go! That's an abstract example of how I've done it in a couple of instances. If you hadn't done this before, it probably seems terribly simple now :smile:

Maybe you know of a better way to do it, or have some improvements to my solution? Feel free to leave a comment below. Thanks for reading!