import { useState, useEffect } from 'react';

// ** Debounce : 사용자가 미리 결정된 시간 동안 타이핑을 멈출 때까지 keyup 이벤트의 처리를 지연
// UI 코드가 모든 이벤트를 처리할 필요가 없고 서버로 전송되는 API 호출 수도 크게 줄어듬
// 입력된 모든 문자를 처리하면 성능이 저하되고 백엔드에 불필요한 로드가 추가될 수 있음
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  // 입력받은 delay 시간 후에 debounceValue 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 바뀌면 리렌더링

  return debounceValue;
};
