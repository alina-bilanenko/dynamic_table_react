import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../components/App'

describe('App.componentDidMount', () => {
  it('Should add new table to state table, rows table = initialWidth, columns table = initialHeight', () => {
    const wrapper = mount(<App/>);
    const instance = wrapper.instance();

    instance.componentDidMount();

    expect(instance.state.table.length).toBe(instance.initialHeight);
    instance.state.table.forEach(tableRow => {
      expect(tableRow.length).toBe(instance.initialWidth);
    });
  })
});

describe('App.buttonAddRow', () => {
  it('Should add new row to state table', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const resultRows = instance.initialHeight + 1;

    instance.buttonAddRow();

    expect(instance.state.table.length).toBe(resultRows);
  })
});

describe('App.buttonAddColumn', () => {
  it('Should add new column to state table', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const resultColumns = instance.initialWidth + 1;

    instance.buttonAddColumn();

    instance.state.table.forEach(tableRow => {
      expect(tableRow.length).toBe(resultColumns);
    });
  })
});

describe('App.buttonRemoveRow', () => {
  it('Should remove row from state table', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const resultlRows = instance.initialHeight - 1;

    instance.buttonRemoveRow();

    expect(instance.state.table.length).toBe(resultlRows);
  });

  it('Should not remove row from the state table if it is left alone', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.initialHeight = 1;

    instance.componentDidMount();
    instance.buttonRemoveRow();

    expect(instance.state.table.length).toBe(1);
  })
});

describe('App.buttonRemoveColumn', () => {
  it('Should remove column from state table', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const resultColumns = instance.initialWidth - 1;

    instance.buttonRemoveColumn();

    instance.state.table.forEach(tableRow => {
      expect(tableRow.length).toBe(resultColumns);
    });
  });

  it('Should not remove column from the state table if it is left alone', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.initialWidth = 1;

    instance.componentDidMount();
    instance.buttonRemoveColumn();

    instance.state.table.forEach(tableRow => {
      expect(tableRow.length).toBe(1);
    });

  })
});
