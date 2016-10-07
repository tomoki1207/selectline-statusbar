const
  SelectLineStatusBar = require('./selectlinestatusbar');

function activate(context) {
  context.subscriptions.push(new SelectLineStatusBar());
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;