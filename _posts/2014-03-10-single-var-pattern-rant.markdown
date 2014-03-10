---
layout: post
title: A criticism of the Single Var Pattern in JavaScript, and a simple alternative
date_created: 10 March 2014
location: Chamonix, France
---

The *Single Var Pattern* is a JavaScript design pattern in which for each scope, one `var` statement and **only** one `var` statement is used to declare all the variables for the current scope. It's used in order to help prevent logical confusion (variables being *hoisted* half-way through a scope are declared before being necessarily defined), collisions due to a variable being declared twice, and from unused variables being created and forgotten during refactoring.

In general, the Single Var Pattern is a wonderful idea and works very well, but it can quickly become difficult to work with, understand, debug and read. For that reason, I follow the guidelines except for one small difference.

This is the Single Var Pattern:

```javascript
function() {
    var declare = 'all',
        your = 'variables',
        using = 'a',
        single = 'var',
        statement = 'then',
        semicolon;
    // Everything else.
}
```

And this is what I do instead. I call it *Vars At The Top*.

```javascript
function() {
    var declare = 'all';
    var the = 'variables';
    var at = 'the';
    var topOfTheScope = 'but';
    var using = 'separate';
    var varStatements;
    // Everything else.
}
```

Why do I do this? Read on...

### You can't step over the Single Var Pattern

Those of you who use Chrome Developer Tools will probably be familiar with this toolbar:

![Chrome Dev Tools Code Navigation Toolbar](/img/single-var-dev-tools-1.png)

Let's focus on the orange-circled button first. This little guy is called the **'Step Over'** button, and what he does it takes you from one line to the next line. If there's an error while going from the current line to the next line, it'll highlight that problem! Let's say that there's a problem on Line 4 in this screenshot from Dev Tools because the argument `doWork` is a function that is producing some unexpected behaviour:

![Breakpoint at line 2](/img/single-var-dev-tools-2.png)

So we have a breakpoint at Line 2 which is currently where we're at. We know there's something wrong with the `doWork` function, and for argument's sake let's say we can't easily find it in the code. So to have a look inside that function we're gonna use the button highlighted with a blue circle in the first image: the **'Step Into'** button. But first, we need to **Step Over** a couple of times. So, let's click **Step Over**. What we expect to happen is to go to Line 3 after the first click, and Line 4 after the second.

![Goes straight to error](/img/single-var-dev-tools-3.png)

Well, that's a shame. What we see here is Dev Tools interpreting the whole thing as one line for the purposes of stepping over.

I will say, though, at *least* Dev Tools identifies that the error is on Line 4. It's just annoying when debugging someone else's code - or even your own - if you can't step into a function they're using, especially when it's been passed in as an argument.

### Prone to errors

