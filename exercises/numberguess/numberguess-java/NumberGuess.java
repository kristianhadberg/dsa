import java.util.Scanner;

public class NumberGuess {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int secretNumber = (int)Math.floor((Math.random()) * 100);
        int guessFromUser;

        System.out.println("Input a number between 1-100");
        do {

            guessFromUser = scanner.nextInt();

            if (guessFromUser > secretNumber) {
                System.out.println("The number you entered is too high. Try again.");
            }

            if (guessFromUser < secretNumber) {
                System.out.println("The number you entered is too low. Try again.");
            }

        } while (guessFromUser != secretNumber);

        System.out.println("Correct! The secret number was: " + secretNumber);
    }
}