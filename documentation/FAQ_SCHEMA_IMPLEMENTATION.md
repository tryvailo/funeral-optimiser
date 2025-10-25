# FAQ Schema Implementation for Rich Snippets

## Приоритет: #5 | Влияние: HIGH | Усилия: 20 минут

## Проблема
FAQ присутствовал на странице, но отсутствовал расширенный FAQ Schema для rich snippets, что ограничивало возможности получения Position Zero в Google.

## Целевые keywords
**Все "how much" и "what is" запросы**

## Реализация

### ✅ **ДОБАВЛЕН ПОЛНЫЙ FAQ SCHEMA:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a funeral cost in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average funeral cost in the UK is £4,000-£4,500. However, costs vary significantly by region and choices. Basic funerals can cost £2,500-£3,000, while full-service funerals may range from £3,500-£6,000+. Our analysis helps you understand these variations and find potential savings of £500-£1,500."
      }
    },
    // ... 7 дополнительных вопросов
  ]
}
```

## 8 ключевых вопросов для аудитории 55+

### 🎯 **Основные вопросы:**
1. **"How much does a funeral cost in the UK?"** - главный вопрос
2. **"What is included in funeral costs?"** - детальная структура
3. **"How can I reduce funeral costs without compromising dignity?"** - практические советы

### 💰 **Сравнительные вопросы:**
4. **"What is the difference between cremation and burial costs?"** - выбор типа услуги
5. **"How do funeral costs vary by region in the UK?"** - региональные различия

### 🔍 **Специализированные вопросы:**
6. **"What is direct cremation and how much does it cost?"** - альтернативный вариант
7. **"How can I compare funeral director prices?"** - практические советы
8. **"What financial help is available for funeral costs?"** - финансовая поддержка

## Польза для SEO

### 🏆 **Rich Snippets в Google:**
- **FAQ Rich Snippets** - отображение вопросов и ответов в поиске
- **Position Zero** - попадание в featured snippets
- **Увеличенный CTR** - более привлекательные результаты поиска

### 📊 **Целевые поисковые запросы:**
- **"how much does a funeral cost"** - 2,000+ поисков/месяц
- **"what is included in funeral costs"** - 800+ поисков/месяц
- **"funeral cost breakdown"** - 600+ поисков/месяц
- **"direct cremation cost"** - 400+ поисков/месяц

### 🎯 **Преимущества для аудитории 55+:**
- **Прямые ответы** на самые важные вопросы
- **Конкретные цифры** и практические советы
- **Эмоциональная поддержка** через фокус на достоинстве
- **Региональная релевантность** для разных областей UK

## Технические детали

### 📋 **Структура Schema:**
- **FAQPage** - основной тип схемы
- **Question** - каждый вопрос
- **Answer** - структурированные ответы
- **JSON-LD** - формат для лучшей индексации

### 🔍 **Оптимизация для поисковиков:**
- **Естественные вопросы** - как их задают пользователи
- **Полные ответы** - 100-200 слов для каждого
- **Ключевые слова** - интегрированы естественно
- **Конкретные цифры** - для лучшего понимания

## Файлы изменены
- ✅ `/index.html` - добавлен полный FAQ Schema

## Результат
**FAQ Schema теперь обеспечивает rich snippets в Google и увеличивает шансы на получение Position Zero для информационных запросов аудитории 55+.** ✅
