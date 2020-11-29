import React, { FC, ForwardedRef, forwardRef } from 'react';

import {
    BaseProps,
    Icon,
    Horizontal,
    DiagonalPart1,
    DiagonalPart2,
} from './styles';

type Props = BaseProps & {
    ref: any;
    onOpen: () => void;
};

const Burger: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({ isOpen, onOpen }: Props, ref: ForwardedRef<HTMLDivElement>) => {
        return (
            <Icon ref={ref} onClick={onOpen}>
                <DiagonalPart1 isOpen={isOpen} />
                <Horizontal isOpen={isOpen} />
                <DiagonalPart2 isOpen={isOpen} />
            </Icon>
        );
    }
);

Burger.displayName = 'Burger';

export default Burger;
