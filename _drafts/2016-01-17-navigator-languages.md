---
layout: post
title: The difference between navigator.language and navigator.languages
date_created: 17 October 2014
location: London, UK
---

```js
/* JavaScript may make use of two properties
   in order to determine the user's preferred language
*/

/* navigator.language contains the language set
   as the preferred language of the operating system,
   at least on OSX.

   For me, navigator.language === 'en-GB'
*/
var language = navigator.language; // String

/* navigator.languages contains an ordered array of
   languages, in order of the user's preference which
   they can set at chrome://settings/languages

   For me, navigator.language === ['en-GB', 'en']
*/
var languages = navigator.languages; // Array
```

<!-- Also put it here: https://coderwall.com/p/new -->