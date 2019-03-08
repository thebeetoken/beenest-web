import * as React from 'react';

import ListItemContainer from './ListItem.container';

/**
 * This component is a
 * List Item.
 *
 * @author jeremy, kevin
 *
 * Created: September 9, 2018
 **/

interface Props {
  background?: string;
  children: React.ReactNode;
  className?: string;
  end?: string;
  onClick?: () => void;
  font?: string;
  hover?: string;
  hoverOpacity?: number;
  noFlex?: boolean;
  noHover?: boolean;
  prefixColor?: string;
  prefixSize?: string;
  start?: string;
  suffixColor?: string;
  suffixSize?: string;
  textAlign?: string;
  textColor?: string;
  textTransform?: string;
  transparent?: boolean;
}


const ListItem = (props: Props) => (
  <ListItemContainer
    className={`bee-list-item`}
    {...props}>
    {props.children && props.children}
  </ListItemContainer>
);


export default ListItem;

