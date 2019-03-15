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

export interface BannerConsumerProps {
  bannerState: BannerState,
  bannerDispatch: React.Dispatch<BannerDispatch>,
}

interface BannerProviderProps {
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

const BannerContext = React.createContext<any>({ bannerState: initialState, bannerDispatch: {} });

const BannerProvider = (props: BannerProviderProps) => {
  const context = React.useContext(BannerContext);
  const [bannerState, bannerDispatch] = React.useReducer(BannerReducer, context.bannerState);
  return (
    <BannerContext.Provider value={{ bannerState, bannerDispatch }}>
      {props.children}
    </BannerContext.Provider>
  );
}

export { BannerContext, BannerProvider };