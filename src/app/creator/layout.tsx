import * as React from 'react';

interface ICreatorLayoutProps {
  children: React.ReactNode;
}

const CreatorLayout: React.FC<ICreatorLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default CreatorLayout;
