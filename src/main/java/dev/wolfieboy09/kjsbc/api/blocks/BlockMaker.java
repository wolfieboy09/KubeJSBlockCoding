package dev.wolfieboy09.kjsbc.api.blocks;


import dev.wolfieboy09.kjsbc.api.errors.FieldsAlreadyContainPair;

import java.util.HashMap;
import java.util.Map;

public abstract class BlockMaker {
    private final Map<String, String> fields = new HashMap<>();

    public abstract Category getCategory();
    public abstract int getColor();
    public abstract String getTooltip(String tooltip);

    /**
     * This method adds a field to a field dropdown
     * @param readable The key that represents the value for code generation
     * @param value What it holds
     */
    public void addField(String readable, String value) {
        if (this.fields.containsKey(readable)) {
            throw new FieldsAlreadyContainPair("The field '" + readable + "' already exists");
        }
        if (this.fields.containsValue(value)) {
            throw new FieldsAlreadyContainPair("The value '" + value + "' already exists");
        }
        this.fields.put(readable, value);
    }

    public final Map<String, String> getFields() {
        return this.fields;
    }
}
