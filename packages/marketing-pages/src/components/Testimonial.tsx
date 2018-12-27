import React from 'react';
import Props from 'prop-types';
import {
  TestimonialContainer,
  TestimonialImage,
  TestimonialCircle,
  TestimonialText,
  TestimonialTitle,
  TestimonialCopy,
} from '../styles/testimonialStyles';

interface TestimonialProps {
  img: any;
  title: string;
  copy: string;
}

const Testimonial: React.StatelessComponent<TestimonialProps> = ({ img, title, copy }) => {
  return (
    <TestimonialContainer>
      <TestimonialImage>
        <TestimonialCircle style={{ backgroundImage: `url(${img})` }} />
      </TestimonialImage>
      <TestimonialText>
        <TestimonialTitle>{title}</TestimonialTitle>
        <TestimonialCopy>{copy}</TestimonialCopy>
      </TestimonialText>
    </TestimonialContainer>
  );
};

Testimonial.propTypes = {
  img: Props.any,
  title: Props.string,
  copy: Props.string,
};

export default Testimonial;
