Removed the initial content and added a link to the deployment.

https://only-trable-final-frontend.vercel.app

Referens: https://www.figma.com/design/YLRBZlrYStKhG9SeKbkWwC/WebDev--Final-project--Copy-?node-id=1-3492&t=EqyQ1A27rrcXHUeY-0

Архітектура Клієнтської Авторизації (Front-end)

Ми впровадили надійний механізм обробки аутентифікації та оновлення токенів (Refresh Token) на клієнтській стороні, який складається з трьох ключових елементів:

1. AuthContext.jsx (Джерело Істини)

Що робить: Зберігає Access Token (JWT) у пам'яті (стан React, useState).

Первинна перевірка: Викликає /auth/refresh під час першого завантаження додатку (useEffect в AuthProvider). Це намагається отримати новий Access Token, використовуючи Refresh Token, який зберігається у HttpOnly Cookie (забезпечується бекендом).

Якщо успішно: Встановлює токен у стані (setAccessToken(newAccessToken)). Користувач вважається аутентифікованим (isAuthenticated = true).

Якщо невдало (401/403): Очищує стан токена.

2. setupInterceptors.js (Автоматичний Детектор 401)

Що робить: Перехоплює кожен вихідний запит і кожну вхідну відповідь axios.

Перехоплювач запиту (Request): Перед відправкою додає заголовок Authorization: Bearer <Access Token> (читає його через функцію getAccessToken() з контексту).

Перехоплювач відповіді (Response):

Виявляє 401 Unauthenticated: Якщо захищений запит повертає 401, він автоматично викликає /auth/refresh на бекенді.

Оновлення токена: Якщо оновлення успішне, новий Access Token зберігається через setAccessToken() (також функція з контексту).

Повторний запит: Після успішного оновлення, оригінальний запит (який отримав 401) автоматично повторюється з новим Access Token.

Обробка черги: Використовує механізм "черги запитів" (failedQueue), щоб усі запити, які надійшли під час оновлення, чекали і повторювалися з новим токеном, коли він буде доступний.

3. ProtectedRoute.jsx (Захист Маршрутів)

Що робить: Використовується в react-router-dom для захисту приватних сторінок.

Логіка:

Якщо isLoading (триває первинна перевірка в AuthContext), показує "Loading...".

Якщо !isAuthenticated, перенаправляє на сторінку логіну (/).

Якщо isAuthenticated, рендерить дочірній елемент (наприклад, MainPage) за допомогою <Outlet />.

Взаємодія Компонентів (Потік)

Сценарій: Користувач аутентифікований, але його Access Token щойно став недійсним.

Користувач тисне кнопку на MainPage, яка викликає api.get('/api/posts').

setupInterceptors.js (Request): Додає старий (недійсний) Access Token до заголовка.

Бекенд: Відхиляє запит і повертає відповідь з кодом 401 Unauthorized.

setupInterceptors.js (Response): Виявляє 401.

Встановлює originalRequest._retry = true.

Викликає api.post('/auth/refresh') (використовуючи Refresh Token з HttpOnly Cookie).

Бекенд: Перевіряє Refresh Token. Якщо він дійсний, створює новий Access Token і повертає його у тілі відповіді.

setupInterceptors.js (Response):

Отримує новий токен.

Викликає setAccessToken(newAccessToken) (з AuthContext), оновлюючи стан у пам'яті.

Повторює оригінальний запит (api.get('/api/posts')), але цього разу з новим Access Token'ом у заголовку.

Бекенд: Отримує повторний запит з дійсним токеном, успішно обробляє його і повертає дані.

Клієнт: Користувач отримує дані, не помітивши жодного збою у роботі.

Висновок: Ця архітектура забезпечує максимальну безпеку (Refresh Token у HttpOnly Cookie) та безшовний досвід для користувача (автоматичне оновлення Access Token'а).