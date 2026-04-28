// src/components/sections/FAQAccordion.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQAccordion from './FAQAccordion';

const items = [
  { id: 'q1', question: 'What is it?', answer: 'A platform.' },
  { id: 'q2', question: 'Is it secure?', answer: 'Yes, very.' },
];

describe('FAQAccordion', () => {
  test('renders each question as a button with aria-expanded=false initially', () => {
    render(<FAQAccordion items={items} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((b) => expect(b).toHaveAttribute('aria-expanded', 'false'));

    expect(screen.getByText('What is it?')).toBeInTheDocument();
    expect(screen.getByText('Is it secure?')).toBeInTheDocument();
  });

  test('clicking a question expands it (aria-expanded flips)', async () => {
    render(<FAQAccordion items={items} />);

    const firstButton = screen.getByRole('button', { name: /what is it\?/i });
    await userEvent.click(firstButton);

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    // The second question stays closed.
    expect(
      screen.getByRole('button', { name: /is it secure\?/i })
    ).toHaveAttribute('aria-expanded', 'false');
  });

  test('multiple items can be open at once', async () => {
    render(<FAQAccordion items={items} />);

    await userEvent.click(screen.getByRole('button', { name: /what is it\?/i }));
    await userEvent.click(screen.getByRole('button', { name: /is it secure\?/i }));

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  test('clicking again collapses', async () => {
    render(<FAQAccordion items={items} />);

    const button = screen.getByRole('button', { name: /what is it\?/i });
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('answer text is always present in the DOM (animations toggle visibility)', () => {
    render(<FAQAccordion items={items} />);
    // Even when collapsed, the answer text is rendered for transitions /
    // accessibility — only the wrapper's max-height changes.
    expect(screen.getByText('A platform.')).toBeInTheDocument();
    expect(screen.getByText('Yes, very.')).toBeInTheDocument();
  });
});
