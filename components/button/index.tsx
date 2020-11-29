import React, { FC, ForwardedRef, forwardRef } from 'react';

import { StyledButton } from './styles';

type Props = {
    children?: any;
    onClick?: () => void;
};

const Button: FC<Props> = forwardRef(
    ({ children, ...props }: Props, ref: ForwardedRef<any>) => {
        const { ...remainingProps } = props;

        return (
            <StyledButton ref={ref} {...remainingProps}>
                {children}
            </StyledButton>
        );
    }
);

Button.displayName = 'CustomButton';

export default Button;
