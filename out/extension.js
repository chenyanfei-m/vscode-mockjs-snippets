const vscode = require('vscode')
const snippets = require('../snippets/snippets.json')

const genPickItems = (snippets) => Object.entries(snippets).map(([, { body, description }]) => ({
  label: description.match(/Syntax: (.+)\n/)[1],
  detail: description.match(/Return value: (.+)\n/)[1],
  body,
}))

function activate(context) {
  const disposable = vscode.commands.registerCommand('extension.mockjsSearch', async () => {
    const selectedItem = await vscode.window.showQuickPick(genPickItems(snippets), {
      placeHolder: '输入文本进行搜索',
      matchOnDescription: true,
      matchOnDetail: true,
    })
    if (!selectedItem) return
    const editor = vscode.window.activeTextEditor
    if (!editor) return
    editor.insertSnippet(
      new vscode.SnippetString(selectedItem.body[0])
    )
  })
  context.subscriptions.push(disposable)
}

function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;