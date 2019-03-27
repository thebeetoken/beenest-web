### How to setup:

The Button component can be used like the native button

```html
<Button>Hello, World!</Button>
```

<br />

**TODO**
Update Button Playground with style, clear, and radius properties

<br />

**Note**

1. All of these properties are optional.  You can mix and match to see which combinations suit your 
needs.  

2. The Button component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Button component can also take a className property that will add classes to the highest level of the Button component

<br />
<br />

###### Classes you can modify:

- bee-button
- bee-button--container
- bee-button--content
- bee-button--text
- bee-button--svg-prefix-container (if prefix is provided)
- bee-button--svg-suffix-container (if suffix is provided)

<br />
<br />

### Button - default properties:

The Button component has a default body height of *48px* and *120px* width.  The default text color is *body*, background color is *style*, and font is *title, 8*

```jsx
<Button>Default</Button>
```

<br />
<br />

### Button - className property:

**Adds** additional custom classNames to highest level of the Button component

```jsx
<Button className="your-custom-class-name some-more-class-names">Class Name</Button>
```

<br />
<br />

### Button - color property:

**Changes** the default *body* text color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
<Button color="white">Color</Button>
```

<br />
<br />

### Button - background property:

**Changes** the default *style* button color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
<Button background="error">Background</Button>
```

<br />
<br />

### Button - size property:

**Changes** the height of the button

Options:

1. short
2. regular (default)
3. tall

```jsx
<Button size="tall">Size</Button>
```

<br />
<br />

### Button - prefix property:

**Displays** a prefix svg, default directory is assets/svg.  Can search in nested folders inside the svg folder

```jsx
<Button color="white" prefix="utils/check">Prefix</Button>
```

<br />
<br />

### Button - prefixSize property:

**Increases** the width of the svg prefix container.  Does not change the svg width

Options:

1. zero (default)
2. small 
3. medium

```jsx
<Button prefix="utils/check" prefixSize="medium">Prefix Size</Button>
```

<br />
<br />

### Button - suffix property:

**Displays** a suffix svg, default directory is assets/svg.  Can search in nested folders inside the svg folder

```jsx
<Button suffix="utils/check">Suffix</Button>
```

<br />
<br />

### Button - suffixSize property:

**Increases** the width of the svg suffix container.  Does not change the svg width

Options:

1. zero (default)
2. small 
3. medium

```jsx
<Button suffix="utils/check" suffixSize="medium">Suffix Size</Button>
```

<br />
<br />

### Button - border property:


Will currently *only* take **color** values specified in the colors.ts file.  Default is *core*

```jsx
<Button border="core">Border</Button>
```

<br />
<br />

### Button - noExtraPadding property:

**Removes** the default 2rem *left / right* padding inside the button

```jsx
<Button noExtraPadding>No default left/right padding</Button>
```

<br />
<br />

### Button - noStartPadding property:

**Removes** the default 2rem *left* padding inside the button

```jsx
<Button noStartPadding>No default left padding</Button>
```

<br />
<br />

### Button - noEndPadding property:

**Removes** the default 2rem *right* padding inside the button

```jsx
<Button noEndPadding>No default right padding</Button>
```

<br />
<br />

### Button - noRadius property:

**Removes** the default rounded edges on the button

```jsx
<Button noRadius>No Radius</Button>
```

<br />
<br />

### Button - noFlex property:

**Changes** the default flex: 1 0 auto to *flex: 0 1 auto*

```jsx
<Button noFlex>No Flex (inspect bee-button--content)</Button>
```

<br />
<br />

### Button - layout property:

**Changes** the default flex alignment

Options:

1. start 
2. center (default)
3. end


```jsx
<Button layout="start" prefix="utils/check">Layout</Button>
```

<br />
<br />

### Button - start property:

**Increases** the left padding between the text and svg (if provided) or between the text and the left of the button

Options:

1. default (default)
2. small
3. medium
4. large

```jsx
<Button start="large" layout="start">Start</Button>
```

<br />
<br />

### Button - end property:

**Increases** the right padding between the text and svg (if provided) or between the text and the right of the button

Options:

1. default (default)
2. small
3. medium
4. large

```jsx
<Button end="large" layout="end">End</Button>
```

<br />
<br />

### Button - textStyle property:

**Changes** the default title-8 font size, font weight, and line-height.  Will only take names and values from the typography.ts file

```jsx
<Button textStyle="emp-4">Text Style</Button>
```

<br />
<br />

### Button - isDisabled property:

**Changes** the button to a disabled state.  This can be edited by CSS.

```jsx
<Button isDisabled>Is Loading</Button>
```