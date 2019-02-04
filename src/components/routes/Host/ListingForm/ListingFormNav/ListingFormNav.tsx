import * as React from 'react';
import { Prompt } from "react-router";
import ListingFormNavContainer from './ListingFormNav.container';
import GeneralWrapper from 'shared/GeneralWrapper';
import { FormikActions, FormikProps, FormikErrors } from 'formik';
import { History } from 'history';
import { ListingInput } from 'networking/listings';
import TabNavBar from 'shared/TabNavBar';

interface Props {
  history: History;
  id: string;
  formikProps: FormikProps<ListingInput>;
  onSubmit: (values: ListingInput, actions: FormikActions<Object>) => void;
  setNextCrumb: (route?: string) => void;
  showAlert?: boolean;
}

const ListingFormNav = ({ formikProps, history, id, onSubmit, setNextCrumb, showAlert }: Props): JSX.Element => {
  const listingFormNavConfig = [
    {
      title: 'Listing Info',
      to: `/host/listings/${id}/listing_info`,
    },
    {
      title: 'Accommodations',
      to: `/host/listings/${id}/accommodations`,
    },
    {
      title: 'Pricing & Availability',
      to: `/host/listings/${id}/pricing_availability`,
    },
    {
      title: 'Check-in Details',
      to: `/host/listings/${id}/checkin_details`,
    },
  ];

  return (
    <ListingFormNavContainer>
      <GeneralWrapper>
        <Prompt
          when={showAlert}
          message={!formikProps.isValid
            ? formatListingErrorsAlert(formikProps.errors)
            : 'Listing has unsaved changes. Are you sure you want to proceed?'}>
        </Prompt>
        <TabNavBar config={listingFormNavConfig} />
        <a onClick={() => {
          if (!formikProps.isValid) {
            history.push('/host/listings');
          }
          else {
            setNextCrumb('');
            onSubmit(formikProps.values, formikProps);
          }
        }}>
          Save &amp; Exit
        </a>
      </GeneralWrapper>
    </ListingFormNavContainer>
  );
}

export default ListingFormNav;

function formatListingErrorsAlert(errors: FormikErrors<ListingInput>): string {
  return `Listing has unsaved changes due to the following errors:\n\n
    ${Object.values(errors).join('\n').toString()}\r\n\r\n
    Are you sure you want to proceed?`;
};
