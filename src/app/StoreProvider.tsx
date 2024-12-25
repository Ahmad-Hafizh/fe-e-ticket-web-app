'use client';
import { makeStore, AppStore } from '@/lib/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

interface IStoreProvider {
  children: React.ReactNode;
}

const StoreProvider: React.FC<IStoreProvider> = ({ children }) => {
  const storeRef = React.useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
