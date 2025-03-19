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

    const crafting_recipe = {
      init: function() {
        this.appendEndRowInput('STATEMENT')
          .appendField('Shaped Recipe');
        this.appendValueInput('SHAPE')
        .setCheck('CraftingRecipe')
          .appendField('Shape:');
        this.appendEndRowInput('BLANK');
        this.appendValueInput('KEY')
        .setCheck('CraftingKeys')
          .appendField('Keys:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Create a recipe with the crafting table');
        this.setHelpUrl('');
        this.setColour(225);
      }
    };

    const CraftingRecipe = {
      init: function() {
        this.appendDummyInput('TopRow')
          .appendField(new Blockly.FieldTextInput('AAA'), 'TOP_ROW');
        this.appendEndRowInput('r1e');
        this.appendDummyInput('MiddleRow')
          .appendField(new Blockly.FieldTextInput('BBB'), 'MIDDLE_ROW');
        this.appendEndRowInput('r2e');
        this.appendDummyInput('BottomRow')
          .appendField(new Blockly.FieldTextInput('CCC'), 'BOTTOM_ROW');
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
      }
    };

    Blockly.common.defineBlocks({
      dynamic: {
        init: function () {
          this.appendDummyInput()
              .appendField("Key-Value Pairs")
              .appendField(new Blockly.FieldButton("+", () => this.addRow()));

          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);

          this.dataRows = 0;
        },

        addRow: function () {
          this.dataRows++;

          this.appendValueInput("KEY" + this.dataRows)
              .setCheck("String")
              .appendField("Key");

          this.appendValueInput("VALUE" + this.dataRows)
              .setCheck("String")
              .appendField("Value");

          this.moveInputBefore("KEY" + this.dataRows, null);
          this.moveInputBefore("VALUE" + this.dataRows, null);

          this.render();
        }
      }
    });

    Blockly.common.defineBlocks({CraftingRecipe: CraftingRecipe});
    Blockly.common.defineBlocks({crafting_recipe: crafting_recipe});
    Blockly.common.defineBlocks({console: console});
    Blockly.common.defineBlocks({server_event: server_event});

    javascript.javascriptGenerator.forBlock['CraftingRecipe'] = function(block, generator) {
      const text_top_row = block.getFieldValue('TOP_ROW');

      const text_middle_row = block.getFieldValue('MIDDLE_ROW');

      const text_bottom_row = block.getFieldValue('BOTTOM_ROW');

      const code = `${text_top_row} | ${text_middle_row} | ${text_bottom_row}`;
      return [code, javascript.Order.NONE];
    }

    javascript.javascriptGenerator.forBlock['crafting_recipe'] = function(block, generator) {
      const value_shape = generator.valueToCode(block, 'SHAPE', javascript.Order.ATOMIC);

      const value_key = generator.valueToCode(block, 'KEY', javascript.Order.ATOMIC);

      const code = `${value_shape} | ${value_key}`;
      return code;
    }

    javascript.javascriptGenerator.forBlock['console'] = function(block, generator) {
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