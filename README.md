# Double Click Animation

For react

## Preview

![preview](./images/preview.gif)

## Usage

```ts
const [{ progress, status }, animation] = useDoubleClickConfirm(() => {
  console.log('double click confirmed');
});
```

- Render with `progress` & `status`
- Call `animation.click()` to trigger the animation

Or use `createDoubleClickAnimation` to implement your own hook.
