'use strict';

const
  vscode = require('vscode'),
  util = require('util'),
  DEFAULT_FORMAT = 'Selected %d Lines';

class SelectLineStatusBar {
  constructor() {
    this._statusBar = vscode.window.createStatusBarItem();
    vscode.window.onDidChangeActiveTextEditor(e => this.displaySelectedLineCount(e.selections));
    vscode.window.onDidChangeTextEditorSelection(e => this.displaySelectedLineCount(e.selections));
    vscode.window.onDidChangeTextEditorViewColumn(e => this.displaySelectedLineCount(e.selections));
    this._statusBar.show();
  }
  displaySelectedLineCount(selections) {
    let selectedcount = selections.reduce((pre, selection) => pre + selection.end.line - selection.start.line + 1, 0);
    this._statusBar.text = 1 < selectedcount ? util.format(vscode.workspace.getConfiguration('selectline').displayFormat || DEFAULT_FORMAT, selectedcount) : '';
  }
  dispose() {
    this._statusBar.dispose();
  }
}

module.exports = SelectLineStatusBar;