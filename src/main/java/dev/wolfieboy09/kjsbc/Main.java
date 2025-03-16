package dev.wolfieboy09.kjsbc;

import dev.wolfieboy09.kjsbc.bridge.ConsoleBridge;
import javafx.application.Application;
import javafx.concurrent.Worker;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;
import java.util.Objects;

public class Main extends Application {
    @Override
    public void start(Stage primaryStage) {
        WebView webView = new WebView();
        WebEngine webEngine = webView.getEngine();
        webView.getEngine().setJavaScriptEnabled(true);

        webEngine.setOnError(event -> {
            System.err.println("WebView Error: " + event.getMessage());
            event.getException().printStackTrace();
        });

        webEngine.setOnAlert(event -> System.out.println("JavaScript Alert: " + event.getData()));

        webEngine.load(Objects.requireNonNull(getClass().getResource("/web/index.html")).toExternalForm());

        webEngine.getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
            //if (newState == Worker.State.SUCCEEDED) {
                JSObject window = (JSObject) webEngine.executeScript("window");
                window.setMember("javaConnector", new JavaConnector());
                window.setMember("javaConsole", new ConsoleBridge());
                webEngine.executeScript("""
                    (function() {
                        let methods = ['log', 'error', 'warn', 'info', 'debug'];
                        methods.forEach(function(method) {
                            let original = console[method];
                            console[method] = function(...args) {
                                javaConsole.log(method, args.join(' '));
                                original.apply(console, args);
                            };
                        });
                    })();
                """);
            System.out.println("Injected");
            //}
        });

        BorderPane root = new BorderPane(webView);
        Scene scene = new Scene(root, 800, 600);
        primaryStage.setTitle("KubeJS Block Coding");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}