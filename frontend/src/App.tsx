import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import HomesForUserPage from './components/HomesForUserPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomesForUserPage />
      </div>
    </Provider>
  );
}

export default App;