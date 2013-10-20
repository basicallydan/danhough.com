title: 20% Time, Intrapreneurship and Markdown for the Enterprise

------

Huddle Note is a feature we recently introduced which gives users the ability to create lightweight notes within Huddle, treated just like any document except for two things. The first is, instead of using a Flexpaper preview, it's previewed using HTML5. The second? In-app editing. You can click a big ol' *Edit* button and edit that note to your heart's content. Plain text? No. HTML? Nope. Markdown. All this in an app aimed at enterprise customers. I'm very proud of what Huddle Note has turned into, and I want to tell the story.

This is a story about how we took a simple idea from being a side project to being a huge new feature which is used by a pretty big chunk of our user base and one which I hear the Huddle salesfolk talking about every day on the phone to prospects.

## Don't ask for permission

At Huddle we're fortunate enough to have something similar to Google's 20% time, but we call it "Tuesday Time". As developers, we can spend every Tuesday working on a personal project. As long as it benefits our skills, or Huddle, or the wider development community in some way, it counts. Examples include reading books about tech, prototyping new features or [volunteering to teach kids or adults about coding](http://codeclub.org.uk/).

One week, when I was learning iOS app development, I decided it would be pretty sweet if we had something like Evernote, but for Huddle, since a lot of our customers pick Huddle for our security credentials and sacrifice other apps like Evernote for things like Note-taking. If I could simply make a nice interface for people to create and edit lightweight documents, using the ever-so-flexible Huddle Files API then a note would inherit all the cool stuff that files normally get in Huddle.

So, I used my Tuesday Time to make a basic iPhone version, and it worked almost exactly like I'd imagined.

I went to speak to my friend [James](https://twitter.com/jamespipe), a Product Manager, and [Jon](https://twitter.com/jonathanhowell), then-CTO of Huddle. It turns out they'd been thinking of the exact same thing, and we agreed that it needed a little bit more thought, and a lot more support.

## Find support in the right places

Jon and James were both big fans of the idea since they'd already had it before. The trouble was, Note was quite a disruptive idea. By introducing a new feature like this, we'd risk overloading the feature set of an arguably already overloaded application. Furthermore, it actually solved problems that our Whiteboards feature already solved, but in a *much* nicer and more modern way. It might seem like we'd be shooting ourselves in the foot, so the idea was never tested.

That's what Tuesday Time is for though, so Jon, James and I started working the right angles to get it into the Huddle Roadmap. We enlisted the help of [Pete](https://twitter.com/tuptup), then-designer at Huddle, and got started on the real thing. Soon, it was me, Pete and James creating this feature: A product guy, a code guy and a design guy.

## Reduce scope. No, more than that.

Once we realised how much work was involved in everything we wanted to do, it was clear we needed to cut some features.

Originally we wanted a small, modal-based edit view, with an optional full-screen mode. We also wanted formatting buttons, a helpful guide to markdown, images, videos, real-time collaborative editing, a WYSIWYG editor that didn't suck, really nice printing... the list goes on. Clearly, with one developer dedicated to this full-time, to fit it into an existing system it would be way too much and take a very long time, especially with Huddle's (thankfully) rigorous QA process.

We reduced scope down to the basic problem we were trying to solve and came up with our [MVP](http://en.wikipedia.org/wiki/Minimum_viable_product): A simple note-taking application within Huddle, which uses Huddle's existing infrastructure for storage and retrieval. It should have create, edit and read capabilities in the web app, and read-only in our mobile apps. So we got a stylesheet, we made a couple of very small changes to the Huddle backend<sup>1</sup> and added a new component to our Huddle Files Single Page App. We also eventually decided to drop the dialog view, too, and go with full-screen only. But we only came up with this scope reduction in the next step.

## Roll out slowly

We did edit capabilities first. This meant that someone creating a Huddle Note manually (it's just a Markdown file with a custom extension) and uploading it to Huddle <sup>2</sup> could edit it within the web app. Through this we learned that a small modal dialog to write a note of indefinite length was not enough. We released this, but we didn't tell anybody outside the company about the feature so it wasn't a problem. Secret alpha.

Then, we added creation capabilities and made this a feature which our Customer Success team could turn on or off per-user. A lot of Huddlers had it turned on, agreed that a modal was not big enough for writing in, and gave us some really great feedback about styling and UX.

Finally, we got rid of the modal and switched to full-screen only. This was a ballsy move <sup>3</sup>, but so far it's been well-recieved.

## Don't be a hero: ask for help

At Huddle we have quarterly commitments: each quarter the Engineering team agrees to deliver certain top-level requirements, and one of these for the quarter was this Note MVP. We needed to get the mobile stuff done but I was drowning in JavaScript and the other SCRUM teams had their own stuff to deal with. So Pete, the only other member of the mobile team, helped me out and stuck a Markdown renderer into the mobile apps. Good man. We were ready to go.

## Don't talk about Markdown

When it came time to show off the finished MVP to the rest of the company, we gathered the Customer Success and Sales teams together for a demo. James put together a fantastic presentation and a positioning document to help explain what it was, how users would use it and how it could be explained to customers.

He didn't mention Markdown *once*.

In this case, the beauty of Markdown is it's simplicity; users can benefit from it without realising they're using it. The lesson to be learned here is this: when selling a software product, don't sell the technical aspects to people who are interested only in what the product will enable them to do. Sell them the dream, not the reality.

## Conclusion

Software companies often tout how much control and decision-making ability they delegate to their engineers. And it's true, they do let engineers take a lot of responsibility and push features to the end product, but it isn't always as easy as that. You can't just say "I have an idea!" and expect it to be immediately turned into *Feature du jour*. It can take work, patience and determination, and a lot of the time you'll need support from your colleagues.

The story of Huddle Note is a story of how people came together and helped each other to change things for the better, against the odds. It took months of meetings, discussions, whiteboard drawings and changes to the roadmap, but we're very proud of what we did. It is a culmination of some of the best things about Huddle: encouraging [intrapreneurship](http://en.wikipedia.org/wiki/Intrapreneurship), giving engineers freedom and time to explore their ideas, and an attitude of determination within the engineering team; an attitude we sometimes forget that we're capable of having.

If you work at a software company and there's something you think would greatly improve your product, don't just sit around and wonder why it isn't happening: do something about it, start speaking to people about it and test the idea yourself. And if the powers that be prevent you from doing any of those things, perhaps it's time to consider looking at other opportunities.

Happy coding!

### Notes

<sup>1.</sup> So that it understood the file extension & MIME type we came up with.

<sup>2.</sup> About 4 or 5 Huddlers used it during this period.

<sup>3.</sup> This was a totally new interaction pattern for Huddle. We dropped any branding or extra features from the view in favour of simplicity and 'zen'. It's a wonderful writing experience, inspired partly by Medium's editor.
