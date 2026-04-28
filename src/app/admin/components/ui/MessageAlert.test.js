// src/app/admin/components/ui/MessageAlert.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageAlert from './MessageAlert';

describe('admin MessageAlert', () => {
  // Regression: this exact case crashed AdminDashboard at runtime before
  // the optional-chaining fix. Keep this test green.
  test('renders nothing when message is null', () => {
    const { container } = render(<MessageAlert message={null} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders nothing when message has no text', () => {
    const { container } = render(
      <MessageAlert message={{ type: 'success' }} onClose={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('renders success message with green styling', () => {
    render(
      <MessageAlert
        message={{ type: 'success', text: 'Saved!' }}
        onClose={() => {}}
      />
    );

    const wrapper = screen.getByText('Saved!').closest('div');
    expect(wrapper).toHaveClass('bg-green-50');
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  test('non-success types fall back to red styling', () => {
    render(
      <MessageAlert
        message={{ type: 'error', text: 'Failed' }}
        onClose={() => {}}
      />
    );
    const wrapper = screen.getByText('Failed').closest('div');
    expect(wrapper).toHaveClass('bg-red-50');
  });

  test('clicking the X button calls onClose', async () => {
    const onClose = jest.fn();
    render(
      <MessageAlert
        message={{ type: 'success', text: 'Saved' }}
        onClose={onClose}
      />
    );

    // The button has no accessible name; query by role and pick the only one.
    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
