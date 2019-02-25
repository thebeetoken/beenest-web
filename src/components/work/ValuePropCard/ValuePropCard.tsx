import * as React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';

type Props = Partial<{
  alt: string;
  body: string;
  center: boolean;
  className: string;
  noXPadding: boolean;
  noYPadding: boolean;
  src: string;
  title: string;
}>

const ValuePropCard = (props: Props) => {
  const { alt, body, center, className, noXPadding, noYPadding, src, title } = props;
  return (
    <Card className={`border-0 align-items-center ${className ? className : ''}`.trim()}>
      <CardImg top className="w-60" src={src} alt={alt} />
      <CardBody className={`${center ? 'text-center' : ''} ${noXPadding ? 'px-0' : ''} ${noYPadding ? 'py-0' : ''}`.trim()}>
        <CardTitle className="h5 mb-2">{title}</CardTitle>
        <CardText className="small">{body}</CardText>
      </CardBody>
    </Card>
  );
}

export default ValuePropCard;