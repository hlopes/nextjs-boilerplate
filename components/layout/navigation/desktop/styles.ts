import styled from '@emotion/styled';

import { black, white } from '../../../../theme/colors';
import { shadow, navLinkStyle } from '../../../../theme/styles';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 6.4rem;
    padding: 1rem;
    color: ${white};
    line-height: 6.4rem;
    background-color: ${black};

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
    ${navLinkStyle}
`;
