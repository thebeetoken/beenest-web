import * as React from 'react';
import { Prompt } from "react-router";
import ListingFormNavContainer from './ListingFormNav.container';
import BeeLink from 'shared/BeeLink';
import GeneralWrapper from 'shared/GeneralWrapper';
import { FormikErrors } from 'formik';
import { History } from 'history';
import { ListingInput } from 'networking/listings';

interface Props {
  history: History;
  id: string;
  isValid: boolean;
  errors: FormikErrors<ListingInput>;
  onSubmit: () => void;
  setNextCrumb: (route?: string) => void;
  showAlert?: boolean;
}

interface itemProps {
  href?: string;
  isNav: boolean;
  target?: string;
  title: string;
  to?: string;
}

const ListingFormNav = ({ errors, history, id, isValid, onSubmit, setNextCrumb, showAlert }: Props): JSX.Element => {
  const listingFormNavConfig = [
    {
      isNav: true,
      title: 'Listing Info',
      to: `/host/listings/${id}/listing_info`,
    },
    {
      isNav: true,
      title: 'Accommodations',
      to: `/host/listings/${id}/accommodations`,
    },
    {
      isNav: true,
      title: 'Pricing & Availability',
      to: `/host/listings/${id}/pricing_availability`,
    },
    {
      isNav: true,
      title: 'Checkin Details',
      to: `/host/listings/${id}/checkin_details`,
    },
  ];
  const renderListingFormNavItems = listingFormNavConfig.map((item: itemProps) => {
    return (
      <div className="host-listings-navigation--items" key={item.title}>
        <BeeLink isNav={item.isNav} to={item.to}>
          {item.title}
        </BeeLink>
      </div>
    );
  });

  return (
    <ListingFormNavContainer>
      <GeneralWrapper width={976}>
        <Prompt
          when={showAlert}
          message={`Listing has unsaved changes ${!isValid ? `due to the following errors: ${JSON.stringify(Object.values(errors), null, 4)}`: ''}. Are you sure you want to proceed?`}>
        </Prompt>
        <nav>
          {renderListingFormNavItems}
        </nav>
        <a onClick={() => {
          if (!isValid) {
            history.push('/host/listings');
          }
          else {
            setNextCrumb('');
            onSubmit();
          }
        }}>
          Save &amp; Exit
        </a>
      </GeneralWrapper>
    </ListingFormNavContainer>
  );
}

export default ListingFormNav;