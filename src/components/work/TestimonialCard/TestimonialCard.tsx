import * as React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

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
    <Card className={`border-0 align-items-center bg-transparent ${className ? className : ''}`.trim()}>
      <CardImg top className="w-100 rounded" src={src} alt={alt} />
      <CardBody className={`${center ? 'text-center' : ''} bg-white shadow-sm mt-n6 mx-3 rounded`}>
        <CardTitle className="h6 font-weight-normal mb-2">
          {title}
        </CardTitle>
        <CardSubtitle className="small mb-3">
          <p>
            {subtitle}
          </p>
        </CardSubtitle>
        <CardText className="small">{body}</CardText>
      </CardBody>
    </Card>
  );
};

export default TestimonialCard;
