/**
 * Аварийное прекращение выполнения приложения
 */
export const panic = (...messages: unknown[]): never => {
  console.error(...messages);
  process.exit(0);
};
