import { css } from '@emotion/react';

export const headerHeightDesktop = '5rem';

export default css`
    :root {
        --viewport-height: 100vh;
        --viewport-width: 100vw;

        --header-height: ${headerHeightDesktop};
    }
`;
