import React from 'react';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

import { ToastContainer } from 'react-toastify';

import normalize from './normalize';
import variables from './variables';
import { black, grey, white } from './colors';

export const globalStyles = (
    <Global
        styles={css`
            ${normalize}
            ${variables}

            *,
            *::before,
            *::after {
                box-sizing: border-box;
            }

            html {
                /**
                 * Font size 10px on default browser settings.
                 * It's used as 62.5% to adapt to changes in the browser's default font-size.
                 */
                font-size: 62.5%;
            }

            body {
                min-height: 100%;
                overflow-x: hidden;
                font-size: 1.6rem;
                font-family: Helvetica, Arial, sans-serif;
                background: papayawhip;
                -webkit-font-smoothing: antialiased;
            }

            body,
            #root {
                display: flex;
                flex: 1 0 auto;
                flex-direction: column;
            }

            #root {
                min-height: 100%;
            }
        `}
    />
);

export const shadow = css`
    box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.14),
        0 0.3rem 0.1rem -0.2rem rgba(0, 0, 0, 0.12),
        0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.2);
`;

export const navLinkStyle = css`
    display: inline-block;
    padding: 0 1.5rem;
    color: ${white};
    font-size: 1.4rem;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover,
    &:active {
        color: ${black};
        background-color: ${grey};
    }
`;

export const Section = styled.section`
    padding: 1rem;
`;

export const Button = styled.button`
    height: 3.6rem;
    padding: 0 16px;
    font-size: 1.4rem;
    line-height: 3.6rem;
    letter-spacing: 0.05rem;
    text-align: center;
    text-transform: uppercase;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    ${shadow}

    &:hover {
        background-color: ${grey};
    }
`;

export const Error = styled.p`
    color: red;
    font-size: 1rem;
    text-align: left;
    margin: 0 0 1rem;
`;

export const StyledToastContainer = styled(ToastContainer)`
    .Toastify__toast {
        color: ${white};
    }
`;
