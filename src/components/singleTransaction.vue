<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { useToast } from 'vue-toastification';


const props = defineProps({
    transaction: Object
});
const transactionStore = useTransactionStore();
const toast = useToast();

const deleteTransaction = (id) => {
    transactionStore.deleteTransactions(id);
    toast.success("Transaction Deleted Successfully");
}
</script>
<template>
    <div
        :class="[transaction.type === 'income' ? 'border-green-500' : 'border-red-500', 'border-r-4', 'p-3', 'bg-gray-100', ' flex']">
        <div class="w-96 p-2 bg-white shadow-lg rounded-lg flex items-center">
            <div class="mr-auto flex flex-col">
                <span class='text-purple-800 text-lg'> {{ transaction.description }} </span>
                <span class='text-purple-400 text-xs'> {{ transaction.date }} </span>
            </div>
            <span class="ml-auto" id="transaction_id">
                <span :class="[transaction.type === 'income' ? 'text-green-500' : 'text-red-500', 'font-semibold']">{{
                    transaction.type
                        === 'income' ? '+' : "-" }}</span>{{ transaction.amount }} $
            </span>
        </div>
        <div class="ml-auto p-2 items-center">
            <button class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                @click="deleteTransaction(transaction.id)">
                X
            </button>
        </div>
    </div>
</template>