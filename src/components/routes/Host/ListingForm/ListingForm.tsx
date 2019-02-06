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
import Button from 'shared/Button';
import timeOptions from 'utils/timeOptions';
import { History } from 'history';
import ListingHelper from './ListingHelper';
import { ApolloError } from 'apollo-client';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';

enum ListingField {
  ADDRESS_LINE_1 = 'addressLine1',
  ADDRESS_LINE_2 = 'addressLine2',
  AMENITIES = 'amenities',
  CHECK_IN_TIME = 'checkInTime',
  CHECK_OUT_TIME = 'checkOutTime',
  CITY = 'city',
  COUNTRY = 'country',
  DESCRIPTION = 'description',
  HOME_TYPE = 'homeType',
  HOUSE_RULES = 'houseRules',
  ICAL_URLS = 'icalUrls',
  IS_ACTIVE = 'isActive',
  LAT = 'lat',
  LNG = 'lng',
  LISTING_PIC_URL = 'listingPicUrl',
  MAX_GUESTS = 'maxGuests',
  MINIMUM_NIGHTS = 'minimumNights',
  NUMBER_OF_BATHROOMS = 'numberOfBathrooms',
  NUMBER_OF_BEDROOMS = 'numberOfBedrooms',
  PHOTOS = 'photos',
  POSTAL_CODE = 'postalCode',
  PRICE_PER_NIGHT_USD = 'pricePerNightUsd',
  SECURITY_DEPOSIT_USD = 'securityDepositUsd',
  SHARED_BATHROOM = 'sharedBathroom',
  SLEEPING_ARRANGEMENT = 'sleepingArrangement',
  STATE = 'state',
  TITLE = 'title',
}

interface FormValues {
  [name: string]: boolean | string | string[] | number | object | undefined;
}

const defaultValues: FormValues = {
  [ListingField.ADDRESS_LINE_1]: '',
  [ListingField.ADDRESS_LINE_2]: '',
  [ListingField.AMENITIES]: [],
  [ListingField.CHECK_IN_TIME]: {
    from: '3:00 p.m.',
    to: '10:00 p.m.',
  },
  [ListingField.CHECK_OUT_TIME]: '11:00 a.m.',
  [ListingField.CITY]: '',
  [ListingField.COUNTRY]: 'USA',
  [ListingField.DESCRIPTION]: '',
  [ListingField.HOME_TYPE]: 'Entire Place',
  [ListingField.HOUSE_RULES]: '',
  [ListingField.ICAL_URLS]: [],
  [ListingField.IS_ACTIVE]: false,
  [ListingField.LAT]: 0,
  [ListingField.LNG]: 0,
  [ListingField.LISTING_PIC_URL]: '',
  [ListingField.MAX_GUESTS]: 1,
  [ListingField.MINIMUM_NIGHTS]: 1,
  [ListingField.NUMBER_OF_BATHROOMS]: 0,
  [ListingField.NUMBER_OF_BEDROOMS]: 1,
  [ListingField.PHOTOS]: [],
  [ListingField.POSTAL_CODE]: '',
  [ListingField.PRICE_PER_NIGHT_USD]: 100,
  [ListingField.SECURITY_DEPOSIT_USD]: 50,
  [ListingField.SHARED_BATHROOM]: 'No',
  [ListingField.SLEEPING_ARRANGEMENT]: '',
  [ListingField.STATE]: '',
  [ListingField.TITLE]: '',
};

interface Props extends RouterProps {
  listing: Listing;
  updateListing: (id: string, input: ListingInput) => Promise<Listing>;
}

