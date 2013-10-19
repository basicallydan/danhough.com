title: 20% Time, Intrapreneurship and Markdown for the Enterprise

------

Huddle Note is a feature we recently introduced to Huddle which gives users the ability to create lightweight notes within Huddle, which are treated just like any document except for two things. The first is, instead of using a Flexpaper preview, it's previewed using HTML5. The second? In-app editing. You can click a big ol' *Edit* button and edit that note to your heart's content. Plain text? No. HTML? Nope. Markdown. All this in an app aimed at enterprise customers. I'm very proud of what Huddle Note has turned into, and I want to tell the story.

This is a story about how we got Huddle Note from a little prototype side project I spent a couple of days on at work to being a huge new feature which is used by a pretty big chunk of our user base and I hear the Huddle salesfolk talking about every day on the phone to prospects.

## Don't ask for permission

At Huddle we're fortunate enough to have something similar to Google's 20% time, but we call it "Tuesday Time". As developers, we can spend every Tuesday working on a personal project. As long as it benefits our skills, or Huddle, or the wider development community in some way, it counts. Examples include reading books about tech, prototyping new features or [volunteering to teach kids or adults about coding](http://codeclub.org.uk/).

One week, when I was learning iOS app development, I decided it would be pretty sweet if we had something like Evernote, but for Huddle, since a lot of our customers pick Huddle for our security credentials and sacrifice other apps like Evernote for things like Note-taking. If I could simply make a nice interface for people to create and edit lightweight documents, using the ever-so-flexible Huddle Files API then a note would inherit all the cool stuff that files normally get in Huddle. So, I did it with a basic iPhone version, and it was great! Until, of course, we realised this problem needed a bit more thought.

It was a start, though, and I went to speak to my friend James, a Product Manager, and Jon then-CTO of Huddle.. It turns out they'd been thinking of the exact same thing.

## Find support in the right places

Jon and James were both big fans of the idea since they'd already had it before. The trouble was, Note was quite a disruptive idea. By introducing a new feature like this, we'd risk overloading the feature set of an arguably already very-feature-heavy application. Furthermore, it actually solved problems that Whiteboards already solved, but in a much nicer way. So, it would seem like we'd be shooting ourselves in the foot, so the idea was never tested.

That's what Tuesday Time is for though, so Jon, James and I started working the right angles to get it into the Huddle Roadmap.

## Reduce scope. No, more than that.

Once we realised how much work was involved in everything we wanted to do, and how long it would take to get to the point of implementing all the features we wanted, it was clear we needed to cut some of them. We came up with an "MVP" plan and a cross-platform rollout strategy.

Originally we wanted a small, modal-based edit view, with an optional full-screen edit view. We also wanted formatting buttons, a helpful guide to markdown, images, videos, real-time collaborative editing, a WYSIWYG editor that didn't suck, really nice printing... the list goes on. Clearly, with one developer dedicated to this full-time, to fit it into an existing system it would be way too much and take a very long time, especially with Huddle's (thankfully) rigorous QA process.

We reduced scope down to the basic problem we were trying to solve and came up with an [MVP](http://en.wikipedia.org/wiki/Minimum_viable_product): A simple note-taking application within Huddle, which uses Huddle's existing infrastructure for storage and retrieval. It should have create, edit and read capabilities. So we got a stylesheet, we made a couple of very small changes to the Huddle backend (so that it understood the file extension & mime type we came up with) and added a new component to our Huddle Files Single Page App. We also eventually decided to drop the dialog view, too, and go with full-screen only. But we only came up with this scope reduction in the next step.

## Roll out slowly

We did edit capabilities first. That meant that someone creating a Huddle Note manually and uploading it to Huddle <sup>1</sup> could edit it within the app. Through this we learned that a small modal dialog to write a note of indefinite length was not enough. We released this but didn't tell anybody about it. Alpha through ignorance.

Then, we added creation capabilities and made this a feature which our Customer Success team could turn on or off per-user. A lot of Huddlers got it turned on and agreed that a modal was not big enough for this, and gave us some really great feedback about styling and UX.

Finally, we got rid of the modal and switched to full-screen only. This was a ballsy move <sup>2</sup>, but so far it's been well-recieved.

## Don't talk about Markdown

When it came time to show off the 'finished' product to the rest of the company, we gathered the Customer Success and Sales teams together for a demo. James put together a fantastic presentation and a positioning document to help explain what it was, how users would use it and how it could be explained to customers.

He didn't mention Markdown *once*.

The beauty of Markdown is it's simplicity in this case; users can benefit from it without realising they're using it. The lesson to be learned here is, when selling a software product, don't sell the technical aspects to people who are interested only in what the product will enable them to do. Sell them the dream, not the reality.

### Notes

<sup>1.</sup> About 4 or 5 Huddlers used it during this period.

<sup>2.</sup> This was a totally new interaction pattern for Huddle. We dropped any branding or extra features from the view in favour of simplicity and 'zen'. It's a wonderful writing experience, inspired partly by Medium's editor.
