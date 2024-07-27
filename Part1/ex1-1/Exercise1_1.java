import java.io.*;
import java.util.*;

public class Exercise1_1 {
    public static void main(String[] args) {
        // Create a program that generates a random string on startup, save it into a file and print it every five seconds

        // Generate a random string
        String random = Math.random() + "";

        // Save it into a file
        try {
            FileWriter writer = new FileWriter("random.txt");
            writer.write(random);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Print it every five seconds
        Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            public void run() {
                try {
                    BufferedReader reader = new BufferedReader(new FileReader("random.txt"));
                    System.out.println(reader.readLine());
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }, 0, 5000);
    }
}