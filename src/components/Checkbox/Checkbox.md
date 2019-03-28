### How to setup:

You should have a dedicated state value and setState handlers for each checkbox.
In this example, the variable names reflect the attributes given to the checkboxes,
but the variables names are up to you to change.

<br />

### Basic state setup:

<br />

```js static
  readonly state = {
    classNameCheckboxChecked: false,
    colorCheckboxChecked: false,
    defaultCheckboxChecked: false,
    hoverColorCheckboxChecked: false,
    hoverOpacityCheckboxChecked: false,
    iconCheckboxChecked: false
    textCheckboxChecked: false
  };

  handleClassNameCheckboxChange = () => this.setState({ 
    classNameCheckboxChecked: !classNameCheckboxChecked 
  })
  handleColorCheckboxChange = () => this.setState({ 
    colorCheckboxChecked: !colorCheckboxChecked 
  })
  handleDefaultCheckboxChange = () => this.setState({ 
    defaultCheckboxChecked: !defaultCheckboxChecked 
  })
  handleHoverColorCheckboxChange = () => this.setState({ 
    hoverColorCheckboxChecked: !hoverColorCheckboxChecked 
  })
  handleHoverOpacityCheckboxChange = () => this.setState({ 
    hoverOpacityCheckboxChecked: !hoverOpacityCheckboxChecked 
  })
  handleIconCheckboxChange = () => this.setState({ 
    iconCheckboxChecked: !iconCheckboxChecked 
  })
  handleTextCheckboxChange = () => this.setState({ 
    textCheckboxChecked: !textCheckboxChecked 
  })
```

<br />
<br />

**Note**

1. For the examples to appear on styleguidist, we have to format them in a certain style.  
The example code above is the preferred method of using state and handlers to change your state

2. The Checkbox component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The Checkbox component can also take a className property that will add classes to the highest level of the Checkbox component

<br />
<br />

###### Classes you can modify:

- bee-checkbox
- bee-checkmark--container
- bee-checkbox--svg-container

<br />
<br />

### Checkbox - default properties:

The checkbox has a default border and icon color of **core** and hover color and opacity of **style** and **0.25**

```jsx
initialState = { defaultCheckboxChecked: false };

const handleDefaultCheckboxChange = () => {
  state.defaultCheckboxChecked 
    ? setState({ defaultCheckboxChecked: false }) 
    : setState({ defaultCheckboxChecked: true });
};

<Checkbox 
  checked={state.defaultCheckboxChecked} 
  onChange={handleDefaultCheckboxChange} />
```

<br />
<br />

### Checkbox - className property:

**Adds** additional custom classNames to highest level of the Checkbox component

```jsx
initialState = { classNameCheckboxChecked: false };

const handleClassNameCheckboxChange = () => {
  state.classNameCheckboxChecked 
    ? setState({ classNameCheckboxChecked: state.classNameCheckboxChecked })
    : setState({ classNameCheckboxChecked: true });
};

<Checkbox 
  className="your-custom-class-name some-more-class-names" 
  checked={state.classNameCheckboxChecked} 
  onChange={handleClassNameCheckboxChange} />
```

<br />
<br />

### Checkbox - color property:

**Changes** the default *core* checkbox color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
initialState = { colorCheckboxChecked: false };

const handleColorCheckboxChange = () => {
  state.colorCheckboxChecked 
    ? setState({ colorCheckboxChecked: false }) 
    : setState({ colorCheckboxChecked: true });
};

<Checkbox 
  color="style" 
  checked={state.colorCheckboxChecked} 
  onChange={handleColorCheckboxChange} />
```

<br />
<br />

### Checkbox - hoverColor property:

**Changes** the default *style* hover color.  Will currently *only* take **color** values specified in the colors.ts file.

```jsx
initialState = { hoverColorCheckboxChecked: false };

const handleHoverColorCheckboxChange = () => {
  state.hoverColorCheckboxChecked 
    ? setState({ hoverColorCheckboxChecked: false }) 
    : setState({ hoverColorCheckboxChecked: true });
};

<Checkbox 
  hoverColor="error" 
  checked={state.hoverColorCheckboxChecked} 
  onChange={handleHoverColorCheckboxChange} />
```

<br />
<br />

### Checkbox - hoverOpacity property:

**Changes** the default *0.25* hover opacity.  Can receive a numerical value from 0 - 1

```jsx
initialState = { hoverOpacityCheckboxChecked: false };

const handleHoverOpacityCheckboxChange = () => {
  state.hoverOpacityCheckboxChecked 
    ? setState({ hoverOpacityCheckboxChecked: false }) 
    : setState({ hoverOpacityCheckboxChecked: true });
};

<Checkbox 
  hoverColor="secondary" 
  hoverOpacity={0.3} 
  checked={state.hoverOpacityCheckboxChecked} 
  onChange={handleHoverOpacityCheckboxChange} />
```

<br />
<br />

### Checkbox - icon property:

**Changes** the default *checked* icon.  Default directory is assets/svg and can search in nested folders inside the svg folder

```jsx
initialState = { iconCheckboxChecked: false };

const handleIconCheckboxChange = () => {
  state.iconCheckboxChecked 
    ? setState({ iconCheckboxChecked: false }) 
    : setState({ iconCheckboxChecked: true });
};

<Checkbox 
  icon="logo/bee-circle" 
  checked={state.iconCheckboxChecked} 
  onChange={handleIconCheckboxChange} />
```

<br />
<br />

### Checkbox - inline text:

You can add clickable text inside the Checkbox component

```jsx
initialState = { textCheckboxChecked: false };

const handleTextCheckboxChange = () => {
  state.textCheckboxChecked 
    ? setState({ textCheckboxChecked: state.textCheckboxChecked }) 
    : setState({ textCheckboxChecked: true });
};

<Checkbox 
  checked={state.textCheckboxChecked} 
  onChange={handleTextCheckboxChange}>
  You can also add clickable text to the checkbox
</Checkbox>
```