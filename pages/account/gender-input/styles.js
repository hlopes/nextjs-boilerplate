import styled from '@emotion/styled';

export const Image = styled.img`
    border: ${({ gender }) =>
        gender === 'female' ? '0.2rem solid darkblue' : ''};
`;
