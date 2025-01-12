import {useState, useCallback, Dispatch, SetStateAction} from 'react';

export interface UseBooleanOutput {
  isValue: boolean;
  setIsValue: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
}
export const useBoolean = (initialValue?: boolean): UseBooleanOutput => {
  const [isValue, setIsValue] = useState(!!initialValue);

  const toggle = useCallback(() => setIsValue(value => !value), []);

  return {
    isValue,
    setIsValue,
    toggle,
  };
};
