### How to setup:

If used, the ToggleProvider component is a centralized toggle component.  There is no need for any external handlers. 

The base of the ToggleProvider component is:

```html
<ToggleProvider>
  {({ show, toggle }: ToggleProviderRef) => (

  )}
</ToggleProvider>
```

The ToggleProvider component gives you a `show` boolean and `toggle` function to call to change the boolean of `show`.  Here is a reccomended example use case:

```html
<ToggleProvider>
  {({ show, toggle }: ToggleProviderRef) => (
    <React.Fragment>
      <Button onClick={toggle}>Click me!</Button>
      {show && <p>Toggled!</p>}
    </React.Fragment>
  )}
</ToggleProvider>
```

<br />

**TODO**

Add React transition group properties/options

<br />
<br />

### ToggleProvider - default properties:

The ToggleProvider component has no default properties besides passing back `show` and `toggle` to the user.

```jsx
<ToggleProvider>
  {({ show, toggle }: ToggleProviderRef) => (
    <React.Fragment>
      <button onClick={toggle}>Click me!</button>
      {show && <p>Dost Thou Even Hoist?</p>}
    </React.Fragment>
  )}
</ToggleProvider>
```