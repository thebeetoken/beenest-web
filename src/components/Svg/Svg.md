### How to setup:

```html
<Svg src="svgName" />
```

<br />

**TODO**

Handle http links

**Note**

1. The Svg component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Svg component can also take a className property that will add classes to the highest level of the Svg component

2. The Svg will takes currentColor as the fill

<br />
<br />

###### Classes you can modify:

- bee-svg

### Svg - default properties:

The Svg component has no default height or width set.  The **src** property is **required** and will look in your assets/svg folder.

```jsx
const styles = {
  'height': '100px',
  'width': '100px'
};

<div style={styles}>
  <Svg src="logo/bee-circle" />
</div>
```

<br />
<br />

### Svg - className property:

**Adds** additional custom classNames to highest level of the Svg component.  You can add height, width, and color directly as a className or you can wrap the Svg in a container (recommended way)

```jsx
const styles = {
  'height': '100px',
  'width': '100px',
  'color': 'rgba(255,193,7,1)'
};

<div style={styles}>
  <Svg 
    className="your-custom-class-name some-more-class-names" 
    src="utils/check" />
</div>
```