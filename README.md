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
import NonStackComponent from './nonStackComponent';
import StackComp from './stackComp';
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
                    },
                    {
                        title: "Non stack",
                        type: "react-component",
                        component: "nonStackComponent",
                        props: {
                            value: "I don't have custom comp for stack."
                        }
                    }
                ]
            }
        ]
    }}
    components={
        {
            "TestComponent": TestComponent,
            "nonStackComponent": NonStackComponent
        }
    }
    stackComponents={
        {
            "testItem": <StackComp color="red"  />
        }
    }
    onStackCreated={stack => console.log(stack)} // subscribes to "stackCreated" event
/>
```

## Docs ##
### Properties ###
* **config**: regular golden-layout config object
* **components**: an object map with 'component' from config as key and the actual React component as the value
* **stackComponents**: an object map with 'component' from config as key and the actual React component to be rendered alongside golden-layout stack controls (on the right-side of the header) as the value.
### Events ###
The following props can be used to subscribe to the respective [GoldenLayout events](http://golden-layout.com/docs/Item.html#Events):
* onStateChanged
* onTitleChanged
* onStackCreated
* onItemCreated
* onItemDestroyed
* onComponentCreated
* onRowCreated
* onColumnCreated
* onActiveContentItemChanged
```javascript
<GoldenLayoutReact
    ...
    onStackCreated={stack => console.log(stack)} // subscribes to "stackCreated" event
    onItemDestroyed={item => console.log(item)} // subscribe to "itemDestroyed" event
/>
```

## Acknowledgement ##
Inspired by the Philipp Munin's [example](https://github.com/golden-layout/golden-layout/issues/392#issuecomment-384731510)