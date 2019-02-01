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
import { History } from 'history';
import AsideContent from './AsideContent';
import { ApolloError } from 'apollo-client';

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
  addressLine1: Yup.string()
    .min(1, minStringError('Address Line 1')),
  addressLine2: Yup.string(),
  amenities: Yup.array()
    .of(Yup.string()),
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
  city: Yup.string().max(60, maxStringError('City')),
  country: Yup.string(),
  description: Yup.string()
    .min(1, minStringError('Description')),
  homeType: Yup.string().min(1, minStringError('Home Type')),
  houseRules: Yup.string()
    .min(1, minStringError('House Rules')),
  icalUrls: Yup.array().of(Yup.string().url('${value} is not a valid ical url. ')),
  isActive: Yup.bool(),
  lat: Yup.number()
    .moreThan(-90)
    .lessThan(90),
  lng: Yup.number()
    .moreThan(-180)
    .lessThan(180),
  listingPicUrl: Yup.string()
    .url(),
  maxGuests: Yup.number()
    .min(1, minNumberError('Max Guests'))
    .max(50, maxNumberError('Max Guests')),
  minimumNights: Yup.number()
    .min(1, minNumberError('Minimum Nights')),
  numberOfBathrooms: Yup.number()
    .min(0, minNumberError('Number of Bathrooms')),
  numberOfBedrooms: Yup.number()
    .min(0, minNumberError('Number of Bedrooms')),
  photos: Yup.array()
    .of(Yup.string().url()),
  postalCode: Yup.string()
    .min(1, minStringError('Postal Code'))
    .max(45, maxStringError('Postal Code')),
  pricePerNightUsd: Yup.number()
    .min(1, minNumberError('Price Per Night')),
  securityDepositUsd: Yup.number()
    .min(0, minNumberError('Security Deposit')),
  sharedBathroom: Yup.string(),
  sleepingArrangement: Yup.string()
    .min(1, minStringError('Sleeping Arrangement')),
  state: Yup.string()
    .min(1, minStringError('State'))
    .max(60, maxStringError('State')),
  title: Yup.string()
    .min(5, minStringError('Title'))
    .max(50, maxStringError('Title')),
});

const formCrumbs = ['listing_info', 'accommodations', 'pricing_availability', 'checkin_details'];

const defaultFocus: { [name: string]: string } = {
  listing_info: 'homeType',
  accommodations: 'sleepingArrangement',
  pricing_availability: 'maxGuests',
  checkin_details: 'checkInTime',
};

interface AsideHeadersInterface {
  [name: string]: React.ReactNode;
}

const AsideHeaders: AsideHeadersInterface = {
  listing_info: <header>Let's get started! This section will inform guests about where they'll be staying and what to expect. The more descriptive, the better.</header>,
  accommodations: <header>This section allows guests to determine if your space meets their needs. The <strong>type</strong> of bed is very important especially for larger groups.</header>,
  pricing_availability: <header>Let guests know how many people can stay at your place and how much it will cost right away.</header>,
  checkin_details: <header>You're almost finished! Let guests know the times they're able to check in and out as well as the rules they must abide by.</header>,
}

interface State {
  nextCrumb: string;
  focus: string;
}

class ListingForm extends React.Component<Props, State> {
  readonly state: State = {
    nextCrumb: '',
    focus: defaultFocus[getCurrentCrumb(this.props.history)],
  };

  componentDidMount = () => {
    const currentCrumb = getCurrentCrumb(this.props.history);
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
          onSubmit={this.handleSubmit}>
          {(FormikProps: FormikProps<ListingInput>) => (
            <>
              <ListingFormNav
                formikProps={FormikProps}
                history={props.history}
                id={props.match.params.id}
                showAlert={!FormikProps.isSubmitting && FormikProps.dirty}
                setNextCrumb={this.setNextCrumb}
                onSubmit={this.handleSubmit}
              />
              <GeneralWrapper align="flex-start" direction="row" justify="flex-start" width={976}>
                <Form>
                  <Switch>
                    <Route
                      exact
                      path="/host/listings/:id/accommodations"
                      render={() => <AccommodationsForm {...FormikProps} setFocus={this.handleFocus} />}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/checkin_details"
                      render={() => <CheckinDetailsForm {...FormikProps}  setFocus={this.handleFocus} />}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/listing_info"
                      render={() => <ListingInfoForm {...FormikProps} setFocus={this.handleFocus} />}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/pricing_availability"
                      render={() => <PricingAvailabilityForm {...FormikProps} setFocus={this.handleFocus} />}
                    />
                    <Redirect exact from="/host/listings/:id/edit" to="/host/listings/:id/listing_info" />
                    <Route component={NotFound} />
                  </Switch>

                  <Button
                    onClick={() => {
                      if (!FormikProps.isValid) {
                        alert(`Cannot save changes due to errors:\n\n${Object.values(FormikProps.errors).join('\n').toString()}`);
                        // alert(`Cannot save changes due to errors: ${JSON.stringify(Object.values(FormikProps.errors), null, 4)}`);
                      }
                      FormikProps.submitForm();
                    }}
                    type="button"
                  >
                    Save &amp; Continue
                  </Button>
                </Form>
                <aside>
                  {AsideHeaders[getCurrentCrumb(this.props.history)]}
                  {AsideContent[this.state.focus]}
                </aside>
              </GeneralWrapper>
            </>
          )}
        </Formik>
      </ListingFormContainer>
    );
  }

  handleFocus = (focus: string) => this.setState({ focus });
  setNextCrumb = (nextCrumb: string) => {
    this.setState({ 
      nextCrumb,
      focus: defaultFocus[nextCrumb],
    });
  }

  handleSubmit = (values: ListingInput, actions: FormikActions<FormValues>) => {
    const { props } = this;
    actions.setSubmitting(true);
    const { updateListing } = props;
    const { id } = props.match.params;
    return updateListing(id, values)
      .then(() => {
        props.history.push(`/host/listings/${this.state.nextCrumb}`);
      })
      .catch((error: ApolloError) => {
        const formattedError = error.graphQLErrors ? error.graphQLErrors.map(e => e.message).join('\r\n').toString() : error;
        alert(`${formattedError}\r\n\r\nIf this continues to occur, please contact us at support@beenest.com`);
        console.error(error);
        return actions.setSubmitting(false);
      });
  }
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

function getCurrentCrumb(history: History): string {
  const path = history.location.pathname;
  return path.substr(path.lastIndexOf('/') + 1);
}

function minStringError(readableName: string) {
  return `${readableName}` + ' must be at least ${min} characters long.';
}

function maxStringError(readableName: string) {
  return `${readableName}` + ' must not exceed ${max} characters.';
}

function minNumberError(readableName: string) {
  return `${readableName}` + ' must be greater than or equal to ${min}.';
}

function maxNumberError(readableName: string) {
  return `${readableName}` + ' must be less than or equal to ${min}.';
}
