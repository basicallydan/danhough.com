---
published: true
layout: post
title: How to use Dropzone with Cloudinary
date_created: 12 June 2015
location: London, UK
comments: false
---

Cloudinary is an image and video hosting service which provides a intuitive HTTP API, extensive image manipulation tools and a fast, reliable CDN. I've been using it for a new project which involves a _lot_ of user-uploaded images.

Cloudinary's Documentation is extensive and covers many different platforms. However, most of their documentation for using Cloudinary directly from the browser -- thereby skipping any hefty image-handling in your server -- is based around the idea that you are using jQuery. If you're reading this, you're probably aware that this is not always the case.

[Dropzone](http://dropzonejs.com) is a dependency-free JavaScript library for creating drag-and-drop upload areas on your web pages. It's quite customiseable and plays well with modern JavaScript techniques and environments.

## Set up a Cloudinary Upload Preset

NB:

* https://cloudinary.com/console/settings/upload
* Don't set default tags if you intend to add your own
* Allowed formats is very important
* Make sure it's unsigned
* Warning: This is abuseable

## Set up Dropzone

* Point at Cloudinary Upload URL
* On the 'sending' event stick in the parameters such as preset name, tags and API key
* Make sure you limit uploads to the allowed formats specified in cloudinary or your upload will be rejected

## Help me out?

By the way, this post isn't an ad for Cloudinary. I'm not actually a paying customer yet, but I do intend to become one. So far, I've been really impressed with the service so I'd recommend it if you aren't already a customer. They happen to have a referral scheme, so if you _do_ get to this point in the post and want to sign up, do me a favour and use my referral link: [Sign up for Cloudinary](http://cloudinary.com/invites/lpov9zyyucivvxsnalc5/tmjpvca5lj02i0a2kjo2). It'll get me extra quota, and I'd really appreciate it. Thanks :)

## Further reading

It took a bit of reading to help me understand how to do the above.

* [How to use Cloudinary with jQuery](http://cloudinary.com/documentation/jquery_integration#getting_started_guide), in case you're not convinced.
* [Direct, unsigned upload to Cloudinary from your browser](http://cloudinary.com/blog/direct_upload_made_easy_from_browser_or_mobile_app_to_the_cloud)
* [Dropzone Documentation](http://www.dropzonejs.com/)