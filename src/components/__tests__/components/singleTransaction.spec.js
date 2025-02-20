import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi } from 'vitest';
import SingleTransaction from '@/components/singleTransaction.vue';
import { useTransactionStore } from '@/stores/transactionStore';


describe('SingleTransactionComponent', () => {
  it('should display the correct transaction values and handle delete action', async () => {
    const transaction = {
      id: 1,
      description: 'Test Transaction',
      date: '2025-02-20',
      type: 'income',
      amount: 100,
    };

    const wrapper = mount(SingleTransaction, {
      props: { transaction },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    // Check displayed values
    expect(wrapper.find('.text-purple-800').text()).toBe(transaction.description);
    expect(wrapper.find('.text-purple-400').text()).toBe(transaction.date);
    expect(wrapper.find('.font-semibold').text()).toContain('+'); 
    expect(wrapper.find('#transaction_id').text()).toContain(transaction.amount.toString());

    const transactionStore = useTransactionStore();

    transactionStore.deleteTransactions = vi.fn();

    await wrapper.find('button').trigger('click');

    // Check delete action
    expect(transactionStore.deleteTransactions).toHaveBeenCalledWith(transaction.id);
  });
});

