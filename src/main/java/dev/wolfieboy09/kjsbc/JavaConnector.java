package dev.wolfieboy09.kjsbc;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class JavaConnector {
    public void processCode(String code) {
        Path folder = Path.of("generated");
        System.out.println(code);
        if (Files.notExists(folder)) {
            try {
                Files.createDirectory(folder);
            } catch (Exception error) {
                System.err.println("ERROR - Failed to create directory 'generated'. Error: " + error);
                return;
            }
        }
        try (FileWriter writer = new FileWriter("generated/output.js")) {
            writer.write(code);
            System.out.println("JavaScript code written to output.js");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}