import * as React from 'react';
import AudioLoading from 'legacy/shared/loading/AudioLoading';

const AdminLoading = (): JSX.Element => (
  <div className="admin-table-loading">
    <AudioLoading height={150} width={150} />
  </div>
);

export default AdminLoading;
