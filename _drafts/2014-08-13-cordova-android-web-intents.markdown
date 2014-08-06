---
published: true
layout: post
title: Android Web Intents with Cordova
date_created: 6 August 2014
location: London, UK
comments: false
---

**Important:** I'm doing this using Cordova 3.5.0. It'll probably work for 3.x.x in general but I can't guarantee it!

This is a simple one. You need your Cordova app to step in whenever the user clicks a URL that points to a certain website so that you can handle it.

The example I'm going to use is an app which intercepts Google search URLs and takes the search term to a certain page in the Cordova app, perhaps in order to display it or search on a rival search engine.

First, add the appropriate plugin. Don't forget that if you [use a hook to manage plugins, like devgirl](http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/), add it to there, too. On the command line/terminal:

```bash
$ cordova plugin add https://github.com/Initsogar/cordova-webintent.git
```

Now go to your AndroidManifest.xml file. If you use a template to generate this, go there. Inside of `<manifest>...<application>...<activity>`, paste this XML element:

```
<intent-filter>
	<action android:name="android.intent.action.VIEW"></action>
	<category android:name="android.intent.category.DEFAULT"></category>
	<category android:name="android.intent.category.BROWSABLE"></category>
	<data android:host="google.com" android:scheme="http"></data>
</intent-filter>
```

Now head to your initialisation code. This is whatever gets executed inside of the `document.addEventListener('deviceready'...` callback. Stick this inside of it somewhere:

```javascript
window.webintent.getUri(function(uri) {
	if (!_.isString(uri)) {
		Backbone.history.navigate('#/');
	}
	var urlRegex = /?q=([.*]+)/;
	var innerUrl;
	if (urlRegex.test(uri)) {
		innerUrl = '#/search/' + urlRegex.exec(uri)[1];
		Backbone.history.navigate(innerUrl);
	}
});
```

So what does this do? First, we call `getUri` to get the URI that was given by our intent.

<!--EXPLAIN IT-->

<!--DO THE STUFF ABOUT PATHPATTERN-->