---
layout: post
title: StreetScout 2.0
date_created: 30 November 2015
description: I destroyed it, and created it all over again.
thumbnail: "!SITE_URL!/img/streetscout-2/streetscout-2-tw.png"
ogthumbnail: "!SITE_URL!/img/streetscout-2/streetscout-2-og.png"
twitterCardType: summary_large_image
location: Chiang Mai, Thailand
comments: false
time_to_read_estimate: 5
---

StreetScout for iPhone hasn't had a major update in almost 2 years. It's been ignored through iOS7, iOS8 and now, we're in iOS9. It's started to look and feel pretty outdated, and I got a little tired of that.

So, I started from scratch. It's a good excuse to learn Swift, and try out some interaction ideas that I wanted to try.

Above all, I thought it was most important to make it usable again, and quickly. With that in mind, a couple of features have been left on the cutting room floor, and a new interface has been designed from the ground up.

### What was wrong with StreetScout 1.x?

First of all, it was awfully vain. there was a big ol' StreetScout Logo at the top which was pretty unnecessary.

Secondly, it just wasn't modern-looking. It had a lot of custom look-and-feel code which didn't port well to iOS version 7, 8 and 9.

### What was right with StreetScout 1.x?

There were some pretty useful shortcut buttons for common searches like cafe, bar, supermarket or ATM. It also had a useful "alert me when I get there" feature for when you decide to detour to one of the suggested places. Although, to be honest, this feature was a bit clunky.

StreetScout 1.x also featured home and work shortcuts, to help speed things up for those all-important destinations.

### So what has changed in StreetScout 2.0?

{% include _pull-right-image.html paragraph="StreetScout 2.0 doesn't feature the \"alert me when I get there\" function, nor does it have shortcuts for home, work, cafés, supermarkets, restaurants or ATMs." src="/img/streetscout-2/streetscout-map.png" %}

What it *does* have is speed and simplicity. At the moment there's really only two screens: the map view and the list view. Map view is where you enter the destination ("Going to") and query ("Looking for"), and when the search has completed your route is shown with markers to represent the places. Tap one and it'll show you the distance off-route and whether it's open now or not. Although, you can also tell if it's open now by looking at the colour of the marker.

The list view is simpler, too. It becomes available once search results have come up on the map. Tapping an item on the list will show you where it is on the map, and if you tap the popout that the map marker gives you, you can get directions using whatever your favourite mapping application is. As before, StreetScout doesn't intend to replace that: it merely wishes to complement it.

Annoying "Please rate me!" popups have been removed too, and instead the list view now features a "Please rate me!" item which is far less intrusive and much friendlier.

Finally, StreetScout currently assumes that you're walking somewhere. That's the context in which I use it 90% of the time, and therefore the one which I understand the best. Driving may return at some point, and I'd still really like to incorporate public transport too but that's a bigger problem.

In general I feel it's a nicer tool to use. There are also fewer custom theme bits, so it feels far more like an iOS app than before, and it'll hopefully age a little more gracefully this time (although, I'll hopefully keep it up to date a little more diligently too).

If you don't have StreetScout installed, I urge you to [give it a look now on the App Store](https://itunes.apple.com/us/app/streetscout/id627693043?ls=1&mt=8).

As always thanks for reading. Please lemme know if you have any feedback.

### Next?

Well, the StreetScout landing page needs updating, and the web app could do with a bit of modernisation - but it still works quite well. For now, I'm glad that at least this is done.