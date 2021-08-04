# Contributing
If you got here it means you want to dedicate some of your time and help us improve this library.  
So first of all, thank you ❤️

When contributing to this repository, please first discuss the change you wish to make via [issue](https://github.com/wix/react-native-ui-lib/issues/new/choose),
[Discord channel](https://discord.gg/2eW4g6Z), or any other method with the owners of this repository before making a change. 

## Pull Request Process

1. First make sure the environment is working and synced with master. For installation details go [here](https://github.com/wix/react-native-ui-lib/blob/master/markdowns/getting-started/setup.md#demo-app)
2. Before submitting a PR we suggest running `npm run prepush` command that verifies our lint, TS and tests were not broken.
3. Please use our PR prefixes accordingly. `fix` for bugfix, `feat` for feature, `infra` for infrastructure changes and `docs` for documentation related changes (e.g `fix/ButtonStyle`, `feat/Avatar_colorProp`)
4. Please don't change our PR template.
  - In the Description section add everything that can help the reviewer and the reviewing process, like a description of the issue and the way you decided to go about it, screenshots or gifs, etc.
  - The Changelog section is important. Write a message for the library users - this message will be included in our release notes.
5. We try to make the PR review process as quick as possible, please be patient


### Code Standards

- Readability and clean code above all - we believe a clean code is easier to maintain and refactor when needed. 
- Deciding on an API is not trivial but we always aim to keep it generic and intuitive - feel free to consult with us.
- Our documentation is derived from our components' prop comments, make sure to add a clear description when adding new props. 
- When possible, consider adding tests for the new functionality you added.
- Try separating logic from UI as much as possible using hooks and presenters.
- Keep components small and single purposed.

#### Controlled vs Uncontrolled components
When facing a new component's API we usually aim for making it controlled.  
This is in order to give the user most control over what will be rendered in the component.  
Having said that, keep in mind that in some cases (mostly due to performance concerns) we decide on making a component uncontrolled.




## Typescript Status
Currently most of our code is migrated to typescript though we still have some leftovers of javascript code and manual typings.  
Until we complete the migration you are required to do the following for new TS files

Before pushing new code make sure to run `npm run build:dev` - this check for TS errors and create appropriate declarations (`d.ts`) files under generatedTypes folder. Make sure to push these files as well!
