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

* Fill in provided rules here





