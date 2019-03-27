### How to setup:

The Fab component can be used like the native button

```html
<Fab>Fab</Fab>
```

<br />

**TODO**
Update Fab Playground with style, clear, width, height, and radius properties

<br />

**Note**

1. All of these properties are optional.  You can mix and match to see which combinations suit your 
needs.  

2. The Fab component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Fab component can also take a className property that will add classes to the highest level of the Fab component

<br />
<br />

###### Classes you can modify:

- bee-fab
- bee-fab--container
- bee-fab--svg-container (if provided)
- bee-fab--content
- bee-fab--text (if provided)

<br />
<br />

### Fab - default properties:

The Fab component as a default height and width of *80px*, a default background color of *style* and font color of *body*

```jsx
<Fab>Default</Fab>
```

<br />
<br />

### Fab - className property:

**Adds** additional custom classNames to highest level of the Fab component

```jsx
<Fab className="your-custom-class-name some-more-class-names">Classes</Fab>
```

<br />
<br />

### Fab - inline text:

**Adds** text inside of the Fab component

```jsx
<Fab>Text</Fab>
```

<br />
<br />

### Fab - color property:

**Changes** the default *body* text color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
<Fab color="white">Color</Fab>
```

<br />
<br />

### Fab - background property:

**Changes** the default *style* Fab color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
<Fab background="error">Color</Fab>
```

<br />
<br />

### Fab - textStyle property:

**Changes** the default title-8 font size, font weight, and line-height.  Will only take names and values from the typography.ts file

```jsx
<Fab textStyle="emp-4">Font</Fab>
```

<br />
<br />

### Fab - icon property:

**Adds** a svg icon to the Fab component.   Can search in nested folders inside the svg folder

```jsx
<Fab icon="logo/bee-circle">Icon</Fab>
```