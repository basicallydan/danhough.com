---
published: true
layout: post
title: Android Web Intents with Cordova
date_created: 18 August 2014
location: London, UK
comments: false
---

**Important:** I'm doing this using Cordova 3.5.0. It'll probably work for 3.x.x in general but I can't guarantee it!

So, let's say you need your Cordova app to step in whenever the user clicks a URL that points to a certain website so that you can handle it.

The example I'm going to use is an app which intercepts (filters) Google search URLs (e.g. http://google.com/search?q=cordova) and takes the search term to a certain page in the Cordova app, perhaps in order to display it or search on a rival search engine.

First, add the appropriate plugin. Don't forget that if you [use a hook to manage plugins, like devgirl](http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/), add it to there, too. On the command line/terminal:

```bash
$ cordova plugin add https://github.com/Initsogar/cordova-webintent.git
```

Now go to your AndroidManifest.xml file. If you use a template to generate this, go there. Inside of `<manifest>...<application>...<activity>`, paste this XML element:

```xml
<intent-filter>
	<action android:name="android.intent.action.VIEW"></action>
	<category android:name="android.intent.category.DEFAULT"></category>
	<category android:name="android.intent.category.BROWSABLE"></category>
	<data android:host="google.com" android:scheme="http"></data>
	<data android:host="www.google.com" android:scheme="http"></data>
</intent-filter>
```

Here we're registering an "intent filter", for any URL in the `http` scheme which is on the host `google.com` or, with the subdomain at `www.google.com`. You may also want to specify more filters for `https`.

Now head to your initialisation code. This is whatever gets executed inside of the `document.addEventListener('deviceready'...` callback. Stick this inside of it somewhere:

```javascript
window.webintent.getUri(function(uri) {
	if (!_.isString(uri)) {
		Backbone.history.navigate('#/');
	}
	var urlRegex = /\?q=(.+)$/i; // This regular expression is very greedy, you may want to refine it
	var innerUrl;
	if (urlRegex.test(uri)) {
		innerUrl = '#/search/' + urlRegex.exec(uri)[1];
		Backbone.history.navigate(innerUrl);
		// alert(innerUrl); // Do this if you just want proof!
	}
});
```

So what does this do? First, we call `getUri` to get the URI that was given by our intent. We extract the bit that we need (in this case, a search query) using a regular expression, and navigate to our "Search" page with the query as our parameter. Or, if you just want proof, do an alert of the `innerUrl` variable to see what we've extracted.

So, try clicking a link that looks like this: http://google.com/search?q=working perhaps by putting into a Google Keep note, or somewhere else on your device that creates links. You should see a dialog pop up asking if you'd like to open the link using your browser, or your app.

## Getting Specific

You might find that you only want to intercept URLs at a specific path, to avoid opening links at the URL which we don't know how to handle, such as http://www.google.com/about/ or http://www.google.com/contact/. If you click those links now you will find your app opening, still.

To fix this and only open `/search` links, we go back to our AndroidManifest.xml file and change the XML that we pasted in earlier. In the `<data>` element, we put an `android:pathPattern` attribute whose value specifies the pattern of the path we'd like to intercept. So, let's make it look like this:

```xml
<intent-filter>
	<action android:name="android.intent.action.VIEW"></action>
	<category android:name="android.intent.category.DEFAULT"></category>
	<category android:name="android.intent.category.BROWSABLE"></category>
	<data android:host="google.com" android:pathPattern="/search" android:scheme="http"></data>
	<data android:host="www.google.com" android:pathPattern="/search" android:scheme="http"></data>
</intent-filter>
```

Now, try opening http://google.com/about/ again. It won't open your app!

So, there you go. Pretty simple.

## More information

There's still a lot to learn about Intents, and more to know about the WebIntents plugin for Cordova, so if you're interested, try these links:

* [Official Docs for Intents and Intent Filters](http://developer.android.com/guide/components/intents-filters.html)
* [WebIntents plugin on GitHub by Initsogar](https://github.com/Initsogar/cordova-webintent)