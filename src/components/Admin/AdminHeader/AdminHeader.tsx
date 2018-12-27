import * as React from 'react';
import { Link } from 'react-router-dom';

import AdminHeaderContainer from './AdminHeader.container';
import Svg from 'shared/Svg';

class AdminHeader extends React.Component {
  render() {
    return (
      <AdminHeaderContainer>
        <div className="admin-header-wrapper">
          <div className="admin-header--logo-meta">
            <Link to="/admin">
              <Svg src="logo/beenest-horizontal" />
            </Link>
            <h2>Admin Panel</h2>
          </div>
        </div>
      </AdminHeaderContainer>
    );
  }
}

export default AdminHeader;
