import type { ServerInit } from '@sveltejs/kit';
import { Logger } from '$src/services/Logger';
import { Scheduler } from '$src/scheduler/Scheduler';

/**
 * Запуск приложения
 */
export const init: ServerInit = () => {
  Logger.info('Application started from init');
  Scheduler.startScheduling();
};
