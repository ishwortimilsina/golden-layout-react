import React from 'react';
import propTypes from 'prop-types';

/**
 * 
 * @param {object} props 
 */
const GLStack = (props) => {
    return React.cloneElement(
        props.StackComponent,
        { 
            glStack: props.stack,
            activeComponentConfig: props.activeComponentConfig
        }
    );
}

GLStack.propTypes = {
    stack: propTypes.object.isRequired,
    StackComponent: propTypes.object.isRequired,
    activeComponentConfig: propTypes.object.isRequired
}

export default GLStack;