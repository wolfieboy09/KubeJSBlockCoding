package dev.wolfieboy09.kjsbc;

import java.io.*;
import java.net.URISyntaxException;
import java.nio.file.*;
import java.util.List;

public class ResourceLoader {
    public static List<String> getJsonFiles(String folder) throws IOException {
        try {
            Path path = Paths.get(ClassLoader.getSystemResource(folder).toURI());
            return Files.walk(path)
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .filter(name -> name.endsWith(".json"))
                    .toList();
        } catch (URISyntaxException | NullPointerException e) {
            // fetch files from JAR in packaged mode
            return extractResourcesFromJar(folder);
        }
    }

    private static List<String> extractResourcesFromJar(String folder) throws IOException {
        InputStream jarResource = ResourceLoader.class.getClassLoader().getResourceAsStream(folder);
        if (jarResource == null) return List.of();

        Path tempDir = Files.createTempDirectory("extracted_resources");
        Files.copy(jarResource, tempDir.resolve(folder), StandardCopyOption.REPLACE_EXISTING);

        return Files.walk(tempDir)
                .filter(Files::isRegularFile)
                .map(Path::getFileName)
                .map(Path::toString)
                .filter(name -> name.endsWith(".json"))
                .toList();
    }
}
