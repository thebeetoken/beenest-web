import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
//@ts-ignore
import { WithContext as ReactTags } from 'react-tag-input';
import _ from 'lodash';

//import Svg from 'shared/Svg';
import AdminInputLabel from 'legacy/shared/AdminInputLabel';
import AdminInputWrapper from 'legacy/shared/AdminInputWrapper';
import Button from 'shared/Button';
import { PhotoUploader, Photo } from 'shared/PhotoUploader';
import TextareaContainer from 'legacy/shared/Textarea/Textarea.container';

import { Conference, CREATE_CONFERENCE, UPDATE_CONFERENCE, GET_ALL_CONFERENCES } from 'networking/conferences';

interface Props {
  conference: Conference;
  createConference: (input: Conference) => Promise<Conference>;
  updateConference: (input: Conference) => Promise<Conference>;
}

interface State {
  conference: Conference;
  redirectToAllConferences: boolean;
}

class AdminConferenceForm extends React.Component<Props, State> {
  readonly state: State = {
    conference: this.props.conference || generateDefaultState(),
    redirectToAllConferences: false
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    event.preventDefault();

    const changes = { [event.target.name]: event.target.value };
    this.setState(previousState => {
      return { conference: { ...previousState.conference, ...changes } };
    });
  }

  handlePhotoChange = (value: Photo[]) => {
    const url = value && value.length ? value[0].url : '';

    this.setState(previousState => {
      return {
        conference: {
          ...previousState.conference,
          coverImage: { url },
        }
      };
    });
  }

  handleListingIdDelete = (index: number) => {
    if (!this.state.conference.listingIds) {
      return;
    }

    this.setState({
      conference: {
        ...this.state.conference,
        listingIds: this.state.conference.listingIds.filter((_, currentIndex) => currentIndex !== index),
      }
    });
  }

  handleListingIdAdd = (listingEntry: { id: string, text: string }) => {
    const listingId = parseInt(listingEntry.text);

    if ((this.state.conference.listingIds || []).some(id => id == listingId)) {
      return;
    }
    this.setState({
      conference: {
        ...this.state.conference,
        listingIds: (this.state.conference.listingIds || []).concat(listingId),
      }
    });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { createConference, updateConference } = this.props;
    const input = this.state.conference;

    if (!input.id) {
      return createConference(input).then((conference: Conference) => {
        if (conference) {
          this.setState({ redirectToAllConferences: true });
        }
      }).catch(alert);
    } else {
      return updateConference(input).then((conference: Conference) => {
        if (conference) {
          this.setState({ redirectToAllConferences: true });
        }
      }).catch(alert);
    }
  };

