import * as React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

type Props = Partial<{
  alt: string;
  body: string;
  center: boolean;
  className: string;
  subtitle: string;
  src: string;
  title: string;
}>;

const TestimonialCard = (props: Props) => {
  const { alt, body, center, className, subtitle, src, title } = props;
  return (
    <Card className={`border-0 align-items-center ${className ? className : ''}`.trim()}>
      <CardImg top className="w-100" src={src} alt={alt} />
      <CardBody className={center ? 'text-center' : ''}>
        <CardTitle className="h5 mb-2">{title}</CardTitle>
        <CardSubtitle className="small">{subtitle}</CardSubtitle>
        <CardText className="small">{body}</CardText>
      </CardBody>
    </Card>
  );
};

export default TestimonialCard;
