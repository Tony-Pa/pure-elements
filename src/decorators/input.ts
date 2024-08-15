export interface IInputProps {
  attr?: string;
  bind?: string;
  renderFunction?: string;
  reRender?: boolean;
}
export interface IInput extends IInputProps {
  prop: string;
}

export function Input(attr?: string | IInputProps) {
  return (target: any, prop: string) => {
    const props = typeof attr === 'string' ? { attr } : attr;
    target.constructor.$$inputs = [...(target.constructor.$$inputs || []), { ...props, prop }];
  };
}
