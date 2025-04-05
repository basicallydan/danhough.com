I have a React Native app which deals with keeping data in cross-session state, so I chose to put that data into `AsyncStorage` so you can access it even when the app has been torn down.

In my case that data was a JSON Web Token (JWT) which authorises the user to use the API. I placed a `AsyncStorage.getItem` call in all the component and had to force it to navigate back to the login page. After a couple of situations where this flow came up, I realised there were a few other places I'd need it.

The obvious thing to do was to build a Higher-Order Component (HOC) to retrieve the data from AsyncStorage and, if it's not available, clear out the app and navigate back to login. It took a bit of playing around to get it to work exactly as I wanted so I thought I'd share my findings here.

To clear here's the flow I was going for:

1. User opens the app
2. Set The Requested View to whatever the default is
3. Navigates automatically to The Requested View
4. App renders some kinda loading screen
5. Looks for auth token in the store (unlikely!)
6. If it's there, render The Requested View
7. If there's no auth token, look in `AsyncStorage`
8. If there's no auth token there, clear the page stack and navigate to login
9. If there is an auth token there, put it in the store, render The Requested View

Now when they change view, it'll start at step 3 and go through that all again.

Here's the higher-order component I wrote:

```javascript
```

### Side effect

One of the side-effects I noticed of this is that when you clear the storage and the store, the app will automatically redirect to login, which in my case is fine by me.
