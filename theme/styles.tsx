import React from 'react';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

import { ToastContainer } from 'react-toastify';

import normalize from './normalize';
import { gteMediumMedia } from './custom-media';
import { red, white } from './colors';

export const globalStyles = (
    <Global
        styles={css`
            ${normalize}

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
                overflow-x: hidden;
                padding: 1rem;
                margin: 0;
                background: papayawhip;
                min-height: 100%;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 1.6rem;
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

export const basicStyles = css`
    background-color: white;
    color: ${red};
    border: 1px solid lightgreen;
    border-right: none;
    border-bottom: none;
    box-shadow: 0.5rem 0.5rem 0 0 lightgreen, 1rem 1rem 0 0 lightyellow;
    transition: all 0.1s linear;
    margin: 3rem 0;
    padding: 1rem 0.5rem;
`;

export const hoverStyles = css`
    &:hover {
        color: white;
        background-color: lightgray;
        border-color: aqua;
        box-shadow: -1.5rem -1.5rem 0 0 aqua, -3rem -3rem 0 0 cornflowerblue;
    }
`;

export const Basic = styled.div`
    ${basicStyles};

    ${gteMediumMedia} {
        margin: 6rem;
    }
`;

export const Combined = styled.div`
    ${basicStyles};
    ${hoverStyles};
`;

export const StyledToastContainer = styled(ToastContainer)`
    .Toastify__toast {
        color: ${white};
    }
`;

export const Error = styled.p`
    color: red;
    font-size: 0.8rem;
    text-align: left;
`;
