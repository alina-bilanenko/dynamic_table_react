import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../components/App';
import { DynamicTable } from '../components/DynamicTable';

describe('App.DynamicTable', () => {
  it('Should render new table from state table', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();

    const wrapperTable = mount(<DynamicTable table={instance.state.table} />);
    expect(wrapperTable.find('tr').length).toBe(instance.initialHeight);

    wrapperTable.find('tr').forEach(tableRow => {
      expect(tableRow.find('td').length).toBe(instance.initialWidth);
    });
  });
});
