import { History } from 'history';
import '@types/googlemaps';
import '@types/stripe';

declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.jpg' {
  const content: any;
  export default content;
}
declare module '*.jpeg' {
  const content: any;
  export default content;
}
declare module '*.css' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: any;
  export default content;
}
declare module '*.json' {
  const content: any;
  export default content;
}

declare global {
  interface Window {
    AutopilotAnywhere: any;
    ethereum: any;
    ga: any;
    google: any;
    Stripe: any;
    zE: zE;
  }

  declare var zE: {
    // zE can queue functions to be invoked when the asynchronous script has loaded.
    ( callback: () => void ) : void;
    // ... and, once the asynchronous zE script is loaded, the zE object will
    // expose the widget API.
    activate?( options: any ): void;
    hide?(): void;
    identify?( user: any ): void;
    setHelpCenterSuggestions?( options: any ): void;
    setLocale?( locale: string ) : void;
    show?(): void;
  }

  interface RouterProps {
    history: History;
    location: {
      hash: string;
      key: string;
      pathname: string;
      search: string;
      state: string | undefined;
    };
    match: {
      isExact: boolean;
      params: {
        id: string;
      };
      path: string;
      url: string;
    };
  }
}
