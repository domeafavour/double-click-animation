import { createDoubleClickAnimation } from '.';

describe('createDoubleClickAnimation', () => {
  it('default', () => {
    const { click, isWaiting, cancel } = createDoubleClickAnimation();

    click();

    expect(isWaiting()).toBe(true);

    setTimeout(() => {
      click();
      expect(isWaiting()).toBe(true);
      cancel();
      expect(isWaiting()).toBe(false);
    }, 299);
  });

  it('onDoubleClick', () => {
    const onDoubleClick = jest.fn();
    const gap = 300;
    const { click, isWaiting } = createDoubleClickAnimation(gap, {
      onDoubleClick,
    });

    click();
    click();
    // This click should be ignored
    click();

    expect(isWaiting()).toBe(true);

    setTimeout(() => {
      expect(onDoubleClick).toHaveBeenCalledTimes(1);
    }, gap + 1);
  });

  it('onCanceled', () => {
    const onCanceled = jest.fn();
    const gap = 300;
    const { click, isWaiting } = createDoubleClickAnimation(gap, {
      onCanceled,
    });

    click();

    expect(isWaiting()).toBe(true);

    setTimeout(() => {
      expect(onCanceled).toHaveBeenCalledTimes(1);
    }, gap + 1);
  });
});
