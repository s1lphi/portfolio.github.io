<?php
// Підключення до бази даних
require_once 'connect.php'; // Файл з параметрами підключення

// Запит для вибірки даних
$query = "SELECT id, ev_uid, name, price, describ FROM events_table";
$result = mysqli_query($connection, $query);

// Масив для зберігання даних
$events = array();

// Перевірка наявності результатів запиту
if (mysqli_num_rows($result) > 0) {
    // Отримання даних із кожного рядка результату запиту
    while ($row = mysqli_fetch_assoc($result)) {
        // Додавання даних до масиву
        $events[] = $row;
    }
}

// Виведення даних у форматі JSON
echo json_encode($events);

// Закриття з'єднання з базою даних
mysqli_close($connection);
?>
