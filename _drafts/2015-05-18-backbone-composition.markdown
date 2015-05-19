---
published: true
layout: post
title: Composition - not inheritance - in Backbone
date_created: 18 May 2015
location: London, UK
comments: true
description: The eternal struggle between composition and inheritance is coming to your browser.
---

Inheritance is a concept that most software engineers are familiar with: Given a class or object, another object can "inherit" the properties of that class or object and extend them somehow. While this is usually associated with Object-Oriented Programming it's also a feature of JavaScript's prototype system.

In [Backbone](https://backbonejs.org), we tend to follow an OOP-like pattern, and a common thing to see in Backbone projects is a Model or View which defines some functions and/or properties which are needed for all or most of the Model or Views in the project. This is all thanks to our good friend the [`extend()` function](http://backbonejs.org/#View-extend).

Before get onto my point, let's look at a contrived example.

Say there are a few types of views, all of which display a list of items. One of them is static, and simply displays the list in whatever order the model currently specifies. The second is like the static one but is also sortable, so the user can drag items to change their order. The third is one to which you can add items. Finally, there's one which you can both sort *and* add to. Here's an **inheritance**-based solution. They *all* do only one thing: render the list.

```javascript
var BaseListView = Backbone.View.extend({
	renderList: function () { /* render stuff */ }
});

var SortableListView = BaseListView.extend({
	sortList: function () { /* sort items */ }
});

var AddableListView = BaseListView.extend({
	addToList: function () { /* add items */ }
});

var AddableSortableListView = BaseListView.extend({
	addToList: function () { /* add items (same as above) */ },
	sortList: function () { /* sort items (same as above) */ }
});
```

In a larger application than this, this can become quite complex. At Marvel, for instance, there are multiple lists displaying the same data, but they perform different functions depending on their context. One of the lists allows selecting of individual items; two of them allow multi-select. One supports deleting them and another has a item-resizing feature.

There are many different features here, with a few common overlapping themes, forming a complex venn diagram which isn't as simple as the layer-cake analogy you can apply to inheritance.

An alternative, as you might have guessed, is to use the concept of *composition*. One way to compose classes in typed languages is often through the use of interfaces, but JavaScript has no interfaces. It does, however, allow us to be quite flexible about how we compose objects. An example should help to explain how this works in Backbone.

```javascript
var RenderableListViewInterface = {
	renderList: function () { /* do the thing */ }
};

var SortableListViewInterface = {
	sortList: function () { /* do the other thing */ }
};

var AddableListViewInterface = {
	addToList: function () { /* more things */ }
};

var StaticListView = Backbone.View.extend(RenderableListViewInterface);

var SortableListView = Backbone.View
	.extend(RenderableListViewInterface)
	.extend(SortableListView);

var AddableListView = Backbone.View
	.extend(RenderableListViewInterface)
	.extend(AddableListView);

var AddableSortableListView = Backbone.View
	.extend(RenderableListViewInterface)
	.extend(AddableListView)
	.extend(SortableListView);
```

## Other ways to do this

<!-- EXPAND THIS -->

* Simply extend using reusable, globally-defined functions as part of your main view objects
	* Not quite as obvious what is going on IMO since functions are less representative of a view's role
* Use the prototypes of other objects from which you wish to compose
	* Relies too much on the assumption that other objects know they are being used
	* Far too coupled
	* Does not properly explain what is going on