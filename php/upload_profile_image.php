<?php
session_start();
$response = [];

if (isset($_SESSION['uid'])) {
    include 'connect.php';

    $uid = $conn->real_escape_string($_SESSION['uid']);

    if ($_FILES['profileImage']['error'] === 0) {
        $profileImageData = file_get_contents($_FILES['profileImage']['tmp_name']);
        $profileImageData = $conn->real_escape_string($profileImageData);

        // Оновлюємо дані в базі даних, зберігаючи фотографію у форматі BLOB
        $updateImageSql = "UPDATE users_table SET profileimg='$profileImageData' WHERE uid='$uid'";

        if ($conn->query($updateImageSql)) {
            $response['status'] = 'success';
        } else {
            $response['status'] = 'error';
            $response['error_message'] = $conn->error;
        }
    } else {
        $response['status'] = 'error';
        $response['error_message'] = 'Помилка при отриманні файлу.';
    }

    $conn->close();
} else {
    $response['status'] = 'unauthenticated';
}

header('Content-Type: application/json');
echo json_encode($response);
exit();
?>
