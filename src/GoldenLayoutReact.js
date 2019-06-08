import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import GoldenLayout from './PatchedGoldenLayout';

class GoldenLayoutReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goldenPanels: []
        };
        this.containerRef = React.createRef();
    }

    render() {
        return (
            <div ref={this.containerRef} {...this.props.htmlAttrs}>
                {
                    this.state.goldenPanels.map(panel => {
                        return ReactDOM.createPortal(
                            panel._getReactComponent(),
                            panel._container.getElement()[0]
                        )
                    })
                }
            </div>
        );
    }

    /**
     * This method is invoked from inside PatchedGoldenLayout.
     * This will add passed class to the "goldenPanel" state which is instead
     * used inside render function with ReactDOM.createPortal to render
     * the respenctive component to the goldenlayout panel in DOM
     * @param {function} goldenPanel 
     */
    addPanel(goldenPanel) {
        this.setState(state => {
            let newGoldenPanels = new Set(state.goldenPanels);
            newGoldenPanels.add(goldenPanel);
            return { goldenPanels: Array.from(newGoldenPanels) };
        });
    }

    /**
     * Similar to addPanel, but deletes the class object from "goldenPanel" state
     * @param {function} goldenPanel 
     */
    destroyPanel(goldenPanel) {
        this.setState(state => {
            let newGoldenPanels = new Set(state.goldenPanels);
            newGoldenPanels.delete(goldenPanel);
            return { goldenPanels: Array.from(newGoldenPanels) };
        });
    }

    componentDidMount() {
        this.goldenLayoutInstance = new GoldenLayout(
            this.props.config || {},
            this.containerRef.current
        );

        // props.components will be a map of "component" in goldenlayout config to the 
        // actual React components
        // Eg: { "testComponent": TestComponent }
        for (let type in this.props.components) {
            this.goldenLayoutInstance.registerComponent(type, this.props.components[type])
        }

        this.goldenLayoutInstance.reactContainer = this;
        this.goldenLayoutInstance.init();
    }
}

GoldenLayoutReact.propTypes = {
    config: propTypes.object.isRequired,
    components: propTypes.object.isRequired
}

export default GoldenLayoutReact;