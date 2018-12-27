import styled from 'styled-components';
import { mediaQuery, testimonialBlue, HeadingTitle } from './indexStyles';

export const TestimonialContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;

export const TestimonialImage = styled.div`
  width: 142px;
  height: 142px;
  margin-right: 32px;
  ${mediaQuery} {
    width: 100px;
    height: 100px;
  }
`;

export const TestimonialCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eceff1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const TestimonialText = styled.div`
  flex: 1;
`;

export const TestimonialTitle = HeadingTitle.extend`
  ${mediaQuery} {
    font-size: 18px;
    text-align: left;
  }
`;

export const TestimonialCopy = styled.p`
  color: ${testimonialBlue};
  font-weight: 100;
  white-space: pre-line;
`;
