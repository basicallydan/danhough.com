---
layout: post
title: Interfake now
date_created: 07 April 2016
location: London, UK
comments: true
---

This week, newly-formed [zeit](https://zeit.co/) released a new tool called
[`now`](https://zeit.co/now) which allows NodeJS developers to deploy their applications to the
Internet within seconds. The moment I saw it, I thought, "This would work
really well with [Interfake](https://github.com/basicallydan/interfake)."

So this is my quick little tutorial explaining how you can deploy a static JSON
API to a server provided by `now`. I'm gonna start with the show-off/speedrun
version. If you want the meat though, head to [The Long Version](#the-long-version).

## The Short Version

Put this in your terminal in a new directory somewhere. At some point, you'll
be prompted to check your email inbox for a confirmation. Once you've
confirmed, go to the URL that `now` gives you and put `/s` on the end of it.
Instant API in 175 characters!

```bash
npm install now -g && echo "var i=new
(require('interfake'))();i.get('/s').body({'m':'ok'});i.listen(3000);" >>
server.js && npm init -y && npm install interfake --save && now
```

```bash
> Deploying "/Users/foo/Development/interfake-now"
# THIS THING BELOW IS THE URL YOU NEED!
> Ready! https://interfake-now-urbtyfvpxa.now.sh (copied to clipboard) [1s]
# When `npm` start completes, go to https://interfake-now-urbtyfvpxa.now.sh/s
> Upload [====================] 100% 0.0s
> Sync complete (140B) [2s] 
> Building
```

## The Long Version

Let's say you've got an Interfake project which you're working on that you'd
like to expose to the global Internet. You could `ngrok` it, or put it on
Heroku, or whatever... or you could just type `now` and it works within a
minute.

### Steps

1. `now` should be installed globally using `npm install -g`
2. Make sure that the `start` script in your `package.json` file is correct,
  e.g. it might be `"node server.js"`.
3. Make sure `interfake` is one of the dependencies in `package.json`. Ensure
  this using `npm install interfake --save` in your project.
4. Make sure there's a `.listen()` call on your Interfake object somewhere.
5. Type `now` in your project.
6. Enjoy using your shiny new API.

### Example

Start a new directory. No need to `npm init` yet. Put this file in it, called
`server.js`:

```javascript
var Interfake = require('interfake');

var interfake = new Interfake();

interfake.get('/status').status(200).body({
  message: 'ok!'
});

interfake.get(/\/star-wars-trailers\/?/).status(200).body({
  trailers: [
    {
      title: 'Star Wars: The Force Awakens Official US Trailer',
      url: 'https://www.youtube.com/watch?v=sGbxmsDFVnE',
      release_date: 'October 19, 2015'
    },
    {
      title: 'ROGUE ONE: A STAR WARS STORY Official Teaser Trailer',
      url: 'https://www.youtube.com/watch?v=Wji-BZ0oCwg',
      release_date: 'April 7, 2016'
    },
    {
      title: 'Star Wars Episode IV: A New Hope - Trailer',
      url: 'https://www.youtube.com/watch?v=vZ734NWnAHA',
      release_date: '???, 1977'
    }
  ]
});

interfake.listen(3000);
```

Now the following commands on the command line:

```bash
# make sure now is installed
npm install now -g
# make sure you've got a package.json
npm init -y
# make sure your dependencies include interfake
npm install interfake --save
# run now!
now
# it should prompt you to check your inbox for a confirmation message, 
# and when you see this you should click the link provided. Within a few seconds
# you should see output like this:
> Deploying "/Users/foo/Development/interfake-now"
> Ready! https://interfake-now-xyerbcnwdp.now.sh (copied to clipboard) [1s]
> Upload [====================] 100% 0.0s
> Sync complete (140B) [2s] 
> Building
# the usual npm installation stuff comes up next, and eventually this:
> ▲ npm start
> Deployment complete!
# You can now go to:
# - https://interfake-now-xyerbcnwdp.now.sh/status
# - https://interfake-now-xyerbcnwdp.now.sh/star-wars-trailers/
# Nice! Thanks zeit.
```

Note: If you _do actually visit [https://interfake-now-xyerbcnwdp.now.sh](https://interfake-now-xyerbcnwdp.now.sh)_
it's a version of the example above that I've deployed today.

### More about `now`

**Source view!** If you go to https://interfake-now-xyerbcnwdp.now.sh/_src you
can see the source of the project that has been deployed, file-by-file.

**HTTPS!** `now` seems to put everything behind HTTPS, which is a nice bonus if
you're doing anything sensitive.

For more, go to [zeit](https://zeit.co/now). They're also on Twitter: [https://twitter.com/zeithq](https://twitter.com/zeithq)

### More about `Interfake`

I've written extensively about Interfake already as it's my baby, but it could
always do with some more love so check out the GitHub page at
[https://github.com/basicallydan/interfake](https://github.com/basicallydan/interfake).
Let me know if you do anything cool with it and/or `now`!

