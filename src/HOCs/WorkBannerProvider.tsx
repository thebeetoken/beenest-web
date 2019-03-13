import * as React from 'react';

interface BannerState {
  show: boolean;
}

interface Props {
  children: React.ReactNode
}

interface BannerDispatch {
  type: string;
  payload?: any;
}

export interface WorkBannerConsumerProps {
  bannerState: BannerState,
  bannerDispatch: React.Dispatch<BannerDispatch>,
}

const initialState = {
  show: false,
}

export const BannerReducer = (bannerState: BannerState, action: BannerDispatch) => {
  switch (action.type) {
    case 'open':
      return { ...bannerState, show: true };
    case 'close':
      return { ...bannerState, show: false };
    default:
      return bannerState;
  }
}

const WorkBannerContext = React.createContext<any>({ bannerState: initialState, bannerDispatch: {} });

const WorkBannerProvider = (props: Props) => {
  const context = React.useContext(WorkBannerContext);
  const [bannerState, bannerDispatch] = React.useReducer(BannerReducer, context.bannerState);
  return (
    <WorkBannerContext.Provider value={{ bannerState, bannerDispatch }}>
      {props.children}
    </WorkBannerContext.Provider>
  );
}

export { WorkBannerContext, WorkBannerProvider };