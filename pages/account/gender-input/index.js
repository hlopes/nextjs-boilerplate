import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Image } from './styles';

const GenderInput = ({ gender, onSetGender }) => {
    const handleGender = useCallback((gender) => () => onSetGender(gender), [
        onSetGender,
    ]);

    return (
        <>
            <Image
                gender={gender}
                src={'female.png'}
                onClick={handleGender('female')}
            />
            <Image
                gender={gender}
                src={'male.png'}
                onClick={handleGender('male')}
            />
        </>
    );
};

GenderInput.propTypes = {
    gender: PropTypes.string,
    onSetGender: PropTypes.func,
};

export default GenderInput;
