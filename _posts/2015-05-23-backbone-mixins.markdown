---
published: true
layout: post
title: Using mixins to create classes in Backbone
date_created: 23 May 2015
location: London, UK
comments: true
description: Mixins - what are they, why are they useful, and how can we use them?
redirect_from:
  - /blog/backbone-composition/
---

Inheritance is a concept that most software engineers are familiar with: Given a class or object, another object can "inherit" the properties of that class or object and extend them somehow. While this is usually associated with Object-Oriented Programming it's also a feature of JavaScript's prototype system.

In [Backbone](https://backbonejs.org), we tend to follow an OOP-like pattern. A common thing to see in Backbone projects is a View which defines some functions and/or properties which are needed for all or most of the Views in the project. This is all thanks to our good friend the [`extend()` function](http://backbonejs.org/#View-extend).

Before I get onto my point, let's look at a contrived example.

Say there are four types of views, all of which display a list of items.

One view is static, and simply displays the list in whatever order the model currently specifies. The second is like the static one but is also sortable; the user can drag items to change their order. The third is one to which you can add items. Finally, there's one which you can both sort *and* add to. Here's an **inheritance**-based solution. The only feature they *all* share is that they render a list.

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

var AddableSortableListView = SortableListView.extend({
	addToList: function () { /* add items (same as above) */ }
});
```

This works fine until `AddableListView` starts getting more functionality which isn't shared with `AddableSortableListView`. So, we have to re-write the functions or change the inheritance chain with potentially unexpected consequences.

As the application becomes more complex, inheritance becomes more restrictive. At [Marvel](http://marvelapp.com), for instance, there are multiple lists displaying the same data, but they perform different functions depending on their context. One of the lists allows selecting of individual items; two of them allow multi-select. One supports deleting them and another has a item-resizing feature.

There are many different features here, with a few common overlapping themes, forming a complex venn diagram which isn't as simple as the layer-cake analogy you can apply to inheritance. If inheritance alone was used, many views would end up with features--and possible side-effects--that they don't need.

## How to create Backbone objects using mixins

An alternative, as you might have guessed, is to use **mixins**. With mixins, classes or objects declare which functions or features they need from other classes or objects, rather than grabbing all the features of a superclass.

What we're doing when we created mixed-in classes is in fact creating classes with "Do" some things, rather than classes which "Are" something. For many situations, even in the front-end, mixins are a clearer way of expressing what an object is used for.

You may notice that this shares some traits with the use of Interfaces in some typed languages, except that rather than just declaring functions, we're implementing them too. An example should help to explain how this works in Backbone.

```javascript
// Naming these objects <feature>Interface implies their purpose
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
	.extend(SortableListViewInterface);

var AddableListView = Backbone.View
	.extend(RenderableListViewInterface)
	.extend(AddableListViewInterface);

var AddableSortableListView = Backbone.View
	.extend(RenderableListViewInterface)
	.extend(AddableListViewInterface)
	.extend(SortableListViewInterface);
```

Now when `AddableListView` or `SortableListView` want new features, they simply are extended further. If any of those features overlap, we create a new "interface" object and extend it as part of the `.extend()` chains we already have.

<blockquote class="large center"><span markdown="1">For many situations, even in the front-end, mixins are a clearer way of expressing what an object is used for.</span></blockquote>

For example, maybe the list items should be editable in the `AddableListView`, but also in a special, new `EditableListView`. Simply make a new interface, and add `.extend(EditableListViewInterface)` to `AddableListView` and the new `EditableListView` object.

One of the less-JavaScript-specific benefit of mixins, I find, is that trying to represent models of objects mentally is a lot easier. Rather than trying to think of the properties of each of the "ancestors" of a class, one need only think of the properties that the current class **directly** owns.

## Drawbacks

As usual, the method I'm promoting isn't without its own problems. It means potentially massive extension chains which go for lines, which some people find annoyingly abstract. However, I think that this improves upon the massive inheritance chains which quickly become difficult to debug.

Mixing in objects in this way can also be dangerous when two interfaces/objects implement methods of the same name, without this necessarily being known by the developer.

The biggest drawback however is that when using mixins, an interface's dependencies must be implemented fully, and are not necessarily given for free. For instance, a `sortItems` function may assume that there's a `swapItems` function available. It's up to you to make sure that functional dependencies are resolved properly. I find that in practice this is rarely a problem, especially when you use mixins from the start.

## Other ways to do this

You may be thinking that this problem can be solved by defining some common global functions and then using them as part of a single `.extend()` call on a view's definition. Well, you'd be right. But in my opinion, using the method outlined above is much more descriptive and better encapsulates the feature-driven approach which using mixins favours.

You can group functions together into these interfaces and say, "this view has this feature" rather than having to define a group of disjointed but ultimately interdependent functions and making sure you extend them all.

Another way is to borrow other views' functions by taking them from the prototype. For example, `AddableSortableListView` could be made up of `AddableListView.prototype.addToList` and `SortableListView.prototype.sortList`. This would work, and would be a fairly quick solution, but it comes with its own problems.

First, it relies far too heavily on the assumption that other objects know how their functions are being used. By having `sortList` being directly part of `SortableListView` it would appear at first glance that this is a function which is only used by this class. If it gets modified in a way which should only *affect* that class, the fact that other classes are using it can cause some unexpected side-effects.

This also isn't as representative of the truth. The more software can explain itself to the reader, the easier it becomes to modify and maintain: if a function from one view is being used in another, don't you think a naïve reader would be confused?

# What to do next

If this concept is new to you, I highly recommend trying it. You may find yourself thinking more flexibly, and you may find constructing object types much easier than before.

If you disagree, please feel free to tell me so, and why. And if you can think of a better way to do this in Backbone, I'm all ears. Thanks for reading!

# Further Reading

* [Mixins](https://en.wikipedia.org/wiki/Mixin) on Wikipedia

Thank you to [Alun](https://twitter.com/4lun), [Jon](https://twitter.com/jonfinerty) and [Brendan](https://twitter.com/oh_moore) for giving this a read and providing feedback. Thank you also to [crescentfresh and burglar_bill on Reddit](http://www.reddit.com/r/javascript/comments/376ld8/composition_not_inheritance_in_backbone/crkhe6s) for pointing out a rather large naming mistake.

**EDIT 25/05/2015 @ 20:06BST:** Accidentally left out the `Interface` part of the objects in the composition example. Sorry!

**EDIT 25/05/2015 @ 20:42BST:** Made a note at the top of my mistaken understanding of the difference between mixins and composition. D'oh!

**EDIT 25/05/2015 @ 21:03BST:** When this post was originally written it was mistakenly called "Composition - not inheritance - in Backbone". Some friendly folks on Reddit pointed out that what I'm describing is a **mixin** pattern and **not** composition. Somewhere along the line, I got composition confused with mixins - I apologise - so I have rewritten parts of the article to use the correct term. The meaning has not changed, only the term being used. Thanks.

Discuss this on [Hacker News](https://news.ycombinator.com/item?id=9600586) if you like.
