import GoldenLayout from 'golden-layout';

/**
 * Here, we are going to patch the ReactComponentHandler class in GoldenLayout
 * to make it not use unsafe react methods. We will also not have it use the
 * ReactDOM.render method to render the components into native DOM and instead
 * this class will just pass itself to "addPanel" and "destroyPanel" methods in 
 * GoldenLayoutReact component. That component will update its state accordingly and
 * will use ReactDOM.createPortal to render the react components into goldenlayout 
 * native DOM nodes.
 * The advantage of this is - the components rendered using createPortal will
 * have access to their ancestors' context and will eliminate the need to wrap
 * each components separately with the context providers.
 */

const ReactComponentHandler = GoldenLayout["__lm"].utils.ReactComponentHandler;

class PatchedReactComponentHandler extends ReactComponentHandler {
    _render() {
        var reactContainer = this._container.layoutManager.reactContainer;
        if (reactContainer) {
            reactContainer.addPanel(this);
        }
    }

    _destroy() {
        var reactContainer = this._container.layoutManager.reactContainer;
        if (reactContainer) {
            reactContainer.destroyPanel(this);
        }

        this._container.off("open", this._render, this);
        this._container.off("destroy", this._destroy, this);
    }

    _getReactComponent() {
        var defaultProps = {
            glEventHub: this._container.layoutManager.eventHub,
            glContainer: this._container
        };
        var props = { ...defaultProps, ...this._container._config.props };
        return React.createElement(this._reactClass, props);
    }
}

GoldenLayout["__lm"].utils.ReactComponentHandler = PatchedReactComponentHandler;

export default GoldenLayout;