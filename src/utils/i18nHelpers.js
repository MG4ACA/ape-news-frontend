/**
 * Get localized field value with fallback chain
 * Priority: requested locale → Sinhala (si) → English (en) → Tamil (ta) → legacy field
 *
 * @param {Object} item - The data object (e.g., news article)
 * @param {String} fieldName - The base field name (e.g., 'title', 'excerpt', 'content')
 * @param {String} locale - The requested locale (e.g., 'si', 'en', 'ta')
 * @returns {String} The localized value or fallback
 */
export function getLocalizedField(item, fieldName, locale) {
  if (!item) return '';

  // Try requested locale first
  const requestedField = `${fieldName}_${locale}`;
  if (item[requestedField]) {
    return item[requestedField];
  }

  // Fallback chain: si → en → ta → legacy field
  const fallbackChain = ['si', 'en', 'ta'];

  for (const fallbackLocale of fallbackChain) {
    if (fallbackLocale === locale) continue; // Skip the requested locale (already tried)
    const fallbackField = `${fieldName}_${fallbackLocale}`;
    if (item[fallbackField]) {
      return item[fallbackField];
    }
  }

  // Last resort: legacy field (for backward compatibility)
  return item[fieldName] || '';
}

/**
 * Get available languages for a news item
 *
 * @param {Object} item - The news article object
 * @returns {Array} Array of available locale codes
 */
export function getAvailableLanguages(item) {
  if (!item) return [];

  const languages = [];

  // Check each language
  if (item.title_si || item.content_si) languages.push('si');
  if (item.title_en || item.content_en) languages.push('en');
  if (item.title_ta || item.content_ta) languages.push('ta');

  return languages;
}

/**
 * Check if item has translation in given locale
 *
 * @param {Object} item - The data object
 * @param {String} locale - The locale to check
 * @returns {Boolean} True if translation exists
 */
export function hasTranslation(item, locale) {
  if (!item || !locale) return false;

  // Check if either title or content exists for this locale
  return !!(item[`title_${locale}`] || item[`content_${locale}`]);
}
