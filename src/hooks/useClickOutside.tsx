import { RefObject, useEffect } from 'react'

// ref: 需要绑定的dom节点
// handler: 当clickoutside 需要做的处理
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // event.target若在组件内部，则无事发生；若在外部，则执行自定义操作，如清空列表等
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    }
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    }
  }, [ref, handler])
}

export default useClickOutside
