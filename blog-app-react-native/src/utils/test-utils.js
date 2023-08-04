import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = {},
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...renderer.create(ui, { wrapper: Wrapper, ...renderOptions }) }
}
