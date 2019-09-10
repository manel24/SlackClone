import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
`;

export default ({ channelName }) =>
    (<SendMessageWrapper>
        <Input fluid placeholder={channelName} />
    </SendMessageWrapper>)