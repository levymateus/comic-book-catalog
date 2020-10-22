/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { Provider } from 'react-redux';
import { mount, configure } from 'enzyme';
import { MemoryRouter, Switch } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import App, { ComicsPage } from '../App';

import store from '../store';
import TopNavbar from '../containers/top-navbar';
import { NotFoundPage } from '../components/not-found';
import DataProvider from '../components/data-provider';

configure({ adapter: new Adapter() });

test('renders app', () => {
  const wrapper = mount(<Provider store={store}><App /></Provider>);

  const topNavbar = wrapper.find(TopNavbar).first();
  expect(topNavbar.exists()).toBe(true);

  const routerSwitch = wrapper.find(Switch).first();
  expect(routerSwitch.exists()).toBe(true);
});

test('renders Data provided by Marvel.', () => {
  const wrapper = mount(<Provider store={store}><App /></Provider>);

  const dataProvider = wrapper.find(DataProvider).first();
  expect(dataProvider.exists()).toBe(true);
});

test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/random/path']}>
      <Provider store={store}><App /></Provider>
    </MemoryRouter>,
  );
  expect(wrapper.find(ComicsPage)).toHaveLength(0);
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});

test('valid path should not redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}><App /></Provider>
    </MemoryRouter>,
  );
  expect(wrapper.find(ComicsPage)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});
