import * as React from 'react';
import { Jumbotron as ReactstrapJumbotron } from 'reactstrap';

type Props = Partial<{
  children: React.ReactNode;
  className: string;
  fluid: boolean;
}>

const Jumbotron = (props: Props) => {
  return (
    <ReactstrapJumbotron className={`mb-0 pb-0 pt-9 bg-white ${(props.className || '')}`.trim()} fluid={props.fluid}>
      {props.children}
    </ReactstrapJumbotron>
  );
};

export default Jumbotron;