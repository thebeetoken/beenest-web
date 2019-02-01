import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import BeeLink from 'shared/BeeLink';
import Fab from 'shared/Fab';
import { getListingStatus } from 'utils/listingStatus';
import { Listing } from 'networking/listings';
import { formatSingleDate } from 'utils/formatDate';

interface Props extends Listing {
  deleteListing: (id: string) => Promise<any>,
}

class AdminListingTableRow extends React.Component<Props> {
  render() {
    const { city, country, createdAt, id, isActive, host, state } = this.props;
    const title = this.props.title.length <= 30 ? this.props.title : `${this.props.title.substring(0, 30)}...`;
    return (
      <tr className="admin-table-row-container">
        <td className="admin-table-row--item">
          <CopyToClipboard text={id} >
            <span>{id}</span>
          </CopyToClipboard>
        </td>
        <td className="admin-table-row--item">
          <span>
            <BeeLink target="blank" href={`listings/${id}`}>
              {title}
            </BeeLink>
          </span>
        </td>
        <td className="admin-table-row--item">
          <span>{city && `${city}, `}{state}</span>
          <span>{country}</span>
        </td>
        <td className="admin-table-row--item">
          <BeeLink to={host ? `/admin/users/${host.id}` : ''}>
            <span>{host ? `${host.displayName}` : ''}</span>
          </BeeLink>
          <CopyToClipboard text={host ? host.email : 'email does not exist'}>
            <span>{host && host.email ? host.email : 'email does not exist'}</span>
          </CopyToClipboard>
        </td>
        <td className="admin-table-row--item">
          <span>{getListingStatus(!isActive)}</span>
          <span>Created: {formatSingleDate(createdAt)}</span>
        </td>
        <td className="admin-table-row--item">
          <span className="edit-container">
            <Link to={`${id}/edit`}>
              <Fab
                clear
                color="edit"
                height="24px"
                icon="utils/edit-circle"
                noPadding
                width="24px" />
            </Link>
            <Fab
              clear
              color="error"
              height="24px"
              icon="utils/trash-circle"
              noPadding
              onClick={this.onDeleteListing}
              width="24px" />
          </span>
        </td>
      </tr>
    );
  }

  onDeleteListing = () => {
    const { deleteListing, id } = this.props;;
    const deleteListingPrompt = prompt(`Are you sure you want to delete listing ${id}? If so, please enter in the listing ID and press 'OK'.`);
    if (deleteListingPrompt === id) {
      return deleteListing(id)
        .then((_) => {
          return alert(`Listing ${id} has been deleted. It may take a few seconds for this change to be reflected on your screen, or you may refresh your browser to see this change immediately.`);
        })
        .catch((error: Error) => {
          return alert(`An error has occured: ${error.message}, please contact engineering with a screenshot of this error.`);
        });
    }

    return alert(`You have entered the incorrect listing ID or have decided not to delete the listing. Listing ${id} has not been deleted.`);
  }
};

export default AdminListingTableRow;
