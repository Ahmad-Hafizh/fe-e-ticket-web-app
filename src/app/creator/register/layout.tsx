import * as React from 'react';

interface ICreatorRegisProps {
  children: React.ReactNode;
}

const CreatorRegis: React.FunctionComponent<ICreatorRegisProps> = ({ children }) => {
  return <>{children}</>;
};

export default CreatorRegis;
