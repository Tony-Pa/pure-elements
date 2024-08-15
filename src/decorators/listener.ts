export function Listener(event: string, selector = 'host') {
  return (target: any, method: string) => {
    target.constructor.$$bindings = [...(target.constructor.$$bindings || []), { event, selector, method }];
  };
}
