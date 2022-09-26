/**
 * @jest-environment jest-environment-jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Button from '../09_Button';

describe('snapshot test1', () => {
  it('renders correctly with react-test-renderer', () => {
    const button = renderer.create(<Button />);
    const tree = button.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('snapshot test2', () => {
  test('renders correctly with @testing-library/react', () => {
    const button = render(<Button />);
    expect(button.container).toMatchSnapshot();

    fireEvent.click(button.getByText('ON'));
    expect(button.container).toMatchSnapshot();

    fireEvent.click(button.getByText('OFF'));
    expect(button.container).toMatchSnapshot();
  });
});
