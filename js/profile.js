

document.addEventListener("DOMContentLoaded", function() {
    // Викликаємо AJAX-запит для отримання інформації про користувача
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/php/check_session.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.status === "authenticated") {
                // Декодуємо base64 у BLOB
                var blob = b64toBlob(response.profile_image_base64);

                // Створюємо URL з BLOB-даних
                var blobUrl = URL.createObjectURL(blob);

                // Підставляємо URL зображення в тег <img>
                document.getElementById("profileimage").src = blobUrl;
                setTimeout(() => {
                    document.getElementById("profileimage").style.display = "flex";
                }, 500);
                document.getElementById("nickname").innerHTML = response.profile_nickname;
                document.getElementById("permission").innerHTML = response.profile_permission;
            } else {
                // Обробка випадку, коли користувач не аутентифікований
                console.log("Користувач не аутентифікований");
            }
        }
    };
    xhr.send();
});

// Функція для конвертації base64 у BLOB
function b64toBlob(base64Data) {
    var byteCharacters = atob(base64Data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
}

function openFileInput() {
    document.getElementById('fileInput').click();
}

function uploadProfileImage() {
    var fileInput = document.getElementById('fileInput');

    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];

        var formData = new FormData();
        formData.append('profileImage', selectedFile);

        // Викликаємо AJAX-запит для відправки файлу на сервер
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/php/upload_profile_image.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Обробляємо відповідь сервера
                var response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alert('Зображення успішно завантажено!');
                } else {
                    alert('Помилка під час завантаження зображення.');
                }
            }
        };
        xhr.send(formData);
    }
}
