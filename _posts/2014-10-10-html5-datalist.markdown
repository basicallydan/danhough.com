---
published: true
layout: post
title: Tutorial - Native HTML5 autocomplete with datalist
description: How to make and style a native autocomplete box for your website using HTML5's datalist element
date_created: 10 October 2014
location: London, UK
comments: true
---

I've had the opportunity to play around with some cool new HTML5 stuff recently, and have just finished implementing a browser-native autocomplete using HTML5's new `<datalist>` element into [one of my open-source projects](http://basicallydan.github.io/forkability). No JavaScript required for this!

The `<datalist>` element has [pretty OK support](http://caniuse.com/#feat=datalist), so you should be ok reading this post if you're on Chrome >= 20, Firefox >= 4, IE >= 10 or Opera >= 9.5. If not though, this is what we're going for

![HTML5 Datalist](/img/datalist-fav-fruit.png)
<div class="caption">No plugins! As you can see it's a regular input with a little dropdown attached to it.</div>

## Building it

This is really easy. First, you're gonna need a regular ol' `<input type="text">` element, and let's give it a label just because.

~~~html
<label for="fav-fruit">Favourite Fruit</label>
<input type="text" id="fav-fruit">
~~~

Now we add the new element, datalist. It needs an ID so we can hook it up to the `<input>`. Put it above the `<input>`, because it looks better there. While you're at it, add the `list` attribute to your `<input>` so it points at the `<datalist>` we created.

~~~html
<datalist id="fruits">
</datalist>

<label for="fav-fruit">Favourite Fruit</label>
<input type="text" id="fav-fruit" list="fruits">
~~~

Just like the `<select>` element, we put `<option>` elements inside the `<datalist>`, like so:

~~~html
<datalist id="fruits">
	<option value="Orange">
	<option value="Strawberry">
	<option value="Banana">
</datalist>

<label for="fav-fruit">Favourite Fruit</label>
<input type="text" id="fav-fruit" list="fruits">
~~~

As usual, we can also add a `placeholder` attribute to the `<input>` so you might as well do that.

### Result

Try typing in it, or hitting the arrow on the right:

<datalist id="fruits-1">
	<option value="Orange">
	<option value="Strawberry">
	<option value="Banana">
</datalist>
<label for="fav-fruit-1">Favourite Fruit</label>
<input type="text" placeholder="Enter your favourite fruit" id="fav-fruit-1" list="fruits-1">

## More detail

In some instances, the actual value that you want to have in the autocomplete might not be enough to convey meaning to the user. Luckily, one of the options provided by the `<option>` element still exist here. We can put a display value as a hint in the content of each `<option>`:

~~~html
<datalist id="fruits">
	<option value="Citrus sinensis">Orange</option>
	<option value="Fragaria vesca">Strawberry</option>
	<option value="Musa acuminata">Banana</option>
</datalist>

<label for="fav-fruit">Favourite Fruit</label>
<input type="text" id="fav-fruit" list="fruits">
~~~

### Result

<datalist id="fruits-2">
	<option value="Citrus sinensis">Orange</option>
	<option value="Fragaria vesca">Strawberry</option>
	<option value="Musa acuminata">Banana</option>
</datalist>

<label for="fav-fruit-2">Favourite Fruit</label>
<input type="text" id="fav-fruit-2" list="fruits-2">


## Styling it

There's all the usual things you can do to style an `<input>` here, but if we want to style the arrow, here's what we have to do:

~~~css
input[type=text]::-webkit-calendar-picker-indicator, input[type=text]::calendar-picker-indicator {
	color:#4E4141; /* In this case color will control the arrow colour */
}
~~~

We're selecting the `::(-webkit-)calendar-picker-indicator` pseudo-element of the `<input>` element. In this case, we're just changing how it looks when the input is hovered, but if you wanted to show the arrow all the time:

~~~css
input[type=text]::-webkit-calendar-picker-indicator, input[type=text]::calendar-picker-indicator {
	opacity:1; /* By default, this is set to 0 unless the input has :hover */
}
~~~

We can also manipulate the arrow's box:

~~~css
input[type=text]::-webkit-calendar-picker-indicator, input[type=text]::calendar-picker-indicator {
	border-radius:12px;
	background-color:#FF6363;
	width: 9px;
	margin-right:4px 4px 4px 5px;
	margin-right:4px;
	height: 10px;
}
~~~

<style type="text/css">
input#fav-fruit-3[type=text]::-webkit-calendar-picker-indicator {
	color:#4E4141;
	border-radius:12px;
	background-color:#FF6363;
	width: 9px;
	margin-right:4px;
	padding:4px 4px 4px 5px;
	height: 10px;
	opacity:1;
}
</style>

### Result

And this is what happens when we do that:

<datalist id="fruits-3">
	<option value="Citrus sinensis">Orange</option>
	<option value="Fragaria vesca">Strawberry</option>
	<option value="Musa acuminata">Banana</option>
</datalist>

<label for="fav-fruit-3">Favourite Fruit</label>
<input type="text" id="fav-fruit-3" list="fruits-3">

There, very simple. Flexibility for styling is fairly limited at the moment, but with some `::before` and `::after` pseudo-element selectors you could probably do some pretty good stuff. I'll leave that to you, and if you have any interesting results to share, please add a comment. Until then, enjoy!