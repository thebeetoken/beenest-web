import * as React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Col, Container } from 'reactstrap';


// should we create a custom wrapper over this carousel?  a little hard to use
const items = [
  {
    altText: 'This is the first testimonial',
    caption: 'Slide 1',
  },
  {
    altText: 'This could be the second testimonial',
    caption: 'Slide 2',
  },
  {
    altText: 'Sometimes this is the third testimonial',
    caption: 'Slide 3',
  },
];

class LoginTestimonials extends React.Component {
  readonly state = {
    activeIndex: 0,
  };

  animating = false;

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex: number) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const slides = items.map(item => {
      return (
        <CarouselItem className="bee-center-carousel-text" onExiting={this.onExiting} onExited={this.onExited} key={item.altText}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {/* can add image here */}
            <h1 className="text-center text-white mb-2">{item.altText}</h1>
            <CarouselCaption className="d-flex justify-content-center position-relative w-100 p-0" captionText={item.caption} />
          </div>
        </CarouselItem>
      );
    });
    return (
      <Col lg="5" xl="4" className="d-none d-lg-flex align-items-center gradient-half-primary-v1 height-lg-100vh px-0">
        <Container className="px-5">
          <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
            {slides}
            <CarouselIndicators className="position-relative m-0 mt-2" items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
          </Carousel>
        </Container>
      </Col>
    );
  }
}

export default LoginTestimonials;
