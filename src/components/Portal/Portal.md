### How to setup:

If shown, the Portal component will append its
children to a div with id of 'bee-modal-root'.  It is advised to add the div as a sibling of your `<div id="root"></div>` in your index.html file.

<br />

You should have a dedicated state value and setState handlers for each Portal.
In this example, the variable names reflect the attributes given to the Portal,
but the variables names are up to you to change.

<br />

### Basic setup:

<br />

```js static
  readonly state = {
    showPortal: false
  };

  const showPortalHandler = () => this.setState({ 
    showPortal: !this.state.showPortal 
  });
```

<br />

Some use cases are:

1. Creating modals
2. Popups

<br />

**TODO**

Pass an onClick handler to the Portal component to pass down to the Overlay component to increase utility

<br />

**Note**

1. The Portal component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Portal component can also take a className property that will add classes to the highest level of the Portal component

2. Although the Portal component can be used by itself, you should add it in a conditional block to show it based on an event

In Example (not recommended):

```html
<Portal color="style" opacity={0.3}>
  <YourComponent>
    <Button onClick={showPortalHandler}>Close Portal</Button>
  </YourComponent>
</Portal>
<Button onClick={showPortalHandler}>Show Portal</Button>
```

<br />

In Practice (recommended):

```html
{this.state.showPortal &&
  <Portal color="style" opacity={0.3}>
    <YourComponent>
      <Button onClick={showPortalHandler}>Close Portal</Button>
    </YourComponent>
  </Portal>
}
<Button onClick={showPortalHandler}>Show Portal</Button>
```

<br />
<br />

###### Classes you can modify:

- bee-portal
- bee-portal--children

<br />
<br />

### Portal - default properties:

<br />

For these examples, the `<div id="bee-modal-root"></div>` is rendered with the examples in order to make these examples work.  Each example is treated as its own 'app' and therefore each exmaple needs its own bee-modal-root

The Portal component has a default height and width of 100vh and 100vw respectively. By default, the Portal component has no background color.

```jsx
initialState = { showPortal: false };

const showPortalHandler = () => {
  state.showPortal 
    ? setState({ showPortal: false }) 
    : setState({ showPortal: true });
};

const styles = {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'height': '200px',
  'width': '200px',
  'backgroundColor': 'rgba(255,193,7,0.8)'
};

<div>
  <div id="bee-modal-root"></div>
  {state.showPortal &&
    <Portal>
      <div style={styles}>
        <button onClick={showPortalHandler}>Close Portal</button>
        </div>
    </Portal>
  }
  <button onClick={showPortalHandler}>Show Portal</button>
</div>
```

<br />
<br />

### Portal - className property:

**Adds** additional custom classNames to highest level of the Portal component

```jsx
initialState = { showPortal: false };

const showPortalHandler = () => {
  state.showPortal 
    ? setState({ showPortal: false }) 
    : setState({ showPortal: true });
};

const styles = {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'height': '200px',
  'width': '200px',
  'backgroundColor': 'rgba(255,193,7,0.8)'
};

<div>
  <div id="bee-modal-root"></div>
  {state.showPortal &&
    <Portal className="your-custom-class-name some-more-class-names">
      <div style={styles}>
        <button onClick={showPortalHandler}>Close Portal</button>
      </div>
    </Portal>
  }
  <button onClick={showPortalHandler}>Show Portal</button>
</div>
```

<br />
<br />

### Portal - color and opacity property:

If either the **color** or **opacity** property is used, then **both** are **required**.  This will add a background color and opacity to the Portal

```jsx
initialState = { showPortal: false };

const showPortalHandler = () => {
  state.showPortal 
    ? setState({ showPortal: false }) 
    : setState({ showPortal: true });
};

const styles = {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'height': '200px',
  'width': '200px',
  'backgroundColor': 'rgba(255,193,7,0.8)'
};

<div>
  <div id="bee-modal-root"></div>
  {state.showPortal &&
    <Portal color="black" opacity={0.8}>
      <div style={styles}>
        <button onClick={showPortalHandler}>Close Portal</button>
      </div>
    </Portal>
  }
  <button onClick={showPortalHandler}>Show Portal</button>
</div>
```

