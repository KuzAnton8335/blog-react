Области хранения данных:
-база данных на json-server
-BFF
-редакс стор

Сущности приложения:
-пользователь: БД (список пользователей),BFF(сессия текущего),стор (отображение в браузере)
-роль пользователя: БД(список ролей),BFF(сессия пользователя c ролью), стор (использование на клиенте)
-статья:БД (список статей), стор (отображение в браузере)
-комментарий:БД (список комментариев), стор (отображение в браузере)

Таблицы БД:
-пользователи - users: id / login / password / registed_at / role_id
-роли - roles: id / name
-статьи - posts: id / title / image_url / content / published_at
-комментарий - comments : id / author_id / post_id / content

Схема состояния на BFF:
-сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте)
-user: id / login / roleId
-posts: массиве post: id / title / imageUrl / publishedAt / commentsCount
-post: id / title / imageUrl / content / publishedAt / comments: массиве comment: id / author / content / publishedAt
-users: массиве user: id/ login / registedAt / role
