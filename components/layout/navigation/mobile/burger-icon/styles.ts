import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { white } from '../../../../../theme/colors';
import { burger } from '../../../../../theme/layers';

export type BaseProps = {
    isOpen: boolean;
};

const commonSpinner = css`
    transition: all 0.3s;
    box-sizing: border-box;
    height: 0.3rem;
    width: 100%;
    background-color: ${white};
`;

export const Icon = styled.div`
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    z-index: ${burger};
    top: 50%;
    left: 1.5rem;
    width: 2.2rem;
    transform: translateY(-50%);
`;

export const Horizontal = styled.div<BaseProps>`
    ${commonSpinner};

    position: relative;
    float: left;
    margin-top: 0.3rem;
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
`;

export const DiagonalPart1 = styled.div<BaseProps>`
    ${commonSpinner};

    position: relative;
    float: left;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(135deg)' : 'rotate(0)')};
    margin-top: ${({ isOpen }) => (isOpen ? '0.8rem' : '0')};
`;

export const DiagonalPart2 = styled.div<BaseProps>`
    ${commonSpinner};

    position: relative;
    float: left;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(0)')};
    margin-top: ${({ isOpen }) => (isOpen ? '-0.9rem' : '0.3rem')};
`;
