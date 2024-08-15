export interface EventEmitter<T = any> {
  emit: (data?: T) => CustomEvent<T>;
}
