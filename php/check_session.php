<?php
session_start();
$response = [];

if (isset($_SESSION['uid'])) {
    include 'connect.php';

    // Перевірка, чи користувач існує в базі даних
    $uid = $conn->real_escape_string($_SESSION['uid']);  // Захист від SQL-ін'єкцій
    $check_user_sql = "SELECT * FROM users_table WHERE uid='$uid'";

    $result = $conn->query($check_user_sql);

    if ($result && $result->num_rows > 0) {
        // Користувач зареєстрований в базі даних
        $user_data = $result->fetch_assoc();
        
        // Отримуємо BLOB-дані зображення з бази даних
        $profile_image_blob = $user_data['profileimg'];
        
        // Конвертуємо BLOB-дані в base64
        $profile_image_base64 = base64_encode($profile_image_blob);

        // Передаємо base64-кодовані дані у відповідь
        $response['status'] = 'authenticated';
        $response['profile_image_base64'] = $profile_image_base64;
        $response['profile_nickname'] = $user_data['login'];
        $response['profile_permission'] = $user_data['permission'];
    } else {
        // Користувач не знайдений в базі даних, видаляємо сесію
        session_destroy();
        $response['status'] = 'unauthenticated';
    }

    $result->close();  // Закриваємо результат вибірки
    $conn->close();
} else {
    $response['status'] = 'unauthenticated';
}

// Переконайтеся, що передається тільки JSON-об'єкт, без зайвих виводів перед або після PHP-блоку
header('Content-Type: application/json');
echo json_encode($response);
exit();
?>