I recently read [a post by Yoav Rubin](http://yoavrubin.blogspot.fr/2011/09/function-javascript-engine-and-single.html) which pointed out how a little mistake in using the Single Var Pattern can lead to a grave error. I'll quote directly from what he gave as examples. The first one is how the developer *intended* to write their code, and what the effect for each variable is.

```javascript
var someData = 'testing', // local within the function
    otherData = 'data1', // local within the function
    moreData = 'data2'; // local within the function
```

And now, what if they forget just a single comma after the first variable?

```javascript
var someData = 'testing' // local within the function
    otherData = 'data1', // global
    moreData = 'data2'; // global
```

JavaScript engines will insert semi-colons at the end of lines which do not have them (or a comma), and as you may know, a variable declaration without a `var` statement means a [global variable declaration, which could be a huge problem](http://code.tutsplus.com/tutorials/the-11-javascript-mistakes-youre-making--net-20413).

### Difficulty in commenting & refactoring

This is a little, but significant thing which in my opinion can really slow down the development process.

Because the statement is essentially one, long line, it has to compile properly *as a single line* every time we run the program, which can become a pain in the butt to maintain.

Often, during the process of developing something I'll end up commenting out lines of code bit-by-bit and sometimes commenting out entire variable declarations to see if, for some reason, this line is causing trouble. Let's look at an example:

```javascript
var dodgyVar1 = doSomethingDodgy('value'),
    goodVar1 = 'value',
    goodVar2 = 'value',
    dodgyVar2 = doSomethingDodgy('value');

// Do some stuff here with those variables
```

At some point in writing this code I decide to comment out `dodgyVar1` and `dodgyVar2`, because I suspect they're doing something dodgy. Since I use Sublime Text, I `CMD`+`Click` lines 1 and 4 to have a cursor on both of them, and hit `CMD`+`/`.

Now in order to make the code valid, I need to go through the fiddly process of navigating to the beginning of line 2, adding a `var` statement there, an then to the end of line 3, and replacing the comma with a semi-colon. This doesn't sound like much, but over time it becomes very tedious and was in fact the original reason for why I questioned my use of the Single Var Pattern.

## The usual arguments in favour

### "But it's less code, which means a smaller footprint"

If you're minifying your code, (which in 90% of situations is something you want to do) then you'll be fine. Here's some simple JavaScript I wrote:

```javascript
function doit() {
    var foo = 'bar';
    var baz = 'qux';
    var adventure = 'time';
    foo = 'qux';
    baz = 'bar';
    adventure = 'stuff';
    return foo + baz + adventure;
}

doit();
```

And here's the result produced by [UglifyJS2](https://github.com/mishoo/UglifyJS2):

```javascript
function doit(){var e="bar",t="qux",n="time";return e="qux",t="bar",n="stuff",e+t+n}doit();
```

As you can see, Uglify does the single `var` stuff for me, since in the `doit` scope there's only one `var` statement. Not a problem. In fact, if you Single-Var-Pattern-ify my code, you'll find the output to be exactly the same.

### "It's more readable"

Is it really? Shouldn't one of the determining factors in how "readable" code is be how many people can understand what's going on? I've seen many examples of code using SVP which assert that you should put the comma at the beginning of each line. If you ask me, this is not readable code for most people, *especially* JavaScript newbies or people not familiar with the Single Var Pattern:

```javascript
var bar    = thing.doTheThing('a')
    ,stuff = bar.makeMeAThing(),
    ,foo   = thing.doTheOtherThing('b')
    ,baz   = 'qux';
```

The "readability" thing is clearly a subjective matter, and I can't get my head around the supposed benefits. To me it seems more simple and elegant to give each variable the honour of having it's own `var` statement.

## Conclusion

The Single Var Pattern has spread and been encouraged by JavaScript legends because it helps to prevent a large number of mistakes that people, both new and experienced with the language, make. Thus, it has become very popular as part of the average developer's toolkit and "Gotcha!" library. Nevertheless, as with most fixes in programming, it introduces a few new problems.

Think about the cost/benefit. You may realise that by making one little change you can save yourself a lot of hassle, and may find yourself making far fewer mistakes.

That's why I personally use the "Vars At The Top" pattern (or VATT, if you like), as opposed to the Single Var Pattern.

**Further reading**: [Douglas Lee](http://douglastclee.blogspot.fr/2013/07/coding-javascript-single-var-vs-multi.html) shares my opinion and writes about it. StackOverflow has a couple of good discussions about [Disadvantages](http://stackoverflow.com/questions/8581869/disadvantages-of-javascript-single-var-pattern) and [Overdoing it](http://stackoverflow.com/questions/6235417/javascript-single-var-pattern-am-i-overloading-it). I was unable to find any posts in *defence* of the Single Var Pattern, only many which simply explained it and it's usefulness for all the usual reasons, but I'd love to read a rebuttal.

P.S. Some people call the pattern I use the "multi-var pattern" but I don't think it accurately describes what's going on since if you had your `var`'s scattered around the scope it could still be described as "multi-var".
