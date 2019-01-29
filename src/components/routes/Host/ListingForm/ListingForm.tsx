import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { Listing, GET_HOST_LISTINGS, UPDATE_LISTING, ListingInput } from 'networking/listings';
import { Formik, Form, FormikProps, FormikActions } from 'formik';
import * as Yup from 'yup';

import AccommodationsForm from './AccommodationsForm';
import CheckinDetailsForm from './CheckinDetailsForm';
import ListingInfoForm from './ListingInfoForm';
import PricingAvailabilityForm from './PricingAvailabilityForm';
import ListingFormNav from './ListingFormNav';
import ListingFormContainer from './ListingForm.container';
import GeneralWrapper from 'shared/GeneralWrapper';
import NotFound from 'routes/NotFound';
import Button from 'components/shared/Button';
import timeOptions from 'utils/timeOptions';
import { formatError } from 'utils/formatter';

interface FormValues {
  [name: string]: boolean | string | string[] | number | object | undefined;
}

const defaultValues: FormValues = {
  addressLine1: '',
  addressLine2: '',
  amenities: [],
  checkInTime: {
    from: '3:00 p.m.',
    to: '10:00 p.m.',
  },
  checkOutTime: '11:00 a.m.',
  city: '',
  country: 'USA',
  description: '',
  homeType: 'Entire Place',
  // housing: '',
  houseRules: '',
  icalUrls: [],
  isActive: false,
  lat: 0,
  lng: 0,
  listingPicUrl: '',
  maxGuests: 1,
  minimumNights: 1,
  numberOfBathrooms: 0,
  numberOfBedrooms: 1,
  photos: [],
  postalCode: '',
  pricePerNightUsd: 100,
  securityDepositUsd: 50,
  sharedBathroom: 'No',
  sleepingArrangement: '',
  state: '',
  title: '',
};

interface Props extends RouterProps {
  listing: Listing;
  updateListing: (id: string, input: ListingInput) => Promise<Listing>;
}

const ListingFormSchema = Yup.object().shape({
  addressLine1: Yup.string().min(1, formatError('street address')),
  addressLine2: Yup.string(),
  amenities: Yup.array().of(Yup.string()),
  checkInTime: Yup.object()
    .shape({
      from: Yup.string().oneOf(timeOptions),
      to: Yup.string().oneOf(timeOptions),
    })
    .test('validCheckOutTime', 'Check-in (from) and Check-in (to) cannot be the same.', function() {
      const { from, to } = this.parent.checkInTime;
      return from !== to;
    }),
  checkOutTime: Yup.string().oneOf(timeOptions),
  city: Yup.string().max(60, 'Too Long!'),
  country: Yup.string(),
  description: Yup.string().min(1, formatError('description of your listing')),
  homeType: Yup.string().min(1, formatError('home type')),
  houseRules: Yup.string().min(1, formatError('set of house rules')),
  icalUrls: Yup.array().of(Yup.string().url('${value} is not a valid ical url. ')),
  isActive: Yup.bool(),
  lat: Yup.number()
    .moreThan(-90)
    .lessThan(90),
  lng: Yup.number()
    .moreThan(-180)
    .lessThan(180),
  listingPicUrl: Yup.string().url(formatError('cover photo')),
  maxGuests: Yup.number()
    .moreThan(0, 'Max guests must be greater than 0.')
    .lessThan(51, 'Max guests must not exceed 50.'),
  minimumNights: Yup.number()
    .moreThan(0, 'Minimum Nights must be greater than 0.'),
  numberOfBathrooms: Yup.number()
    .min(0, 'Number of bathrooms must be greater than or equal to 0.'),
  numberOfBedrooms: Yup.number()
    .min(0, 'Number of bedrooms must be greater than or equal to 0.'),
  photos: Yup.array().of(Yup.string().url(formatError('set of photos'))),
  postalCode: Yup.string().min(1, formatError('postal code')).max(45, 'Too Long!'),
  pricePerNightUsd: Yup.number()
    .moreThan(0, 'Price per night must be greater than 0.'),
  securityDepositUsd: Yup.number()
    .min(0, 'Security Deposit must be greater than or equal to 0.'),
  sharedBathroom: Yup.string(),
  sleepingArrangement: Yup.string().min(1, formatError('sleeping arrangement')),
  state: Yup.string()
    .min(1, 'Too Short!')
    .max(60, 'Too Long!'),
  title: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!'),
});

