import styled from '@emotion/styled';

import { grey } from '../../theme/colors';
import { shadow } from '../../theme/styles';

export const StyledButton = styled.button`
    height: 3.6rem;
    line-height: 3.6rem;
    cursor: pointer;
    text-align: center;
    letter-spacing: 0.05rem;
    padding: 0 16px;
    text-transform: uppercase;
    border: none;
    border-radius: 0.2rem;
    transition: 0.3s ease-out;
    font-size: 1.4rem;

    ${shadow}

    &:hover {
        background-color: ${grey};
    }
`;
