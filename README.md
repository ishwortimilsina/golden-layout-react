# golden-layout-react #
A tool for declaratively adding GoldenLayout to your React application while embracing latest React patterns.

## Features ##
* Declarative api
* Rendered React components have access to the ancestors' context

## Dependencies ##
This libray needs following packages to work:
* [GoldenLayout](https://github.com/golden-layout/golden-layout)
* GoldenLayout core style sheets
* [React](https://github.com/facebook/react/tree/master/packages/react)
* [ReactDOM](https://github.com/facebook/react/tree/master/packages/react-dom)

## Example Usage ##
```javascript
import GoldenLayoutReact from "golden-layout-react";
import TestComponent from "./testComponent";
...
<GoldenLayoutReact
    htmlAttrs={{ style: { height: "500px", width: "500px" } }}
    config={{
        content: [
            {
                type: "row",
                content: [
                    {
                        title: "A react component",
                        type: "react-component",
                        component: "TestComponent",
                        props: { value: "Left" }
                    },
                    {
                        title: "Another react component",
                        type: "react-component",
                        component: "TestComponent"
                    }
                ]
            }
        ]
    }}
    components={
        {
            "TestComponent": TestComponent
        }
    }
/>
```

## Acknowledgement ##
Inspired by the Philipp Munin's [example](https://github.com/golden-layout/golden-layout/issues/392#issuecomment-384731510)