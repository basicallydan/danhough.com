---
published: true
layout: post
title: Dropzone & Cloudinary - drag-and-drop image upload
description: I take you through a quick guide giving your website drag & drop image upload without a server using Dropzone and Cloudinary
date_created: 10 June 2015
location: London, UK
thumbnail: "!SITE_URL!/img/backbone-cloudinary/thumbnail.png"
twitterCardType: summary_large_image
comments: false
---

[Cloudinary](http://cloudinary.com "If you want to help me out, scroll to the bottom to find a referral link for Cloudinary, or click this one if you don't") is an image and video hosting service which provides an intuitive HTTP API, extensive image manipulation tools and a fast, reliable CDN. I've been using it for a new project which involves a _lot_ of user-uploaded images.

Its documentation is generally quite extensive, but most of the guides about using Cloudinary directly from the browser (thereby skipping any hefty image-handling in your server) are based around the idea that you are using jQuery. As you're probably aware, this is not always the case.

[Dropzone](http://dropzonejs.com) is a dependency-free JavaScript library for creating drag-and-drop upload areas on your web pages. It's quite customiseable and plays well with modern JavaScript techniques and environments.

These two tools can work together to create a slick, server-free drag-and-drop image upload experience. Read on to find out how.

## Set up a Cloudinary Upload Preset

To prevent abuse, Cloudinary usually requires you to _sign_ your upload requests using a signature generated on the server side. While this isn't a huge amount of work, there are _easier_ ways if you're not massively concerned about abuse of your Cloudinary account. The easier way is to use an "upload preset" to make _unsigned_ upload requests.

An upload preset enforces a strict set of rules about what kind of images can be uploaded and where they go so that even if someone does try to abuse the upload process, they can't over-do it by uploading loads of massive images of unexpected types, and it's easier to monitor.

First, log in to cloudinary and then head to [Settings > Upload](https://cloudinary.com/console/settings/upload). Click "Add upload preset" and it will take you to a form.

{% include _figure.html src="/img/cloudinary-dropzone/1-preset-area.png" caption="Find presets in your console under Settings > Uploads" %}

Here you should choose a unique preset name (or use their default nonsense one). You can also select "signed" or "unsigned" as the mode, and we're going to choose "unsigned" for this example.

{% include _figure.html src="/img/cloudinary-dropzone/2-preset-name-and-mode.png" caption="Choose a name and mode for your upload preset" %}

Further down the form, you'll see a "Tags" option. Tags are used as organisational and grouping tools in Cloudinary, and any you put into this box wil be applied to each image you upload with this preset. However, if you try to send along tags with your upload request, they *will not apply* because the default tags take precedence. Nearby you should also see other settings which you can read more about in [the documentation](http://cloudinary.com/documentation/upload_images).

If you scroll down further, you'll see a box expecting a comma-separated list of formats. This is particularly important now that Cloudinary supports videos. Limit this to "`gif,jpg,png`". Now people can only upload those three common image types, and not MP4s, AVIs or other video formats.

{% include _figure.html src="/img/cloudinary-dropzone/3-choose-formats.png" caption="Choose file formats to which uploads will be restricted" %}

Next, hit the "Save" button. Before we go into our code, though, head over to the [Cloudinary console dashboard](https://cloudinary.com/console); you need to grab your cloud name and 15-digit API key. Note them down, then we can get to coding.

{% include _figure.html src="/img/cloudinary-dropzone/4-cloud-name-and-key.png" caption="Your cloud name and API key can be found on the Cloudinary dashboard. No need for the API secret here!" %}

## Set up Dropzone

To start, let's look at some standard-looking Dropzone code. The best way to make this scenario work is [create your Dropzone programmatically](http://www.dropzonejs.com/#create-dropzones-programmatically) rather than just dropping in `dropzone.js` as a script. This gives us the extra control we need. If you're already using it this way, you should have some code which looks a bit like the following.

```javascript
var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 6
});
```

Note that I've filled in the the `acceptedFiles` parameter with the types of images our Cloudinary preset from earlier was expecting. This isn't crucial, but it saves Dropzone attempting to send any images that we know Cloudinary won't accept.

Now we have to determine which URL to use. It's Cloudinary's upload URL, where one of the paths is your cloud name, which we noted down earlier. For example, if your cloud name is `cloud9`, your URL would be:

```https://api.cloudinary.com/v1_1/cloud9/image/upload```

Make this the value of the `url` parameter in your Dropzone options, and your code should look like the following.

```javascript
var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 6,
	url: 'https://api.cloudinary.com/v1_1/cloud9/image/upload'
});
```

At this point, it won't work. This is because Cloudinary expects some extra parameters: your **API key**, the **upload preset name**, and a **timestamp**.

Since Dropzone will be making a `multipart/form-data` request to Cloudinary, it's our job to tell Dropzone what extra "parts" should be added to our form data. Remember your API key and preset name from earlier? We can add them to the request when the `'sending'` event fires from Dropzone, and to verify that our upload was successful we can use the `'success'` event.

```javascript
myDropzone.on('sending', function (file, xhr, formData) {
	formData.append('api_key', 123456789123456);
	formData.append('timestamp', Date.now() / 1000 | 0);
	formData.append('upload_preset', 'presetname');
});
myDropzone.on('success', function (file, response) {
	console.log('Success! Cloudinary public ID is', response.public_id);
});
```

Optionally, other parameters such as tags can be added using `formData.append`, e.g. `formData.append('tags', 'browserupload,catgifs');`

## Try it!

That's all you need to do! Load up your page and give it a go, you should be pleasantly surprised with the results.

If you want to see all the code in one place, I've created [a Gist with the entire, short script](https://gist.github.com/basicallydan/11c8c02bdaa1ced2e842). Just put in your own API key, cloud name and upload preset and you're good to go!

## Help me out?

By the way, this post isn't an ad for Cloudinary even though it may seem like one. I'm not actually a paying customer yet, but I do intend to become one. So far, I've been really impressed with the service so I would recommend it. They happen to have a referral scheme. If you get to this point in the post, and you've found it useful, and you want to sign up to Cloudinary, do me a favour and use my referral link: [Sign up for Cloudinary](http://cloudinary.com/invites/lpov9zyyucivvxsnalc5/tmjpvca5lj02i0a2kjo2). It'll get me extra quota, and I'd really appreciate it. Thanks :)

## Further reading

It took a bit of reading to help me understand how to do the above, some of which you may find helpful.

* [How to use Cloudinary with jQuery](http://cloudinary.com/documentation/jquery_integration#getting_started_guide), in case you're not convinced.
* [Direct, unsigned upload to Cloudinary from your browser](http://cloudinary.com/blog/direct_upload_made_easy_from_browser_or_mobile_app_to_the_cloud)
* [Dropzone Documentation](http://www.dropzonejs.com/)

Thanks for reading! I hope that this has been useful, but if you have any suggestions to improve it please get in touch.