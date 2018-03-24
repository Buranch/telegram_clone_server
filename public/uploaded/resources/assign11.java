import java.util.Scanner;
class AssOne {
    public static void main(String[] args) {

        double celsius;
        Scanner input = new Scanner(System.in);
        celsius = input.nextDouble();
        double fahrenheit = (9 / 5) * (celsius / 32);

        System.out.println("Fahrenheit is " + celsius);


    }
}