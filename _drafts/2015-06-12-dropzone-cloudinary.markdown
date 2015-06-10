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

Ordinarily, Cloudinary requires you to _sign_ your upload requests using a signature generated on the server side. While this isn't a huge amount of work, there are _easier_ ways if you're not massively concerned about abuse of your Cloudinary account. The easier way is to use an "upload preset" to make _unsigned_ upload requests.

The point of an upload preset this is to create strict rules about what kind of images can be uploaded so that even if someone does try to abuse the upload process, they can't over-do it by uploading loads of massive images of unexpected types.

Log in to cloudinary and then head to [Settings > Upload](https://cloudinary.com/console/settings/upload). Click "Add upload preset" and it will take you to a form.

{% include _figure.html src="/img/cloudinary-dropzone/1-preset-area.png" caption="Find presets in your console under Settings > Uploads" %}

Here you should choose a unique preset name (or use their default nonsense one). You can also select "signed" or "unsigned" as the mode, and we're going to choose "unsigned" for this example.

{% include _figure.html src="/img/cloudinary-dropzone/2-preset-name-and-mode.png" caption="Choose a name and mode for your upload preset" %}

If you scroll down the form, you'll see a box expecting a comma-separated list of tags to apply by default. Tags are used as organisational and grouping tools in Cloudinary, and any you put into this box wil be applied to each image you upload with this preset. However, if you try to send along tags with your upload request, they *will not apply* because the default tags take precedence. Nearby you should also see destination folder and other settings which you can read more about in [the documentation](http://cloudinary.com/documentation/upload_images).

If you scroll down further, you'll see a box expecting a comma-separated list of formats. This is particularly important now that Cloudinary supports videos. You can limit extra abuse of your Cloudinary account by strictly limiting to, say, `gif,jpg,png` - that way, people can't upload MP4s, AVIs or other file formats that tend to be associated with larger images.

{% include _figure.html src="/img/cloudinary-dropzone/3-choose-formats.png" caption="Choose file formats to which uploads will be restricted" %}

Next, hit the "Save" button. Before we go into our code, though, head over to the [Cloudinary console dashboard](https://cloudinary.com/console); you need to grab your cloud name and 15-digit API key. Note them down, then we can get to coding.

{% include _figure.html src="/img/cloudinary-dropzone/4-cloud-name-and-key.png" caption="Your cloud name and API key can be found on the Cloudinary dashboard. No need for the API secret here!" %}

## Set up Dropzone

Believe it or not, it's exceedingly easy from here on. To start, let's look at some standard-looking Dropzone code. The best way to make this scenario work is [create your Dropzone programmatically](http://www.dropzonejs.com/#create-dropzones-programmatically) rather than just dropping in `dropzone.js`. This gives us the extra control we need. If you're already using it this way, you should have some code which looks a bit like the following.

```javascript
var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 6
});
```

Note that I've filled in the the `acceptedFiles` parameter with the types of images our Cloudinary preset from earlier was expecting. This isn't crucial, but it saves Dropzone attempting to send any images that we know Cloudinary won't accept.

Now we have to determine which URL to use. It's Cloudinary's upload URL, where one of the paths is your cloud name, which we noted down earlier. For example, if your cloud name is `cloud9`, your URL would be `https://api.cloudinary.com/v1_1/cloud9/image/upload`. Make this the value of the `url` parameter in your Dropzone options, and your code should look like the following.

```javascript
var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 6,
	url: 'https://api.cloudinary.com/v1_1/cloud9/image/upload'
});
```

If you tried it now, it still wouldn't work. This is because Cloudinary expects some extra parameters: your **API key**, the **preset name**, and a **timestamp**.

Since Dropzone will be making a `multipart/form-data` request to Cloudinary, it's our job to tell Dropzone what extra "parts" should be added to our form data. Remember your API key and preset name from earlier? You'll need them here.

```javascript
myDropzone.on('sending', function (file, xhr, formData) {
	formData.append('api_key', 123456789123456);
	formData.append('timestamp', Date.now() / 1000 | 0);
	formData.append('upload_preset', 'presetname');
});
```

Although not necessary, if you wanted to add other parameters such as tags, you could use `formData.append` to do that too, e.g. `formData.append('tags', 'browserupload,catgifs');`

## Try it!

That's all you need to do! Load up your page and give it a go, you should be pleasantly surprised with the results.

## Help me out?

By the way, this post isn't an ad for Cloudinary. I'm not actually a paying customer yet, but I do intend to become one. So far, I've been really impressed with the service so I'd recommend it if you aren't already a customer. They happen to have a referral scheme, so if you _do_ get to this point in the post and want to sign up, do me a favour and use my referral link: [Sign up for Cloudinary](http://cloudinary.com/invites/lpov9zyyucivvxsnalc5/tmjpvca5lj02i0a2kjo2). It'll get me extra quota, and I'd really appreciate it. Thanks :)

## Further reading

It took a bit of reading to help me understand how to do the above.

* [How to use Cloudinary with jQuery](http://cloudinary.com/documentation/jquery_integration#getting_started_guide), in case you're not convinced.
* [Direct, unsigned upload to Cloudinary from your browser](http://cloudinary.com/blog/direct_upload_made_easy_from_browser_or_mobile_app_to_the_cloud)
* [Dropzone Documentation](http://www.dropzonejs.com/)

Thanks for reading! I hope that this has been useful, but if you have any suggestions to improve it please get in touch.