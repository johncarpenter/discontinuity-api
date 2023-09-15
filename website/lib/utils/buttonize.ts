export function buttonize(handlerFn: any) {
  return {
    role: 'button',
    onClick: handlerFn,
    onKeyDown: (event: any) => {
      // insert your preferred method for detecting the keypress
      if (event.keycode === 13) handlerFn(event)
    },
  }
}
