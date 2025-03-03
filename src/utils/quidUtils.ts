// src/utils/guidUtils.ts

// Генерирует случайный GUID v4
export function generateGuid(): string {
  // Используем алгоритм на основе Math.random() - подходит для наших целей
  // В производственной среде можно использовать более надежные библиотеки, например, uuid
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
