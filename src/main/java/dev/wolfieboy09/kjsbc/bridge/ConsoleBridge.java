package dev.wolfieboy09.kjsbc.bridge;

public class ConsoleBridge {
    public void log(String type, Object message) {
        System.out.println("[JS Console - " + type.toUpperCase() + "] " + message);
    }
}
