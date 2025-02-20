<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from "pinia";

const transactionStore = storeToRefs(useTransactionStore());
const totalIncome = transactionStore.totalIncome;
const totalExpense = transactionStore.totalExpense;
const balance = transactionStore.balance;

</script>
<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto max-w-2xl">
            <div
                class="border-b-4 border-purple-200 p-6 rounded-lg shadow-md text-center mx-auto mb-6 bg-white max-w-lg">
                <h2 class="text-2xl text-purple-900">Your Balance</h2>
                <p class="mt-2 mb-4 text-2xl" data-testid="balance">
                    {{ balance }}$
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg max-w-lg mx-auto">
                <div class="border-b-4 border-purple-200 p-6 rounded-lg shadow-md bg-white">
                    <h2 class="text-xl text-purple-900">Total Income</h2>
                    <p class="mt-2 mb-4 text-2xl" data-testid="totalIncome">
                        <span class="text-green-500 font-semibold">+</span>
                        {{ totalIncome }}$
                    </p>
                </div>
                <div class="border-b-4 border-purple-200 p-6 rounded-lg shadow-md bg-white">
                    <h2 class="text-xl text-purple-900">Total Expense</h2>
                    <p class="mt-2 mb-4 text-2xl" data-testid="totalExpense">
                        <span class="text-red-500 font-semibold">-</span>
                        {{ totalExpense }}$
                    </p>
                </div>
            </div>
        </div>
    </section>


</template>