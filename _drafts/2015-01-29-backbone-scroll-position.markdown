---
published: true
layout: post
title: How to keep the scroll position when going back to a view in a Backbone app
date_created: 29 January 2015
location: London, UK
comments: true
---

In the world of modern web applications it's increasingly common to feature "List Views" or "Table Views", which list to the user a bunch of things like To Do items, or Tweets, or Movies, or whatever it is that the application is a manager for. When you click one item, you're taken to the next screen where you see some more detail about it.

With a lot of item, there's nothing more frustrating to the user than clicking through, reading the detail, then going back to list to continue scrolling and finding they've been put back at the top.

<!-- Put a GIF here showing what happens when you scroll and then go to the  -->

This usually happens if the application manages the views and their state in the **wrong way**.

## The Wrong Way

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

## The Right Way

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

```javascript
/* FirstView.js */
var FirstView = Backbone.View.extend({
	template: 'whatever',
	render: function () {
		this.$el.html(this.template());
	}
});

// Create something to store the view state in, statically attached to the View
// type itself, rather than an instance
FirstView.viewState = new Backbone.Model();
```