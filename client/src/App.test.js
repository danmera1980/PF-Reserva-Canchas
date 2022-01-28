import App from './App';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Landing from './components/Landing/Landing';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter,  } from 'react-router-dom';


configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });
  describe('The Landing component hast to render in the route /', () => {
    it('Landing must render in route "/"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(Landing)).toHaveLength(1);
    });
  });

})