# Sadovnikov Demo

Демонстрационная версия проекта **Sadovnikov** с доступом к административной панели.

* Основная версия (branch main): https://vlassadassa.ru/ru 
* Demo: https://sadovnikov-demo.vlassadassa.ru

## Зачем нужна demo-версия

Demo предназначена для демонстрации административной панели без предоставления доступа к production-окружению.

Demo и production являются независимыми приложениями. У demo отдельные:

* Docker Compose;
* PostgreSQL;
* environment variables;
* Better Auth configuration;
* uploads;
* Docker containers.

Изменения и данные demo не затрагивают production.

## Почему demo вынесена в отдельную ветку

Для demo используется отдельная ветка `demo`.

Это сделано намеренно, потому что production и demo со временем могут немного различаться. В demo могут появляться ограничения, тестовые данные, демонстрационные настройки и другие изменения, которые не нужны в основной версии.

Схема веток:

```text
main -> production
demo -> demo environment
```

Demo не предполагается как активно развиваемая версия проекта. Основная разработка продолжается в `main`, а ветка `demo` используется для небольших исправлений и изменений, относящихся непосредственно к демонстрационной версии.

Если в будущем поддержка двух веток начнёт требовать слишком много дублирования, архитектуру можно пересмотреть и синхронизировать общие изменения между ними.

## Почему нет автоматического deployment

Для demo намеренно не настроен автоматический deployment через GitHub Actions.

Production и demo имеют разный жизненный цикл:

* production обновляется в рамках основного процесса разработки;
* demo изменяется редко;
* изменения в `demo` не должны автоматически попадать на сервер после каждого push;
* ручной deployment позволяет отдельно проверить изменения перед обновлением публичной демонстрационной версии.

Поэтому для demo используется простой ручной процесс:

```text
local demo branch
        ↓
commit
        ↓
push to GitHub
        ↓
manual deploy on VPS
```

Для небольшого количества demo-обновлений отдельный CI/CD pipeline создавал бы дополнительную инфраструктуру без существенной практической пользы.

Если частота обновлений demo увеличится, ручной deployment можно в дальнейшем заменить автоматическим.

## Сервер

Demo хранится на том же VPS, что и основная версия, но в отдельной директории:

```text
/srv/portfolio-demo
```

Репозиторий:

```text
/srv/portfolio-demo/repo
```

Основные файлы:

```text
/srv/portfolio-demo/repo/compose.demo.yaml
/srv/portfolio-demo/repo/.env.demo
/srv/portfolio-demo/deploy.sh
```

Demo запускается как отдельный Docker Compose project и доступна через Caddy.

## Обновление

Локально работа ведётся в ветке:

```bash
git switch demo
```

После изменений:

```bash
git add .
git commit -m "fix: update demo"
git push origin demo
```

Deployment выполняется вручную на VPS:

```bash
cd /srv/portfolio-demo
bash deploy.sh
```

`deploy.sh` получает актуальное состояние `origin/demo`, собирает новый Docker image, применяет Prisma migrations и пересоздаёт контейнер приложения.

Автоматический deployment для demo намеренно не используется.
