---
layout: post
title: GitHub Webhooks with Flask
date_created: 04 March 2016
location: London, UK
comments: false
---

On my to-do list for a while I've had a goal of automating deployment of my blog.
It's powered by Jekyll, in case you didn't know, so [the source is all hosted on
GitHub](https://github.com/basicallydan/danhough.com).
Before today, this was my process for writing a new post:

1. Make a new `.markdown` file in `_drafts`
2. Push it to `master` because it's in `_drafts`, no biggie.
3. Write until it feels close to ready.
4. Move it to `_posts`.
5. Run the website locally.
6. Tweak it as I go.
7. When it's looking good, `ssh` onto my VPS to pull it down from GitHub
8. Manually deploy it to a staging site, send some friends and colleagues the
   staging link for critique and test that the deploy process hasn't broken somehow.
9. When that's all over, manually deploy it to live.

A better solution would involve less work by me: why should my blog be any harder
to publish to than a Wordpress-powered blog?

GitHub provides Webhooks for individual git repositories hosted on their service.
The service can be configured so that when your repo is updated, GitHub will send
a little HTTP request to the endpoint of your choice on the public Internet.
The request contains information about what has changed including the branch, the latest commit,
and some secret information to verify it came from GitHub.

So the solution has been clear in my mind for a while: get GitHub to tell my
VPS when it needs to pull down the latest changes to my blog and run a deploy script.

How will I make this happen?

### Inspiration

We've spent a lot of time in my current gig at [Digi2al](https://digi2al.co.uk)
talking about and implementing CI systems in various places, so my mind is in that
frame of mind anyway. It's also been my first big bit of hands-on work with
Python in quite a few years and I've been enjoying writing it. Simultaneously,
[Elli](https://twitter.com/elli_thomas) has been learning and
the minimalistic Python web framework [Flask](http://flask.pocoo.org/) with
[Code First Girls](https://twitter.com/codefirstgirls).
So now I have three goals:

1. Automate deployment of my blog
2. Do a small but challenging Python project outside of work
3. Use Flask for something so I can know what Elli is talking about

Nautrally, I decided to write a Flask app to implement my solution.
One evening last week, brain-tired after a long day at the office and
a little bit unwell, I typed `mkdir` in Terminal I deliriously asked myself,
"what is this app supposed to do?" and my brain responded stupidly, "the thing."

And that's why I created [`dothething`](https://github.com/basicallydan/dothething).
It's certainly not the most powerful webhooks server in the world, but it fits
my purposes nicely.

### How does it work?

**uWSGI**, the application server, runs the **Flask** app and creates a unix
socket through which to serve requests. All of this is configured in a simple but
flexible **configuration file**. **Nginx**, which is the web server I already
use on my Linode VPS, hooks up HTTP requests to that socket quite seamlessly, on
a host that I have specified.

Whenever my **GitHub** repo is pushed to or updated on either the `staging` or `master`
branches, GitHub's **webhooks** send a request to the endpoint I've specified.
That endpoint is being served by the Flask app.

The app fetches the latest changes on all branches, does a `checkout` on the latest
commit, deploys the blog to the appropriate folder (depending on whether it's
`staging` or `master`) and does a `checkout master` to wrap it all up. Job's a goodun.

I learned a few things getting to this point:

1. How to `uwsgi`.
2. How to `nginx` my `uwsgi`.
3. How to add a special `ssh` key just for read-only GitHub access in the form
   of a [Deploy Key](https://developer.github.com/guides/managing-deploy-keys/)
4. How to Flask.
5. How to `Popen` with various different configurations of working directory,
   environment, path, etc.
6. How to debug while I `uwsgi`.
7. How to write and read simple but flexible configuration files for Python apps.

And that's about it. Not bad for a three-or-four-nights project.

I realise also that I didn't need to write a post about this tool which probably
is only useful for me since it's massively unflexible compared to some other
likely alternatives, but it was a good excuse to test out my new workflow.

Incidentally&hellip;

### This is my new workflow

1. Make a new `.markdown` file in `_posts`
2. Push it to `staging` so that it won't deploy to danhough.com
3. Run the website locally.
4. Tweak it as I go and keep committing.
5. When it's done, some friends and colleagues the staging link for critique.
6. When that's all over, make a PR for the `staging` branch on `master`.

Much better, right? I think so. No more having to faff around on my server every
time I want to do a new blog post.

### Next level

I have yet to configure the `sass` part of the build, and there's no easy install
process for `dothething` yet.

While I'm writing a new post or redesigning the site I might also want to create
non-`master` and non-`staging` branches, but I haven't decided about that one
yet. They could even generate their own subdomains so that I don't even _need_
to push to `staging`. That'd be interesting, but maybe overkill.

Anyway, that's all for now. If you wanna look at the simple little Flask app I made,
go and [check it out on GitHub](https://github.com/basicallydan/dothething). I'm open to suggestions and pull requests!

If it also happens to fit your requirements perfectly, then great: go ahead and
use it! It is at least flexible enough to be run in environments other than
`uwsgi`-powered ones.

<a href="https://github.com/basicallydan/dothething" class="cta--primary">Do the thing.</a>
