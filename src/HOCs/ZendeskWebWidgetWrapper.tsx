import * as React from 'react';

const injectZendeskWidget = () => {
  const script = document.createElement('script');
  script.src = 'https://static.zdassets.com/ekr/snippet.js?key=56832895-e57c-421c-aaf2-b6af6bc6b430';
  script.setAttribute('id', 'ze-snippet');
  script.async = true;
  document.body.appendChild(script);
}

interface Props {
  children: React.ReactNode;
}

class ZendeskWebWidgetWrapper extends React.Component<Props> {
  componentDidMount() {
    if (!document.getElementById('ze-snippet')) {
      injectZendeskWidget();
    } else if (window.zE && window.zE.show) {
      window.zE.show();
    }
  }

  componentWillUnmount() {
    if (document.getElementById('ze-snippet') && window.zE && window.zE.hide) {
      window.zE.hide();
    }
  }
  
  render(): React.ReactNode {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}

export default ZendeskWebWidgetWrapper;
