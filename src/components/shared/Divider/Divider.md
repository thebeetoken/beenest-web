### How to setup:
```html
<Divider />
```

<br />

**TODO**

Add option to change Divider container height and divider height

<br />
<br />

**Note**

1. All of these properties are optional.  You can mix and match to see which combinations suit your 
needs.  

2. The Divider component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Divider component can also take a className property that will add classes to the highest level of the Divider component

<br />
<br />

###### Classes you can modify:

- bee-divider

<br />
<br />


### Divider - default properties:

The Divider component has a default body height of *18px* and *100%* width.  The divider itself has a default height of *1px* and color of *middle*

```jsx
<Divider />
```

<br />
<br />

### Divider - className property:

**Adds** additional custom classNames to highest level of the Divider component

```jsx
<Divider className="your-custom-class-name some-more-class-names" />
```

<br />
<br />

### Divider - size property:

**Increases** the default 1px height of the divider itself

Options:

1. short (default)
2. tall 
3. huge

```jsx
<Divider size="tall" />
```

<br />
<br />

### Divider - color property:

**Changes** the default *middle* button color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
<Divider color="style" />
```