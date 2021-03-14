import * as vscode from 'vscode';
import {toPascalCase} from './utils';
import * as fs from 'fs';

enum ComponentTypes {
	SINGLE_PART = 'singlePart',
	MUTLI_PART = 'multiPart',
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('generateSnippet', async () => {

		let name; 
		let pascalCased;
		let body = [] as string[]; 

		let prefix = await vscode.window.showInputBox({prompt: 'Enter a prefix (or nothing for default)'});
		let description = await vscode.window.showInputBox({prompt: 'Enter an optional description'});
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		if (text) {
			let splitText = text.split('<');
			splitText = splitText[1].split('>');
			splitText[0] = splitText[0].replace(/\//g, "");
			pascalCased = splitText[0];
			name = splitText[0].toLowerCase();

			const splitByLinebreak = text.split('\n');

			if (splitByLinebreak.length > 0) {
				body = body.concat(splitByLinebreak);
			} else {
				body.push(text);
			}

		} else {
			name = await vscode.window.showInputBox({prompt: 'Enter component name - you can use two words if you want to pascalcase'});

			if (name) {
				console.log('name: ' +name);

				const split = await vscode.window.showInformationMessage('One part or two part tag?', ComponentTypes.SINGLE_PART, ComponentTypes.MUTLI_PART);

				pascalCased = toPascalCase(name);

				if (split === ComponentTypes.SINGLE_PART) {
					body.push('<' +pascalCased);
				} else {
					body.push('<' +pascalCased +'>');
				}

				let prop: string | undefined = ' ';

				while (prop) {
					prop = await vscode.window.showInputBox({prompt: 'Enter a prop or nothing for default'});
					if (prop) {
						body.push(prop);
					}
				}

				if (split === ComponentTypes.SINGLE_PART) {
					body.push('/>');
				} else {
					body.push('</' +pascalCased +'>');
				}
			}
		}

			if (!prefix && name) {
				prefix = name.replace(/\s+/g, '').toLowerCase();
			}

				if (name && pascalCased) {
					console.log('name: ' +name);
					console.log('pascalCased: ' +pascalCased);

				if(vscode.workspace.workspaceFolders !== undefined) {
					const wf = vscode.workspace.workspaceFolders[0].uri.path ;
					const snippetFilePath = wf +'/.vscode/uilib.code-snippets';

					if (fs.existsSync(snippetFilePath)) {
						const existingFileContent = await fs.readFileSync(snippetFilePath);
						const existingJson = JSON.parse(existingFileContent.toString());
						existingJson[pascalCased] = {
							scope: 'javascript, typescript',
							prefix,
							body,
							description,
						};
						
						await fs.writeFile(snippetFilePath, JSON.stringify(existingJson), (err) => {
							vscode.window.showErrorMessage('failed to write to snippets file ' +err);
						});
					} else {
						const snippetObj = {
							[pascalCased]: {
								scope: 'javascript, typescript',
								prefix,
								body,
								description,
							},
						};

						await fs.appendFile(snippetFilePath , JSON.stringify(snippetObj), (err) => {
							vscode.window.showErrorMessage('failed to write to snippets file ' +err);
						});
					}
				} 
			}
		})
	);
}
export function deactivate() {}
