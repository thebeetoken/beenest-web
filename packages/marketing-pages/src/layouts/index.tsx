import React from 'react';
import Helmet from 'react-helmet';
import { shape, string, element } from 'prop-types';

interface IndexProps {
  children: () => React.ReactElement<any>;
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const Layout: React.StatelessComponent<IndexProps> = ({ children, data }) => {
  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Beenest Host Profit Calculator' },
          {
            name: 'keywords',
            content: 'highest profit, blockchain homesharing, beenest, decentralized hosting',
          },
        ]}
      />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        {children()}
      </div>
    </div>
  );
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
