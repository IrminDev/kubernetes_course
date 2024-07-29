import java.io.*;
import java.util.*;

public class Exercise1_1 {
    public static void main(String[] args) {
        // Create a program that generates a random string on startup, save it into a file and print it every five seconds

        // Generate a random string
        String random = "This is awesome!";

        // Print it every five seconds
        Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            public void run() {
                String ts = new Date().toString() + random;
                System.out.println(ts);
                try {
                    FileWriter writer = new FileWriter("random.txt");
                    writer.write(ts);
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }, 0, 5000);
    }
}