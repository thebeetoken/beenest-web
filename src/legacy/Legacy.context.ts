/**
 * The script sets the context/global app state
 *
 * @author @andy
 **/

import * as React from 'react';

export enum ScreenType {
  MOBILE = 1,
  TABLET = 2,
  DESKTOP = 3,
  HUGE = 4,
}

export function getScreenType(): ScreenType {
  const { innerWidth } = window;
  if (innerWidth < 768) {
    return ScreenType.MOBILE;
  } else if (innerWidth < 1025) {
    return ScreenType.TABLET;
  } else if (innerWidth < 1920) {
    return ScreenType.DESKTOP;
  } else {
    return ScreenType.HUGE;
  }
}

export interface AppState {
  screenType: number;
}

export interface AppConsumerProps {
  screenType: number;
}

export const { Provider: AppProvider, Consumer: AppConsumer } = React.createContext({});