  render() {
    if (this.state.redirectToAllConferences) {
      return <Redirect to="/admin/conferences/all" />;
    }

    const { conference } = this.state;
    const listingIdsFormattedForReactTags = (conference.listingIds || []).map(listingId => ({ text: String(listingId), id: String(listingId) }));
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="title">Title</AdminInputLabel>
          <AdminInputWrapper>
            <input type="text"
              name="title"
              placeholder="title"
              value={conference.title}
              onChange={this.handleChange}
            />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="link">Link</AdminInputLabel>
          <AdminInputWrapper>
            <input type="text"
              name="link"
              placeholder="https://"
              value={conference.link}
              onChange={this.handleChange}
            />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="description">Cover Image</AdminInputLabel>
          <PhotoUploader
            initialPhotos={conference ? [conference.coverImage] : []}
            maxFiles={1}
            onPhotosUpdated={this.handlePhotoChange} />
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="venue">Venue</AdminInputLabel>
          <AdminInputWrapper>
            <input
              name="venue"
              onChange={this.handleChange}
              placeholder="Venue"
              type="text"
              value={conference.venue} />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="country">Country</AdminInputLabel>
          <AdminInputWrapper>
            <input
              name="country"
              onChange={this.handleChange}
              placeholder="Country"
              type="text"
              value={conference.country} />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="state">State</AdminInputLabel>
          <AdminInputWrapper>
            <input
              name="state"
              onChange={this.handleChange}
              placeholder="State"
              type="text"
              value={conference.state} />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="city">City</AdminInputLabel>
          <AdminInputWrapper>
            <input
              name="city"
              onChange={this.handleChange}
              placeholder="City"
              type="text"
              value={conference.city} />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="startDate">Start Date</AdminInputLabel>
          <AdminInputWrapper>
            <input
              name="startDate"
              onChange={this.handleChange}
              placeholder="YYYY-MM-DD"
              type="text"
              value={formatDate(conference.startDate)} />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="endDate">End Date</AdminInputLabel>
          <AdminInputWrapper>
            <input
              name="endDate"
              onChange={this.handleChange}
              placeholder="YYYY-MM-DD"
              type="text"
              value={formatDate(conference.endDate)} />
          </AdminInputWrapper>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="description">Description</AdminInputLabel>
          <TextareaContainer>
            <textarea
              name="description"
              id="description"
              value={conference.description}
              onChange={this.handleChange}>
            </textarea>
          </TextareaContainer>
        </div>
        <div className="admin-form--item">
          <AdminInputLabel htmlFor="listingIds">Listing Ids</AdminInputLabel>
          <div>
            <ReactTags
              tags={listingIdsFormattedForReactTags}
              placeholder="Type in a VALID listing id number and press enter"
              handleDelete={this.handleListingIdDelete}
              handleAddition={this.handleListingIdAdd} />
          </div>
        </div>
        <div className="admin-form-submit-wrapper">
          <div className="admin-form-submit--container">
            <Button
              background="correct"
              color="white"
              noRadius
              textStyle="welter-5"
              type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    );
  }
};

export default compose(
  graphql(UPDATE_CONFERENCE, {
    props: ({ mutate }: any) => ({
      updateConference: (conference: Conference) => {
        const { id } = conference;
        const input = JSON.parse(JSON.stringify(conference), omitFields);
        return mutate({
          variables: { id, input },
          refetchQueries: [{ query: GET_ALL_CONFERENCES }],
          update: (store: any, { data: updateConference }: any) => {
            // ignore writing cache if we don't have access
            // see https://github.com/apollographql/apollo-client/issues/1701#issuecomment-380213533
            if (!store.data.data.ROOT_QUERY) {
              return;
            }
            const { allConferences } = store.readQuery({ query: GET_ALL_CONFERENCES, variables: { id: '', after: '' } });
            const updatedAllConferences = allConferences.map((conferenceToUpdate: Conference) => {
              return conferenceToUpdate.id === updateConference.id ? updateConference : conferenceToUpdate;
            });
            store.writeQuery({ query: GET_ALL_CONFERENCES, data: { allConferences: updatedAllConferences } });
          },
        });
      }
    })
  }),
  graphql(CREATE_CONFERENCE, {
    props: ({ mutate }: any) => ({
      createConference: (conference: Conference) => {
        const input = JSON.parse(JSON.stringify(conference), omitFields);

        return mutate({
          variables: { input },
          refetchQueries: [{ query: GET_ALL_CONFERENCES }],
          update: (store: any, { data: createConference }: any) => {
            // ignore writing cache if we don't have access
            // see https://github.com/apollographql/apollo-client/issues/1701#issuecomment-380213533
            if (!store.data.data.ROOT_QUERY) {
              return;
            }

            const { allConferences } = store.readQuery({ query: GET_ALL_CONFERENCES });
            allConferences.push(createConference);
            store.writeQuery({ query: GET_ALL_CONFERENCES, data: { allConferences } });
          },
        });
      },
    }),
  })
)(AdminConferenceForm);

// Helper Functions
/**
 * We need to omit these fields so we can reuse the same graphql input type for save and update.
 **/
function omitFields(key: string, value: any) {
  return ['id', '__typename', 'createdAt'].includes(key) ? undefined : value;
}

function generateDefaultState() {
  return {
    city: '',
    country: '',
    coverImage: { url: '' },
    description: '',
    endDate: '',
    id: '',
    link: '',
    startDate: '',
    state: '',
    title: '',
    venue: '',
    listingIds: []
  };
}

function formatDate(input: string): string {
  if (!input) return '';
  
  const date = input.split('T');
  return date[0];
}
