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
    let selectedcount = 0;
    let last_line = -1;
    for (const selection of selections) {
      let last = selection.end.line;
      if (!selection.isEmpty && selection.end.character === 0) {
        --last;
      }
      if (last <= last_line) {
        continue;
      }
      const first = Math.max(last_line, selection.start.line);
      selectedcount += last - first + 1;
      last_line = last;
    }
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
