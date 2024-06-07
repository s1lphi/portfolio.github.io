// Функція для виклику PHP скрипта та збереження HTML документу
function saveEventData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                var eventData = JSON.parse(xhr.responseText);
                eventData.forEach(function(event) {
                    // Створення HTML для кожної події
                    var html = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${event.ev_uid}</title>
                            <link rel="stylesheet" href="/css/main.css">
                            <link rel="stylesheet" href="/css/eventpage.css">
                        </head>
                        <body>
                            <div class="wrapper">
                                <main>
                                    <div class="evinfo-container">
                                        <div class="insidevinfo-container">
                                            <div class="evinfoimage-container">
                                                <div class="evinfonameofcont"><h1>${event.name}</h1></div>
                                                <div class="evmainblock-container">
                                                    <img src="${event.ev_img}" alt="">
                                                    <div class="evpriceinfo-container">
                                                        <h1>${event.price}</h1>
                                                        <button>купити</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="evtextinfo-maincontainer">
                                                <div class="evtextinfo-container">
                                                    <p>${event.describ}</p>    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                                <footer></footer>
                            </div>
                        </body>
                        </html>`;

                    // Створення Blob об'єкту
                    var blob = new Blob([html], {type: 'text/html'});

                    // Створення URL для Blob
                    var url = URL.createObjectURL(blob);

                    // Створення посилання для завантаження HTML файлу
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = event.ev_uid + '.html'; // назва файлу - ev_uid.html

                    // Додавання посилання на сторінку
                    document.body.appendChild(a);

                    // Симулювання кліку по посиланню для автоматичного завантаження файлу
                    a.click();

                    // Видалення посилання з DOM
                    document.body.removeChild(a);
                });
            } else {
                console.log('Запит на сервер закінчився з помилкою');
            }
        }
    };
    xhr.open('GET', '/php/getEventData.php', true);
    xhr.send();
}

// Отримання кнопки за її id
var buyBtn = document.getElementById('buybtn2371');

// Додавання обробника події кліку на кнопку
buyBtn.addEventListener('click', function() {
    saveEventData(); // Виклик функції для збереження HTML документу при кліці на кнопку
});
