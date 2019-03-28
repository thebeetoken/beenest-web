### How to setup:

```html
<LazyImage src="imagePath" />
```

<br />

**TODO**

Handle lazy loading for images that are about to be in the viewport

<br />
<br />

**Note**

The LazyImage component styles are not locked, but all classes are prefixed with `bee-` so they will not be accidently overwritten.  The LazyImage component can also take a className property that will add classes to the highest level of the LazyImage component

<br />
<br />

###### Classes you can modify:

- bee-lazy-image

<br />
<br />

### LazyImage - default properties:

The LazyImage component has a default height and width of *100%*, so you'll need to add a height and width on the class.  The **src** property is **required** and will look in your assets/images folder, or can also take a `http` link to an image.  There is a default opacity of 0 and when the image is loaded the opacity will transition to 1.

```jsx
<LazyImage src="sunday.jpg" />
```

<br />
<br />

### LazyImage - className property:

**Adds** additional custom classNames to highest level of the LazyImage component

```jsx
<LazyImage 
  className="your-custom-class-name some-more-class-names" 
  src="sunday.jpg"
  style={styles} />

const styles = {
  'height': '300px',
  'width': '300px'
}

```

<br />
<br />

### LazyImage - alt property:

**Adds** a value to the native img `alt` property

```jsx
<LazyImage 
  src="sunday.jpg" 
  alt="Sunday Funday" 
  style={styles} />

const styles = {
  'height': '300px',
  'width': '300px'
}
```

<br />
<br />

### LazyImage - placeholder property:

**Adds** a placeholder image while the main image is being lazy loaded.  The default opacity of 0 will prevent the placeholder from being shown.  You can add a className that changes the default opacity to a more visible value to see the placeholder.  Additionally, adding a main src image that is much larger than your placeholder image will help you test the placeholder image

```jsx
<LazyImage 
  src="sunday.jpg" 
  placeholder="sammich.jpg" 
  style={styles}/>

const styles = {
  'height': '300px',
  'width': '300px'
}
```