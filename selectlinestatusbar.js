'use strict';

const
  vscode = require('vscode'),
  util = require('util'),
  DEFAULT_FORMAT = 'Selected %d Lines';

class SelectLineStatusBar {
  constructor() {
    let alignment = vscode.StatusBarAlignment.Left;
    let alignConfig = vscode.workspace.getConfiguration('selectline').alignment;
    if (alignConfig) {
      if (alignConfig == 'left') {
        alignment = vscode.StatusBarAlignment.Left;
      } else if (alignConfig == 'right') {
        alignment = vscode.StatusBarAlignment.Right;
      }
    }
    this._statusBar = vscode.window.createStatusBarItem(alignment, vscode.workspace.getConfiguration('selectline').statusbarPriority || 100);
    vscode.window.onDidChangeActiveTextEditor(e => e && this.displaySelectedLineCount(e.selections));
    vscode.window.onDidChangeTextEditorSelection(e => e && this.displaySelectedLineCount(e.selections));
    vscode.window.onDidChangeTextEditorViewColumn(e => e && this.displaySelectedLineCount(e.selections));
    this._statusBar.show();
  }
  displaySelectedLineCount(selections) {
    console.log(selections);
    let selectedcount = selections.reduce((pre, selection) => pre + selection.end.line - selection.start.line + (selection.end.character == 0 ? 0 : 1), 0);
    this._statusBar.text = 1 < selectedcount ? util.format(vscode.workspace.getConfiguration('selectline').displayFormat || DEFAULT_FORMAT, selectedcount) : '';
  }
  dispose() {
    this._statusBar.dispose();
  }
}

module.exports = SelectLineStatusBar;