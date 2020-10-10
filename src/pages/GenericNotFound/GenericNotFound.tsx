import React, { ReactElement } from 'react';

interface Props {}

function GenericNotFound({}: Props): ReactElement {
  return <h1>This page is not found</h1>;
}

export default GenericNotFound;
