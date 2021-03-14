// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
//import * as vscode from 'vscode';
import * as uut from '../utils';

describe('Extension Test Suite', () => {
	//vscode.window.showInformationMessage('Start utils tests.');

	it('splitToWords should return an array', () => {
		const testString = 'test';
		expect(uut.splitToWords(testString)).toEqual([testString]);
	});
});
