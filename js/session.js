const logbtnCont = document.getElementById('loginbtn-main');
const loginForm = document.getElementById('loginform');
const minProf = document.getElementById('minprof-cont');
let loginFormOpen = false;
  
  
  // Виклик функції перевірки сесії при завантаженні сторінки
  document.addEventListener('DOMContentLoaded', checkSession);

  // Додайте слухач кліка для кнопки
  logbtnCont.addEventListener('click', handleButtonClick);
  
  function handleButtonClick() {
      // Виклик функції перевірки сесії при кліку на кнопці
      checkSession();
  
      // Додаткова логіка обробки кліка, якщо необхідно
      toggleLoginForm();
  }
  
  function toggleLoginForm() {
      if (!loginFormOpen) {
          loginForm.style.transform = "translateY(0)";
          minProf.style.borderBottomLeftRadius = '0';
          logbtnCont.style.backgroundColor = "rgb(0, 0, 180)";
          loginFormOpen = true;
      } else {
          loginForm.style.transform = "translateY(-200%)";
          setTimeout(() => {
            minProf.style.borderBottomLeftRadius = '10px';
          }, 100);
          logbtnCont.style.backgroundColor = "";
          loginFormOpen = false;
      }
  }
  
  function checkSession() {
      fetch('/php/check_session.php')
          .then(response => response.json())
          .then(handleSessionStatus)
          .catch(handleSessionError);
  }

  function handleButtonClick() {
    // Змінено на async/await для зручності роботи з асинхронним запитом
    (async () => {
        try {
            // Виклик функції перевірки сесії при кліку на кнопці
            await checkSession();

            // Додаткова логіка обробки кліка, якщо необхідно
            toggleLoginForm();
        } catch (error) {
            console.error('Помилка при обробці сесії:', error);
        }
    })();
}

async function checkSession() {
    const response = await fetch('/php/check_session.php');
    const data = await response.json();
    handleSessionStatus(data);
}
  
  function handleSessionStatus(data) {
      if (data.status === 'authenticated') {
          // Користувач авторизований, оновлюємо кнопку
          logbtnCont.innerHTML = '<p>Мій профіль</p>';
          logbtnCont.addEventListener('click', () =>{
            window.location.href = "/page/profile.html";
          });
          logbtnCont.style.backgroundColor = "";
          loginForm.style.display = "none";
          minProf.style.borderBottomLeftRadius = '10px';
      } else {
          // Користувач не авторизований, відображаємо кнопку для авторизації
          logbtnCont.innerHTML = '<p>Авторизуватися</p>';
      }
  }
  
  function handleSessionError(error) {
      console.error('Помилка при перевірці сесії:', error);
      // Додайте логіку обробки помилок для користувача, якщо потрібно
  }