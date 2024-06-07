<?php
include 'connect.php';

// Початок сесії
session_start();

// Перевірка, чи користувач вже авторизований
if (isset($_SESSION['uid'])) {
    echo "Ви вже авторизовані. <a href='logout.php'>Вийти</a>";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['loginbtn'])) {
        // Авторизація
        $login = $_POST['login'];
        $password = $_POST['password'];

        // Перевірка, чи не порожні поля
        if (empty($login) || empty($password)) {
            echo "<script>alert('Будь ласка, заповніть всі поля.'); window.location.href = '/';</script>";
            exit();
        }

        $hashed_password = md5($password);

        $sql = "SELECT * FROM users_table WHERE login='$login' AND password='$hashed_password'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Користувач авторизований
            $_SESSION['uid'] = $result->fetch_assoc()['uid']; // Зберігаємо унікальний ідентифікатор користувача в сесії
            echo "<script>alert('Авторизація успішна!'); window.location.href = '/';</script>";
            exit();
        } else {
            echo "<script>alert('Невірний логін або пароль!'); window.location.href = '/';</script>";
        }
    } elseif (isset($_POST['regbtn'])) {
        // Реєстрація
        $login = $_POST['login'];
        $password = $_POST['password'];

        // Перевірка, чи не порожні поля
        if (empty($login) || empty($password)) {
            echo "<script>alert('Будь ласка, заповніть всі поля.'); window.location.href = '/';</script>";
            exit();
        }

        $profileimg = "/img/profile_img/example.png"; // Задайте шлях до зображення

        $hashed_password = md5($password);

        // Перевірка, чи не існує вже користувач з таким логіном
        $check_existing_sql = "SELECT * FROM users_table WHERE login='$login'";
        $existing_result = $conn->query($check_existing_sql);

        if ($existing_result->num_rows > 0) {
            echo "<script>alert('Користувач з таким логіном вже існує!'); window.location.href = '/';</script>";
        } else {
            // Якщо користувача з таким логіном не існує, виконуємо реєстрацію
            $uid = uniqid();
            $register_sql = "INSERT INTO users_table (uid, login, password, permission, regdate, profileimg) VALUES ('$uid', '$login', '$hashed_password', 'user', NOW(), '$profileimg')";

            if ($conn->query($register_sql) === TRUE) {
                $_SESSION['uid'] = $uid; // Зберігаємо унікальний ідентифікатор користувача в сесії
                echo "<script>alert('Реєстрація успішна!'); window.location.href = '/';</script>";
                exit();
            } else {
                $error_message = escape("Помилка при реєстрації: " . $conn->error);
                echo "<script>alert('$error_message');</script>";
            }
        }

    }
}

$conn->close();
?>
