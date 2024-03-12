/**
 * @description 상태를 업데이트하는 reducer 함수
 */

export default function getReducer<T>() {
  return (state: T, action: Partial<T>) => ({ ...state, ...action }) as T;
}
