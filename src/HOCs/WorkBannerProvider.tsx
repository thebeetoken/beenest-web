import { LocationDescriptor } from 'history';
import * as React from 'react';

interface BannerState {
  href?: string | null;
  message?: string;
  background?: string;
  textColor?: string;
  to?: LocationDescriptor | null;
  show: boolean;
}

type BannerProps = Partial<{
  href: string | null;
  message: string;
  to: LocationDescriptor | null;
  background: string;
  textColor: string;
}>

interface BannerDispatch {
  type: string;
  payload?: BannerProps;
}

export interface WorkBannerConsumerProps {
  bannerState: BannerState,
  bannerDispatch: React.Dispatch<BannerDispatch>,
}

interface WorkBannerProviderProps {
  children: React.ReactNode
}

const initialState = {
  show: false,
  message: '',
  to: null,
  href: null,
}

const setBanner = (bannerState: BannerState, payload?: BannerProps) => {
  return { ...bannerState, ...payload };
}

export const BannerReducer = (bannerState: BannerState, action: BannerDispatch) => {
  switch (action.type) {
    case 'open':
      return { ...bannerState, show: true };
    case 'close':
      return { ...bannerState, show: false };
    case 'set':
      return setBanner(bannerState, action.payload);
    default:
      return bannerState;
  }
}

const WorkBannerContext = React.createContext<any>({ bannerState: initialState, bannerDispatch: {} });

const WorkBannerProvider = (props: WorkBannerProviderProps) => {
  const context = React.useContext(WorkBannerContext);
  const [bannerState, bannerDispatch] = React.useReducer(BannerReducer, context.bannerState);
  return (
    <WorkBannerContext.Provider value={{ bannerState, bannerDispatch }}>
      {props.children}
    </WorkBannerContext.Provider>
  );
}

export { WorkBannerContext, WorkBannerProvider };