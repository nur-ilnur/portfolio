# Ильнур — режиссёр монтажа

Статический одностраничный сайт. Все готовые файлы находятся в `dist/`: папку можно разместить на любом статическом хостинге, включая GitHub Pages или Cloudflare Pages.

## GitHub Pages

Репозиторий: https://github.com/nur-ilnur/portfolio

Публикация настроена файлом `.github/workflows/deploy-pages.yml`: после push в `main` GitHub Actions публикует содержимое `dist/`. В настройках репозитория Pages нужно выбрать источник **GitHub Actions**.

Адрес после включения Pages и успешной публикации: https://nur-ilnur.github.io/portfolio/

Обычное обновление из папки проекта:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

## Локальный просмотр

Из папки проекта: `python3 -m http.server 4173 --directory dist`.

## Обновление

- Работы: `dist/projects.js`. Поля: `title`, `category`, `url`, `image` и необязательный `youtubeId`.
- Обложки: `dist/assets/`.
- Тексты и контакты: `dist/index.html`.
- Оформление: `dist/styles.css`.
- Счётчики работ обновляются автоматически из `dist/projects.js`.
- Шоурил: ссылка, обложка и `data-youtube-id` у `#showreel` в `dist/index.html`.
- Подкасты показываются отдельным последним разделом портфолио.

Видео YouTube открываются во встроенном проигрывателе по клику. Для категории `shorts` используется вертикальный плеер 9:16 с высотой по экрану. Яндекс Диск открывается в новой вкладке. Видеофайлы не дублируются в репозитории. Обложки сохранены локально, чтобы они не зависели от временных ссылок Яндекс Диска.
