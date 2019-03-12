import * as React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface Props {
  children: React.ReactNode;
  label: string;
  width?: string;
}

const SearchFilter = ({ children, label, width }: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <Dropdown group isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <DropdownToggle outline className="btn-sm">
        {label}
      </DropdownToggle>
      <DropdownMenu style={{ width }}>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchFilter;
