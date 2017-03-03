'use strict';

const
  vscode = require('vscode'),
  util = require('util'),
  DEFAULT_FORMAT = 'Selected %d Lines';

class SelectLineStatusBar {
  constructor() {
    this.alignConfig = vscode.workspace.getConfiguration('selectline').alignment || 'left';
    this.statusBarPriority = vscode.workspace.getConfiguration('selectline').statusbarPriority || 100;
    this.displayFormat = vscode.workspace.getConfiguration('selectline').displayFormat || DEFAULT_FORMAT;
    this._statusBar = vscode.window.createStatusBarItem(this.getAlignmentEnum(this.alignConfig), this.statusBarPriority);
    vscode.window.onDidChangeActiveTextEditor(e => e && this.displaySelectedLineCount(e.selections));
    vscode.window.onDidChangeTextEditorSelection(e => e && this.displaySelectedLineCount(e.selections));
    vscode.window.onDidChangeTextEditorViewColumn(e => e && this.displaySelectedLineCount(e.selections));

    vscode.workspace.onDidChangeConfiguration(() => {
      this.displayFormat = vscode.workspace.getConfiguration('selectline').displayFormat || DEFAULT_FORMAT;
      if ((vscode.workspace.getConfiguration('selectline').alignment || 'left') != this.alignConfig || (vscode.workspace.getConfiguration('selectline').statusbarPriority || 100) != this.statusBarPriority) {
        this.alignConfig = vscode.workspace.getConfiguration('selectline').alignment || 'left';
        this.statusBarPriority = vscode.workspace.getConfiguration('selectline').statusbarPriority || 100;
        this._statusBar.hide();
        this._statusBar.dispose();
        this._statusBar = vscode.window.createStatusBarItem(this.getAlignmentEnum(this.alignConfig), this.statusBarPriority);
      }
    });
  }
  displaySelectedLineCount(selections) {
    let selectedcount = selections.reduce((pre, selection) => pre + selection.end.line - selection.start.line + (selection.end.character == 0 ? 0 : 1), 0);
    if (selectedcount > 1) {
      this._statusBar.text = util.format(this.displayFormat, selectedcount);
      this._statusBar.show();
    } else {
      this._statusBar.hide();
    }
  }
  getAlignmentEnum(alignConfig) {
    if (alignConfig == 'left') {
      return vscode.StatusBarAlignment.Left;
    } else if (alignConfig == 'right') {
      return vscode.StatusBarAlignment.Right;
    } else {
      return vscode.StatusBarAlignment.Left;
    }
  }
  dispose() {
    this._statusBar.dispose();
  }
}

module.exports = SelectLineStatusBar;