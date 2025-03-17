// The fact that this works, and the error part is never reached makes me confused
// Hey, if it works, it works
try {
    let workspace;

    function initBlockly() {
       workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
       Blockly.JavaScript.init(workspace)
    }

    const server_event = {
      init: function() {
        this.appendEndRowInput('NAME')
          .appendField('On Server Event')
          .appendField(new Blockly.FieldDropdown([
              ['Recipe', 'recipe'],
              ['Test2', 'scream'],
              ['thing', 'thing']
            ]), 'EVENT_TYPE');
        this.appendStatementInput('statement');
        this.setTooltip('Listen onto a server event');
        this.setHelpUrl('');
        this.setColour(240);
      }
    };

    const console = {
      init: function() {
        this.appendValueInput('toSay')
          .appendField('Console Log');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
      }
    };

    Blockly.common.defineBlocks({console: console});
    Blockly.common.defineBlocks({server_event: server_event});

    javascript.javascriptGenerator.forBlock['console'] = function(block, generator) {
      // TODO: change Order.ATOMIC to the correct operator precedence strength
      const value = generator.valueToCode(block, 'toSay', javascript.Order.ATOMIC);

      const code = `console.log(${value})\n`;
      return code;
    }

    javascript.javascriptGenerator.forBlock['server_event'] = function(block, generator) {
      const dropdown_event_type = block.getFieldValue('EVENT_TYPE');
      const statements = generator.statementToCode(block, 'statement');

     var code = `ServerEvents.${dropdown_event_type}(event => {\n${statements}});\n`;
      return code
    };

    function generateCode() {
        console.log("Running generation")
      try {
          var code = javascript.javascriptGenerator.workspaceToCode(workspace);
          javaConnector.processCode(code)
      } catch (error) {
          console.error("Error in workspaceToCode:", error);
      }
      console.log("Generation done")
    }
} catch (error) {
    console.error("Global Error: ", error)
}