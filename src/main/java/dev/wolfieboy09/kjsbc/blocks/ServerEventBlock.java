package dev.wolfieboy09.kjsbc.blocks;

import dev.wolfieboy09.kjsbc.api.blocks.BlockMaker;
import dev.wolfieboy09.kjsbc.api.blocks.Category;

public class ServerEventBlock extends BlockMaker {

    @Override
    public Category getCategory() {
        return null;
    }

    @Override
    public int getColor() {
        return 240;
    }

    @Override
    public String getTooltip() {
        return "Listen onto a server event";
    }

    @Override
    public String getType() {
        return "console";
    }
}
