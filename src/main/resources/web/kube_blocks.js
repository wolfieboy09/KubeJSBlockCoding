let workspace;

function initBlockly() {
   workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
   Blockly.JavaScript.init(workspace)
}

const server_event = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('On Server Event')
      .appendField(new Blockly.FieldDropdown([
          ['Recipe', 'RECIPE'],
          ['Test', 'TEST']
        ]), 'EVENT_TYPE');
    this.appendStatementInput('statement');
    this.setTooltip('Listen onto a server event');
    this.setHelpUrl('');
    this.setColour(240);
  }
};

const console = {
  init: function() {
    this.appendValueInput('String')
      .appendField('Console Log');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};

Blockly.common.defineBlocks({server_event: server_event});
Blockly.common.defineBlocks({console: console});

javascript.javascriptGenerator.forBlock['console'] = function(block, generator) {
  const value_string = generator.valueToCode(block, 'String', javascript.Order.ATOMIC);

  return `console.log('${value_string}')\n`;
}

javascript.javascriptGenerator.forBlock['server_event'] = function(block, generator) {
 var dropdown_event_type = block.getFieldValue('EVENT_TYPE');
 var statements = generator.statementToCode(block, 'statement');

 var code = `ServerEvents.${dropdown_event_type}(event => {\n${statements}});\n`;
  return code
};

function generateCode() {
    console.log("Running generation")
  try {
      var code = javascript.javascriptGenerator.workspaceToCode(workspace);
      console.info(code)
      javaConnector.processCode(code)
  } catch (error) {
      console.error("Error in workspaceToCode:", error);
  }
  console.log("Generation done")
}
