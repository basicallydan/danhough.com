---
layout: post
title: GitHub Webhooks with Flask
date_created: 04 March 2016
location: London, UK
comments: false
---

On my to-do list for a while I've had a goal of automating deployment of my blog
somehow. It's powered by Jekyll, in case you didn't know, so [the source is all on
GitHub](https://github.com/basicallydan/danhough.com).
Before today, this was my process for writing a new post:

1. Make a new `.markdown` file in `_drafts`
2. Push it to `master` because it's in `_drafts`, no biggie.
3. Write it until it feels close to ready.
4. Move it to `_posts`.
5. Run the website locally.
6. Tweak it as I go.
7. When it's looking good, `ssh` onto my VPS to pull it down from GitHub
8. Manually deploy it to a staging site, send some friends and colleagues the
   staging link for critique and test that the deploy process hasn't broken somehow.
9. When that's all over, manually deploy it to live.

### Inspiration

We've spent a lot of time in my current gig at [Digi2al](https://digi2al.co.uk)
talking about and implementing CI systems in various places. It's also been my
first big bit of hands-on work with Python in quite a few years, using Django,
which feels quite heavy-handed at times. Simultaneously,
[Elli](https://twitter.com/elli_thomas) has been learning Python with
[Code First Girls](https://twitter.com/codefirstgirls) and in the process,
the minimalistic web framework [Flask](http://flask.pocoo.org/). I was inspired to do three things:

1. Automate deployment of my blog
2. Do a small but challenging Python project outside of work
3. Use Flask for something so I can know what Elli is talking about

So naturally I decided to write a Flask app which could automate deployment of
my blog. One evening last week, brain-tired after a long day at the office and
a little bit unwell, I typed `mkdir` in Terminal I deliriously asked myself,
"what is this app supposed to do?" and my brain responded stupidly, "the thing."

And that's why I created [dothething](https://github.com/basicallydan/dothething).
It's certainly not the most powerful webhooks server in the world, but it fits
my purposes nicely.

### How does it work?

**uWSGI**, the application server, runs the **Flask** app and creates a unix
socket through which to serve requests. All of this is configured in a simple but
flexible **configuration file**. **Nginx**, which is the web server I already
use on my Linode VPS, hooks up HTTP requests to that socket quite seamlessly, on
a host that I have specified.

Whenever my **GitHub** repo is pushed to updated on either the `staging` or `master`
branches, GitHub's **webhooks** are configured to send a request to the endpoint the
Flask app has set up containing the branch and the latest commit on that branch.

The Flask app pulls down the latest changes on all branches, checks out the latest
commit, deploys the blog to the appropriate folder (depending on whether it's
`staging` or `master`) and checks out `master` to wrap it all up. Job's a goodun.

I learned a few things in process of getting to this stage:

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

I've not configured building the sass or anything yet, so I need to put that into
config somehow.

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
