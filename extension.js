const vscode = require('vscode');
const axios = require('axios'); 

const outputChannel = vscode.window.createOutputChannel('Code Analysis');

function activate(context) {

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.analyzeCode', async () => {
    
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return vscode.window.showInformationMessage('No code selected');
      }

      const code = editor.document.getText(editor.selection);
      
      outputChannel.appendLine('Analyzing code...');
      
      const response = await axios.post('http://localhost:3000/review', {
        codeReview: code
      });
      
      outputChannel.clear();  
      outputChannel.appendLine(response.data.review);
      outputChannel.show();
      
    })
  );

}

module.exports = {
  activate
}