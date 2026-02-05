import { schedule } from 'node-cron';
import { Logger } from '$src/services/Logger';
import { ENABLE_CRON_JOBS } from '$env/static/private';

/**
 * Планировщик задач
 */
export abstract class Scheduler {
  /**
   * Доступен ли планировщик
   */
  private static readonly SCHEDULING_AVAILABLE = ENABLE_CRON_JOBS === String(true);

  /**
   * Инициализирован планировщик
   */
  private static initialized = false;

  /**
   * Запуск планировщика задач
   */
  static startScheduling(): void {
    if (!Scheduler.SCHEDULING_AVAILABLE || Scheduler.initialized) return;
    Scheduler.initialized = true;

    schedule('* * * * *', () => Logger.info('Cronjob for every minute'));

    schedule('*/5 * * * *', () => Logger.info('Cronjob for every 5 minutes'));
  }
}
