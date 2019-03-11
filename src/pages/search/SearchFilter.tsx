import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface Props {
  children: React.ReactNode;
  label: String;
}

const SearchFilter = ({ children, label }: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <Dropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <DropdownToggle>
        {label}
      </DropdownToggle>
      <DropdownMenu className="w-100">
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchFilter;
