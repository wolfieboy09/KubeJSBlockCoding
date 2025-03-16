package dev.wolfieboy09.kjsbc.api.blocks;

public record Category(String category) {
    public static final Category CONSOLE = new Category("console");

    public static Category of(String category) {
        return new Category(category);
    }
}
