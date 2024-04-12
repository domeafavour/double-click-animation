import { createAnimations } from './createAnimations';

describe('createAnimations', () => {
  it('should not run again while is running', () => {
    const onStart = jest.fn();
    const { run } = createAnimations({
      fromValue: 0,
      toValue: 100,
      duration: 300,
      onStart,
    });

    run();
    run();

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
