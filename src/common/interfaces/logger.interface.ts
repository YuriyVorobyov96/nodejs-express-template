export interface ILogger {
  readonly logger: unknown;
  readonly log: (...args: unknown[]) => void;
  readonly error: (...args: unknown[]) => void;
  readonly warn: (...args: unknown[]) => void;
}
