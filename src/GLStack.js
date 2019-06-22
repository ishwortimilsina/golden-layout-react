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
            activeComponentConfig: props.stack.getActiveContentItem().config
        }
    );
}

GLStack.propTypes = {
    stack: propTypes.object.isRequired,
    StackComponent: propTypes.object.isRequired
}

export default GLStack;