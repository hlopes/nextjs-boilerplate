import styled from '@emotion/styled';

import { black, white } from '@theme/colors';
import { navLinkStyle, shadow } from '@theme/styles';
import { above, background } from '@theme/layers';

export const Header = styled.header`
    position: relative;
    height: var(--header-height);
    color: ${white};
    background-color: ${black};
`;

type Props = {
    isOpen?: boolean;
};

export const Nav = styled.nav<Props>`
    ${shadow};

    position: fixed;
    top: 0;
    left: 0;
    z-index: ${above};
    width: 30rem;
    height: calc(100% + 6rem);
    margin: 0;
    padding: var(--header-height) 0 6rem 0;
    overflow-y: auto;
    color: ${white};
    background-color: ${black};
    transform: ${({ isOpen }) =>
        isOpen ? 'translateX(0)' : 'translateX(-100vw)'};
    transition: transform 0.5s ease, opacity ease 0.2s;
    will-change: transform;

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;

        a {
            ${navLinkStyle};

            display: block;
            padding: 1.6rem;
        }
    }
`;

export const Overlay = styled.div<Props>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${({ isOpen }) => (isOpen ? above : background)};
    background-color: ${black};
    opacity: ${({ isOpen }) => (isOpen ? 0.5 : 0)};
    transition: opacity ease 1s;
`;
