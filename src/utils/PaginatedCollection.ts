/**
 * Пагинированная коллекция
 */
export interface PaginatedCollection<TItem> {
  readonly items: TItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

/**
 * Пагинация
 */
export abstract class Pagination {
  /**
   * Создание пагинированной коллекции
   */
  static createCollection<TItem>(
    items: TItem[],
    page: number,
    pageSize: number,
    totalItems: number
  ): PaginatedCollection<TItem> {
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items,
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 0
    };
  }
}
