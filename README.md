# React Semantic Testing
The semantic way of testing your UI like your users would do

## Motivation
When testing an app, the most important thing to keep in mind is to test it in from perspective of how it is gonna be used, otherwise you will end testing things that doesn't really exist.

For this purpose, Understanding how users interact with the UI is essential (in order of preference):
1. Reading
2. Using assistive technologies
3. Doing actions

So, basically, what they do is `look for` UI elements by `reading` or `assitive technologies` and then `dispatching events` like click, change, submit and so on.

`react-semantic-testing` does it all and is not coupled to any specific modern frontend framework, it's written for vanilla javascript and you should write your own mount/unmount functions using the given tools. You can find more info in the examples folder, there are mounting functions for vanilla javascript and react.

### Queries
In order of preference

Find UI elements by reading/using assistive technologies:
- getByText: looks for text including `alt` text and `aria-label`text.
- getAllByText: looks for text including `alt` text and `aria-label`text.
- getByLabelText: gets the form control associated to the label with the given text.
- getByValue: gets the form control with the given `visible` value. It doesn't look for the value that the form control has, it looks for the value visible by the user. Example:
```
<select>
  <option selected value="0">a selected option</option>
</select>
```
```
getByValue('a selected option')
```
will return the `select` node while
```
getByValue('0')
```
will return an error

Find elements by its role in the UI:
- getByRole

Although you should be able to find any element using the queries above, there might be cases where, for some reason, you need something else. It's not recomendable, but it's just a fallback:
- getByDataTest
- getAllByDataTest

### Async Mutations
UI may be updated asynchronously and is usually painful and hard to handle. But don't worry, here you have a way of handiling the different types of async updates of the UI:
- waitUntilItChanges
- waitUntilItAppears
- waitUntilItDisappears

### Events
Users dispatch actions by clicking, changing and touching the UI (and many other ways). Just use any event you like as if it were vanilla javascript (it actually is).

### Helpers
`react-semantic-testing` encourages to test as a user (told you so many times already), but also exposes a few helpers for debugging purposes:
- getRawNode: returns the vanilla js node
- getText
- getValue
- logTree

### Assertions
`react-semantic-testing` also extends `Jest` so that your expects look way more semantic and can only be made over things that you user would do (yes, again):
- toBeRendered: looks if the given node is a child of `document.body`
- toHaveText
- toBeDisabled
- toHaveValue

These assertions need to receive a node wrapped by the tools that `react-semantic-testing` provides (as many of the comprobations that it does are using the above `helpers`).

## Usage
`react-semantic-testing` exposes a group of tools that let you `query`, handle `async mutations`, dispatch `events` over the UI of your app so that you can test it in the same way a user would do.


