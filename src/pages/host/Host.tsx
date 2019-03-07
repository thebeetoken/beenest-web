import * as React from 'react';
import ZendeskWebWidgetWrapper from 'HOCs/ZendeskWebWidgetWrapper';
import HostPage from './HostPage';


const Host = (props: RouterProps) => (
  <ZendeskWebWidgetWrapper>
    <HostPage {...props} />
  </ZendeskWebWidgetWrapper>
);

export default Host;
