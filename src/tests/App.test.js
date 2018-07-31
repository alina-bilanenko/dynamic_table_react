import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../components/App';

describe('App.buildTableArray', () => {
  it('Should create new table, rows table = initialWidth, columns table = initialHeight', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();

    instance.buildTableArray();

    expect(instance.state.table.length).toBe(instance.initialHeight);
    instance.state.table.forEach(tableRow => {
      expect(tableRow.tableArr.length).toBe(instance.initialWidth);
    });
  });
});

describe('App.buttonAddRow', () => {
  it('Should add new row to state table', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const resultRows = instance.initialHeight + 1;

    instance.buttonAddRow();

    expect(instance.state.table.length).toBe(resultRows);
  });
});

describe('App.buttonAddColumn', () => {
  it('Should add new column to state table', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const resultColumns = instance.initialWidth + 1;

    instance.buttonAddColumn();

    instance.state.table.forEach(tableRow => {
      expect(tableRow.tableArr.length).toBe(resultColumns);
    });
  });
});

describe('App.buttonRemoveRow', () => {
  it('Should remove row from state table', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const resultlRows = instance.initialHeight - 1;
    const rowDeleteId = instance.state.currentRowId;

    instance.buttonRemoveRow();

    expect(instance.state.table.length).toBe(resultlRows);

    instance.state.table.forEach(tableRow => {
      expect(tableRow.id).not.toBe(rowDeleteId);
    });
  });

  it('Should not remove row from the state table if it is left alone', () => {
    const wrapper = shallow(<App initialWidth={4} initialHeight={1} />);
    const instance = wrapper.instance();
    const rowDeleteId = instance.state.currentRowId;

    instance.buttonRemoveRow();
    expect(instance.state.table.length).toBe(1);

    instance.state.table.forEach(tableRow => {
      expect(tableRow.id).toBe(rowDeleteId);
    });
  });
});

describe('App.buttonRemoveColumn', () => {
  it('Should remove column from state table', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const resultColumns = instance.initialWidth - 1;
    const columnDeleteId = instance.state.currentColumnId;

    instance.buttonRemoveColumn();

    instance.state.table.forEach(tableRow => {
      expect(tableRow.tableArr.length).toBe(resultColumns);
      expect(tableRow.tableArr.indexOf(columnDeleteId)).toBe(-1);
    });
  });

  it('Should not remove column from the state table if it is left alone', () => {
    const wrapper = shallow(<App initialWidth={1} initialHeight={4} />);
    const instance = wrapper.instance();
    const columnDeleteId = instance.state.currentColumnId;

    instance.buttonRemoveColumn();

    instance.state.table.forEach(tableRow => {
      expect(tableRow.tableArr.length).toBe(1);
      expect(tableRow.tableArr.indexOf(columnDeleteId)).not.toBe(-1);
    });
  });
});
