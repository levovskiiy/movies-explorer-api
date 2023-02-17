export const HTTP_ERROR = {
  NOT_FOUND: {
    code: 404,
    message: 'Ресурс по данному запросу не найден',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Ошибка атворизации',
  },
  FORBIDDEN: {
    code: 403,
    message: 'Доступ запрещен',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Невозможно обработать запрос',
  },
  CONFLICT: {
    code: 409,
    message: 'Запрос не может быть выполнен из-за конфликтного обращения к ресурсу',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'На сервере произошла ошибка',
  },
};

export const USER_ERROR_MESSAGES = {
  NOT_FOUND_BY_ID: 'Пользователь с данным ID не найден',
  EMAIL_ALREADY_EXIST: 'Пользователь с таким Email уже существует',
};

export const AUTHORIZATION_ERROR_MESSAGES = {
  INCORRECT_CREDENTIALS: 'Неверный логин или пароль',
  REQUIRED_AUTHORIZATION: 'Необходимо авторизоваться',
};

export const MOVIE_ERROR_MESSAGES = {
  NOT_FOUND: 'Пользователь не сохранил ни одного фильма',
  NOT_FOUND_BY_ID: 'Фильм по данному ID не найден',
  ID_MISMATCH: 'Данный фильм не сохранен у пользователя',
};
