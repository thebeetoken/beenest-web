import * as React from 'react';

import CloseButton from 'shared/CloseButton';
import PopUpCardContainer from './PopUpCard.container';

/**
 * This component enables the
 * pop-up card functionality
 * designed for mobile/tablet
 *
 * @author jeremy
 **/

interface Props {
  children: React.ReactNode;
  peekHeight?: number;
  showCard: boolean;
  toggleCard: () => void;
}

const PopUpCard = ({ children, peekHeight, showCard, toggleCard}: Props) => 
  <PopUpCardContainer
    background="light"
    peekHeight={peekHeight}
    showCard={showCard}>
    {showCard &&
      <CloseButton
        height="64px"
        onClose={toggleCard}
        width="64px" />
    }
    {children}
  </PopUpCardContainer>
;

export default PopUpCard;
