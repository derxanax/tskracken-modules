# TSKracken Modules Repository

🚀 **Официальный репозиторий модулей для языка программирования TSKracken**

## Описание

Этот репозиторий содержит коллекцию модулей и пакетов для языка программирования TSKracken. Модули можно устанавливать через пакетный менеджер `tskcmp`.

## Установка модулей

```bash
# Поиск модулей
tskcmp search web

# Установка модуля
tskcmp install mathematic

# Список установленных модулей
tskcmp list
```

## Доступные модули

### 📊 mathematic
- **Описание:** Математические операции и функции
- **Установка:** `tskcmp install mathematic`
- **Теги:** math, calculator, functions, algebra, geometry

**Пример использования:**
```tsk
imp mathematic
result = sqrt(16)
conlog "Корень из 16:" (result)
```

### 🌐 site-crack  
- **Описание:** Веб-разработка и HTTP серверы
- **Установка:** `tskcmp install site-crack`
- **Теги:** web, http, server, html, website, frontend

**Пример использования:**
```tsk
imp site-crack
html = lite.html.crack.made("Мой сайт", "body", "h1", "Привет, мир!")
port = 3000
site.made.crack
site.start.crack
```

## Структура репозитория

```
tsk-modules/
├── list/
│   └── lispack.json          # Каталог всех пакетов
├── packages/
│   ├── mathematic/           # Математический модуль
│   └── site-crack/           # Веб-модуль
└── README.md
```

## Разработка модулей

### Структура модуля

Каждый модуль должен содержать:

1. **package.json** - метаданные модуля
2. **index.ts** - основной код модуля

### Пример package.json

```json
{
  "name": "my-module",
  "version": "1.0.0",
  "description": "Описание модуля",
  "main": "index.ts",
  "exports": ["MyModuleClass"],
  "dependencies": [],
  "author": "Your Name",
  "tags": ["tag1", "tag2"]
}
```

### Пример index.ts

```typescript
export class MyModuleClass {
    doSomething(): void {
        console.log("Модуль работает!");
    }
}
```

## Вклад в развитие

1. Fork этого репозитория
2. Создайте ветку для вашего модуля
3. Добавьте модуль в папку `packages/`
4. Обновите `list/lispack.json`
5. Создайте Pull Request

## Лицензия

MIT License - используйте свободно для любых целей.

## Связь

- **GitHub:** [derxanax/tskracken-modules](https://github.com/derxanax/tskracken-modules)
- **Основной проект:** [TSKracken Language](https://github.com/derxanax/tskracken)

---

⭐ **Поставьте звезду, если проект вам полезен!** 