---
title: Using PonyDebugger to debug CoreData on an iPhone
---

PonyDebugger is a brilliant tool which allows iOS developers to debug the inner goings-on of their app using the same interface as Chrome's fastastic Dev Tools. I was having some issues with CoreData on my device, but not on the iPhone simulator, and I wanted to work out whether the data was actually *there*, and to look at it. Here's how I did it

## Setup

This took about half an hour, and I had a couple of slip-ups along the way which hopefully you can avoid with this guide.

### Get the Server

PonyDebugger runs on
 
* Include stuff from https://github.com/square/PonyDebugger/issues/100

### Run the Server

* Use your local IP as the address

### Connect to the server in your app

* Put the main bit in appdelegate and connect to mac's local IP
* Set up CoreData stuff in the bit where you create a MOC

### Navigate to the page, click through