const formCrumbs = ['listing_info', 'accommodations', 'pricing_availability', 'checkin_details'];

interface State {
  nextCrumb: string;
}

class ListingForm extends React.Component<Props, State> {
  readonly state: State = {
    nextCrumb: '',
  };

  componentDidMount = () => {
    const path = this.props.history.location.pathname;
    const currentCrumb = path.substr(path.lastIndexOf('/') + 1);
    const nextCrumb = formCrumbs[formCrumbs.indexOf(currentCrumb) + 1];
    this.setState({
      nextCrumb: nextCrumb ? `${this.props.match.params.id}/${nextCrumb}` : '',
    });
  };

  render() {
    const { props } = this;
    return (
      <ListingFormContainer>
        <Formik
          initialValues={populateListingForm(defaultValues, props.listing)}
          isInitialValid
          validationSchema={ListingFormSchema}
          onSubmit={(values: ListingInput, actions: FormikActions<FormValues>) => {
            actions.setSubmitting(true);
            const { updateListing } = props;
            const { id } = props.match.params;
            return updateListing(id, values)
              .then(() => {
                props.history.push(`/host/listings/${this.state.nextCrumb}`);
              })
              .catch((error: Error) => {
                alert(`${error}. If this continues to occur, please contact us at support@beetoken.com`);
                console.error(error);
                return actions.setSubmitting(false);
              });
          }}
        >
          {(FormikProps: FormikProps<ListingInput>) => (
            <>
              <ListingFormNav
                errors={FormikProps.errors}
                history={props.history}
                id={props.match.params.id}
                isValid={FormikProps.isValid}
                showAlert={!FormikProps.isSubmitting && FormikProps.dirty}
                setNextCrumb={this.setNextCrumb}
                onSubmit={FormikProps.submitForm}
              />
              <GeneralWrapper align="flex-start" direction="row" justify="flex-start" width={976}>
                <Form>
                  <Switch>
                    <Route
                      exact
                      path="/host/listings/:id/accommodations"
                      render={() => <AccommodationsForm {...FormikProps} />}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/checkin_details"
                      render={() => <CheckinDetailsForm {...FormikProps} />}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/listing_info"
                      render={() => <ListingInfoForm {...FormikProps} />}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/pricing_availability"
                      render={() => <PricingAvailabilityForm {...FormikProps} />}
                    />
                    <Redirect exact from="/host/listings/:id/edit" to="/host/listings/:id/listing_info" />
                    <Route component={NotFound} />
                  </Switch>

                  <Button
                    onClick={() => {
                      if (!FormikProps.isValid) {
                        alert(`Cannot save changes due to errors: ${JSON.stringify(Object.values(FormikProps.errors), null, 4)}`);
                      }
                      FormikProps.submitForm();
                    }}
                    textStyle="title-8"
                    type="button"
                  >
                    Save &amp; Continue
                  </Button>
                </Form>
                <aside />
              </GeneralWrapper>
            </>
          )}
        </Formik>
      </ListingFormContainer>
    );
  }

  setNextCrumb = (nextCrumb: string) => this.setState({ nextCrumb });
}

export default compose(
  graphql(UPDATE_LISTING, {
    props: ({ mutate }: any) => ({
      updateListing: (id: string, listing: ListingInput) => {
        const input = JSON.parse(JSON.stringify(listing), omitFields);
        return mutate({
          variables: { id, input },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { updateListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            const index = hostListings.findIndex((listing: Listing) => listing.id === id);
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [
                  ...hostListings.slice(0, index),
                  {
                    ...hostListings[index],
                    ...updateListing,
                  },
                  ...hostListings.slice(index + 1),
                ],
              },
            });
          },
        });
      },
    }),
  })
)(ListingForm);

function populateListingForm(fields: FormValues, listing: ListingInput): FormValues {
  return Object.keys(fields).reduce((result: any, key) => {
    result[key] = listing[key] || fields[key];
    return result;
  }, {});
}

function omitFields(key: string, value: any) {
  return ['id', '__typename', 'createdAt'].includes(key) ? undefined : value;
}
