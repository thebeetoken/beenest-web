import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface Props {
  children: React.ReactNode;
  label: String;
}

const SearchFilter = ({ children, label }: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <Dropdown group isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <DropdownToggle outline className="btn-sm">
        {label}
      </DropdownToggle>
      <DropdownMenu className="bee-search-menu">
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchFilter;
