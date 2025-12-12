# eslint-plugin-uilib

uilib set of eslint rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-uilib`:

```
$ npm install eslint-plugin-uilib --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-uilib` globally.

## Usage

Add `uilib` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "uilib"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "uilib/rule-name": 2
    }
}
```

## Supported Rules

#### uilib/no-hard-coded-color
```js
// Your app valid colors 
const validColors = {
  blue: '#459FED',
  red: '#F2564D',
  green: '#00CD8B',
  yellow: '#FFB600',
}

// Lint will catch all hard coded color values in the code and replace with valid colors if exist
// `#459FED` will turn to `Colors.blue`
{
    "rules": {
        "uilib/no-hard-coded-color": ['error', {validColors}]
    }
}
```

### uilib/component-deprecation_warn, uilib/component-deprecation_error
```js

// deprecation message to warn you consumers about
const deprecationWarnings = [
  {
      "component": "ActivityIndicator",
      "source": "react-native",
      "message": "Please avoid using react-native ActivityIndicator, use the 'Loader' component instead"
   },
   {
      "component": "OldComponent",
      "source": "react-native-ui-lib",
      "message": "Please use the 'NewComponent' instead. Auto fix available.",
      "fix": { "componentName": "NewComponent" }
    },
];

const deprecationErrors = [
  {
      "component": "Button", /// The component 
      "source": "react-native-ui-lib", // The source you import the component from
      "message": "",
      "props": [
        {
          "prop": "title", // the prop to depreciate
          "message": "Please use `label` prop instead of `title` prop", // custom message to the user
          "fix": { "propName": "label" } // provice auto fix
        }
      ]
    },
];

// Two phases: warn & error to allow phasing your migration process
{
    "rules": {
      'uilib/component-deprecation_warn': ['warn', {deprecations: deprecationWarnings, dueDate: 'Thursday 31 January'}],
      'uilib/component-deprecation_error': ['error', {deprecations: deprecationErrors , dueDate: 'Thursday 31 January' 
    }
}
```
