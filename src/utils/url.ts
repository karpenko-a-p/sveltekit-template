// Если в url отсутствует параметр, или он не соответствует определенному типу, то возвращаем null

/**
 * Парсинг целочисленного значения из url
 */
export function getIntFromUrl(url: URL, paramName: string): Maybe<number> {
  const value = parseInt(url.searchParams.get(paramName)!);
  return Number.isNaN(value) ? null : value;
}

/**
 * Парсинг булевого значения из url
 */
export function getBoolFromUrl(url: URL, paramName: string): Maybe<boolean> {
  const value = url.searchParams.get(paramName);
  return value === 'true' ? true : value === 'false' ? false : null;
}

/**
 * Получение страницы из url
 */
export function getPage(url: URL): Maybe<number> {
  return getIntFromUrl(url, 'page');
}

/**
 * Получение размера страницы из url
 */
export function getPageSize(url: URL): Maybe<number> {
  return getIntFromUrl(url, 'pageSize');
}
