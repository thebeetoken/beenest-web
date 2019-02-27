import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const HomeType = () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <Dropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <DropdownToggle>
        Home Type
      </DropdownToggle>
      <DropdownMenu>
        🏚
      </DropdownMenu>
    </Dropdown>
  );
};

export default HomeType;
