import styled from '@emotion/styled';

import { black, white } from '../../../../theme/colors';
import { shadow, navLinkStyle } from '../../../../theme/styles';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    padding: 1rem;
    height: 6.4rem;
    line-height: 6.4rem;
    background-color: ${black};
    color: ${white};
    width: 100%;

    ${shadow}

    > div {
        flex: 1 0;
    }
`;

export const ButtonWrapper = styled.div`
    text-align: right;

    & Button:last-of-type {
        margin-left: 1rem;
    }
`;

export const StyledLink = styled.a`
    ${navLinkStyle};
`;
