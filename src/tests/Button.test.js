import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../components/Button';

describe('Button adds rows / columns', () => {
	it('Should call buttonAddRow callback when clicked', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(
			<Button buttonClick={mockFn} buttonClass={'add-row'} cellSize={50} />
		);
		const button = wrapper.find('button.add-row').first();

		button.simulate('click');
		expect(mockFn.mock.calls.length).toBe(1);
	});

	it('Should call buttonAddColumn callback when clicked', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(
			<Button
				buttonClick={mockFn}
				buttonClass={'add-column'}
				cellSize={50}
				propertyStyle={'top'}
			/>
		);
		const button = wrapper.find('button.add-column').first();

		button.simulate('click');
		expect(mockFn.mock.calls.length).toBe(1);
	});
});

describe('Button deletes rows / columns', () => {
	it('Should call buttonRemoveRow callback when clicked', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(
			<Button buttonClick={mockFn} buttonClass={'remove-row'} cellSize={50} />
		);
		const button = wrapper.find('button.remove-row').first();

		button.simulate('click');
		expect(mockFn.mock.calls.length).toBe(1);
	});

	it('Should call buttonRemoveColumn callback when clicked', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(
			<Button
				buttonClick={mockFn}
				buttonClass={'remove-column'}
				cellSize={50}
			/>
		);
		const button = wrapper.find('button.remove-column').first();

		button.simulate('click');
		expect(mockFn.mock.calls.length).toBe(1);
	});
});
