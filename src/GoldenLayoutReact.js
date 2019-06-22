import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import GoldenLayout from './PatchedGoldenLayout';
import GLStack from './GLStack';

class GoldenLayoutReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goldenPanels: [],
            glStacks: []
        };
        this.containerRef = React.createRef();

        this.handleStacks = this.handleStacks.bind(this);
        this.addPanel = this.addPanel.bind(this);
        this.destroyPanel = this.destroyPanel.bind(this);
    }

    render() {
        // go through all the panel objects are render appropriate React Components
        // using createPortal unto the respective GL panel element in the DOM
        const renderPanels = () => {
            return this.state.goldenPanels.map(panel => {
                return ReactDOM.createPortal(
                    panel._getReactComponent(),
                    panel._container.getElement()[0]
                )
            })
        }

        // If the user has elected to render custom stack controls, they will need to
        // provide a React Component to render. If the component is available, we will
        // render that component on the stackcontrols space in GL panel headers
        // This will handled by GLStack wrapper component which will added few more props
        const renderStacks = () => {
            if (this.props.StackComponent && React.isValidElement(this.props.StackComponent)) {
                return this.state.glStacks.map(stack => {
                    if (stack.getActiveContentItem()) {
                        return ReactDOM.createPortal(
                            <GLStack stack={stack} StackComponent={this.props.StackComponent} />,
                            stack.header.controlsContainer.prepend('<div></div>')[0].firstChild
                        )
                    }
                    return null;
                })
            }
        }

        return (
            <div ref={this.containerRef} {...this.props.htmlAttrs}>
                {renderPanels()}
                {renderStacks()}
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

        this.handleStacks();
    }

    /**
     * This method is called from inside componentDidMount
     * Lookout form stack creation, update our component state with stacks
     * and then use than state array to render stacks using createPortal later
     */
    handleStacks() {
        this.goldenLayoutInstance.on('stackCreated', stack => {
            this.setState(prevState => ({
                glStacks: [...prevState.glStacks, stack]
            }));
        });
    }
}

GoldenLayoutReact.propTypes = {
    config: propTypes.object.isRequired,
    components: propTypes.object.isRequired
}

export default GoldenLayoutReact;