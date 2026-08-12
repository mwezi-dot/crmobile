import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers/PeopleReducer';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/Navigation';

const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
