<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import singleTransaction from '@/components/singleTransaction.vue';
import { onMounted, ref, computed } from 'vue';
import Summary from '@/components/Summary.vue';

const transactionStore = useTransactionStore();
const sort = ref('desc');

const toggleSort = () => {
    if (sort.value === 'desc') {
        transactionStore.sortTransactionsAscending();
        sort.value = 'asc';
    } else {
        transactionStore.sortTransactionsDescending();
        sort.value = 'desc';
    }
}

const dateFilter = ref('all')
const monthList= transactionStore.getMonthsData;

const viewedTransactions = computed(() => {
  return dateFilter.value !== "all"
    ? transactionStore.getMonthsData[dateFilter.value] || [] 
    : transactionStore.transactions; 
});


onMounted(() => {
    transactionStore.sortTransactionsDescending();
})
</script>

<template>
    <div class="bg-purple-50">
        <Summary></Summary>
        <div class="flex justify-center min-h-screen">
            <div class="bg-white shadow-lg rounded-lg p-6 space-y-2">
                <div class="border-b-4 border-purple-200 flex items-center justify-between">
                    <span class="text-purple-900 p-2 font-bold text-lg font-medium">History
                        <button class="bg-white shadow-lg rounded-xs p-1 space-y-1" @click="toggleSort()">
                            <i v-if="sort === 'desc'"
                                class="pi pi-arrow-down mr-1 text-purple-900 text-2xl font-bold ml-1"></i>
                            <i v-else class="pi pi-arrow-up mr-1 text-purple-900 text-2xl font-bold ml-1"></i>
                        </button>
                    </span>


                    <span for="dateFilter" class="text-purple-900 p-2 font-bold text-lg font-medium"> Filter
                        <select v-model="dateFilter" id="dateFilter" name="dateFilter"
                            class="bg-white shadow-lg rounded-xs p-1 space-y-1 text-m font-small">
                            <option value="all" selected>All</option>
                            <option v-for="option in Object.keys(monthList)" :value="option">{{ option }}</option>
                        </select>
                    </span>
                </div>
                <singleTransaction v-for="transaction in viewedTransactions" :key="transaction.id"
                    :transaction="transaction" />
            </div>
        </div>
    </div>
</template>