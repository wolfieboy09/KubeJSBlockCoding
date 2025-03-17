package dev.wolfieboy09.kjsbc;

import java.io.FileWriter;
import java.io.IOException;

public class JavaConnector {
    public void processCode(String code) {
        System.out.println(code);
        try (FileWriter writer = new FileWriter("generated/output.js")) {
            writer.write(code);
            System.out.println("JavaScript code written to output.js");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}