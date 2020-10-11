import React, { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

function SandboxErrorMessage({ children }: Props): ReactElement {
  return <div style={{ color: 'red' }}>{children}</div>;
}

export default SandboxErrorMessage;
