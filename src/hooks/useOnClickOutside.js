import { useEffect } from 'react';

/** 모달 창 외부 클릭 시 모달 닫게 만드는 Custom Hooks
 * 1. 어디를 클릭하는지 구분(모달 창 안 or 밖)
 * -- useRef 라는 것을 이용해서 구분 가능
 * -- JS에서는 getElementById, querySelector 같은 DOMSelector 함수를 사용해서 DOM을 선택
 * -- React에서는 ref라는 것을 이용해서 DOM을 선택
 * --- 클래스 컴포넌트 : React.createRef
 * --- 함수형 컴포넌트 : useRef
 * 2. 모달 창 바깥을 클릭하면 Callback 함수를 호출하는 Event를 등록해주기
 * 3. Callback 함수 안에서 모달 닫아주기
 * @param {*} ref
 * @param {*} handler
 */

// **** useRef 사용법
// 1. useRef()를 이용해서 Ref 객체를 만들고,
// 2. 이 객체를 특정 DOM에 ref 값으로 설정
// 3. Ref객체의 .current 값이 특정 DOM을 가리키게 됨
// 모달 창 바깥을 클릭하면 Callback 함수를 호출하는 Event를 등록해주기
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // 클릭 시 모달 창 안이면 그냥 return
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // 모달 창 밖이면
      handler(event);
    };
    // 모달창 바깥을 클릭하면 Callback 함수를 호출하는 Event 등록
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
