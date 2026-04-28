// src/hooks/useMessage.test.js
import { act, renderHook } from '@testing-library/react';
import { useMessage } from './useMessage';

describe('useMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('initial state is null', () => {
    const { result } = renderHook(() => useMessage());
    expect(result.current.message).toBeNull();
  });

  test('showMessage sets a message with default type "info"', () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.showMessage('Hello');
    });

    expect(result.current.message).toEqual({ text: 'Hello', type: 'info' });
  });

  test('showMessage with explicit type', () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.showMessage('Error', 'error');
    });

    expect(result.current.message?.type).toBe('error');
  });

  test('auto-clears after default 5s', () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.showMessage('vanishing');
    });
    expect(result.current.message).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.message).toBeNull();
  });

  test('duration=0 disables auto-clear', () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.showMessage('sticky', 'info', 0);
    });

    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(result.current.message?.text).toBe('sticky');
  });

  test('clearMessage clears immediately', () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.showMessage('soon-gone');
    });
    act(() => {
      result.current.clearMessage();
    });

    expect(result.current.message).toBeNull();
  });

  test('showMessage and clearMessage are stable references across renders', () => {
    const { result, rerender } = renderHook(() => useMessage());
    const firstShow = result.current.showMessage;
    const firstClear = result.current.clearMessage;

    rerender();

    expect(result.current.showMessage).toBe(firstShow);
    expect(result.current.clearMessage).toBe(firstClear);
  });
});
