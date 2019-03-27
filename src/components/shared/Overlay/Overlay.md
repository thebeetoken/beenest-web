### How to setup:

The Overlay component takes the full width and height of its container, with a z-index of 1.
Because the Overlay is positioned: absolute, the parent container will be required to have the position property set in css.

<br />

```html
<Overlay />
```

<br />

By nature, the Overlay component has no background-color and is positioned absolute.  This means that it should live in a container with the position property set.  

Some use cases are:

1. Adding an overlay over an image
2. Adding an overlay to a custom modal

<br />

**TODO**

Pass an onClick handler to the overlay to increase utility

<br />

**Note**

The Overlay component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Overlay component can also take a className property that will add classes to the highest level of the Overlay component

<br />
<br />

###### Classes you can modify:

- bee-overlay

<br />
<br />

### Overlay - default properties:

The Overlay component has a default height and width of 100vh and 100vw respectively. By default, the Overlay component has no background color

```html
<Overlay />
```

<br />
<br />

### Overlay - color and opacity property:

If either the **color** or **opacity** property is used, then **both** are **required**.  This will add a background color and opacity to the Overlay

```jsx
<div style={{ height: '200px', width: '200px', position: 'relative' }}>
  <Overlay color="style" opacity={0.5} />
</div>
```

