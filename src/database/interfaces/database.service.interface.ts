export interface IDatabaseService<T> {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getConnection: () => T;
}