const ListingFormSchema = Yup.object().shape({
  [ListingField.ADDRESS_LINE_1]: Yup.string().min(1, minStringError('Address Line 1')),
  [ListingField.ADDRESS_LINE_2]: Yup.string(),
  [ListingField.AMENITIES]: Yup.array().of(Yup.string()),
  [ListingField.CHECK_IN_TIME]: Yup.object()
    .shape({
      from: Yup.string().oneOf(timeOptions),
      to: Yup.string().oneOf(timeOptions),
    })
    .test('validCheckOutTime', 'Check-in (from) and Check-in (to) cannot be the same.', function() {
      const { from, to } = this.parent.checkInTime;
      return from !== to;
    }),
  [ListingField.CHECK_OUT_TIME]: Yup.string().oneOf(timeOptions),
  [ListingField.CITY]: Yup.string().max(60, maxStringError('City')),
  [ListingField.COUNTRY]: Yup.string(),
  [ListingField.DESCRIPTION]: Yup.string().min(1, minStringError('Description')),
  [ListingField.HOME_TYPE]: Yup.string().min(1, minStringError('Home Type')),
  [ListingField.HOUSE_RULES]: Yup.string().min(1, minStringError('House Rules')),
  [ListingField.ICAL_URLS]: Yup.array().of(Yup.string().url('${value} is not a valid ical url. ')),
  [ListingField.IS_ACTIVE]: Yup.bool(),
  [ListingField.LAT]: Yup.number()
    .moreThan(-90)
    .lessThan(90),
  [ListingField.LNG]: Yup.number()
    .moreThan(-180)
    .lessThan(180),
  [ListingField.LISTING_PIC_URL]: Yup.string().url(),
  [ListingField.MAX_GUESTS]: Yup.number()
    .min(1, minNumberError('Max Guests'))
    .max(50, maxNumberError('Max Guests')),
  [ListingField.MINIMUM_NIGHTS]: Yup.number().min(1, minNumberError('Minimum Nights')),
  [ListingField.NUMBER_OF_BATHROOMS]: Yup.number().min(0, minNumberError('Number of Bathrooms')),
  [ListingField.NUMBER_OF_BEDROOMS]: Yup.number().min(0, minNumberError('Number of Bedrooms')),
  [ListingField.PHOTOS]: Yup.array().of(Yup.string().url()),
  [ListingField.POSTAL_CODE]: Yup.string()
    .min(1, minStringError('Postal Code'))
    .max(45, maxStringError('Postal Code')),
  [ListingField.PRICE_PER_NIGHT_USD]: Yup.number().min(1, minNumberError('Price Per Night')),
  [ListingField.SECURITY_DEPOSIT_USD]: Yup.number().min(0, minNumberError('Security Deposit')),
  [ListingField.SHARED_BATHROOM]: Yup.string(),
  [ListingField.SLEEPING_ARRANGEMENT]: Yup.string().min(1, minStringError('Sleeping Arrangement')),
  [ListingField.STATE]: Yup.string()
    .min(1, minStringError('State'))
    .max(60, maxStringError('State')),
  [ListingField.TITLE]: Yup.string()
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
  listing_info: (
    <header>
      Let's get started! This section will inform guests about where they'll be staying and what to expect. The more
      descriptive, the better.
    </header>
  ),
  accommodations: (
    <header>
      This section allows guests to determine if your space meets their needs. <strong>Note:</strong> Type of bed is
      important, especially for larger groups. e.g. 1 Queen, 2 Double, 3 Kings.
    </header>
  ),
  pricing_availability: (
    <header>Let guests know how many people can stay at your place and how much it will cost right away.</header>
  ),
  checkin_details: (
    <header>
      You're almost finished! Let guests know the times they're able to check in and out as well as the rules they must
      abide by.
    </header>
  ),
};

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
          onSubmit={this.handleSubmit}
        >
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
              <GeneralWrapper align="flex-start" direction="row" justify="flex-start">
                <Form>
                  <Switch>
                    <Route
                      exact
                      path="/host/listings/:id/accommodations"
                      render={() => (
                        <AccommodationsForm {...FormikProps} ListingField={ListingField} setFocus={this.handleFocus} />
                      )}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/checkin_details"
                      render={() => (
                        <CheckinDetailsForm {...FormikProps} ListingField={ListingField} setFocus={this.handleFocus} />
                      )}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/listing_info"
                      render={() => (
                        <ListingInfoForm {...FormikProps} ListingField={ListingField} setFocus={this.handleFocus} />
                      )}
                    />
                    <Route
                      exact
                      path="/host/listings/:id/pricing_availability"
                      render={() => (
                        <PricingAvailabilityForm
                          {...FormikProps}
                          ListingField={ListingField}
                          setFocus={this.handleFocus}
                        />
                      )}
                    />
                    <Redirect exact from="/host/listings/:id/edit" to="/host/listings/:id/listing_info" />
                    <Route component={NotFound} />
                  </Switch>

                  <Button
                    onClick={() => {
                      if (!FormikProps.isValid) {
                        alert(
                          `Cannot save changes due to errors:\n\n${Object.values(FormikProps.errors)
                            .join('\n')
                            .toString()}`
                        );
                      }
                      FormikProps.submitForm();
                    }}
                    type="button"
                  >
                    Save &amp; Continue
                  </Button>
                </Form>
                <AppConsumer>
                  {({ screenType }: AppConsumerProps) =>
                    screenType >= ScreenType.DESKTOP && (
                      <aside>
                        <div className="background-extender" />
                        <div className="aside-container">
                          {isFirstFocused(this.state.focus) && AsideHeaders[getCurrentCrumb(this.props.history)]}
                          {ListingHelper[this.state.focus]}
                        </div>
                      </aside>
                    )
                  }
                </AppConsumer>
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
  };

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
        const formattedError = error.graphQLErrors
          ? error.graphQLErrors
              .map(e => e.message)
              .join('\r\n')
              .toString()
          : error;
        alert(`${formattedError}\r\n\r\nIf this continues to occur, please contact us at support@beenest.com`);
        console.error(error);
        return actions.setSubmitting(false);
      });
  };
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

function isFirstFocused(focus: string): boolean {
  return Object.values(defaultFocus).includes(focus);
}
