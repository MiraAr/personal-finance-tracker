<script setup>
import router from '@/router';
import SelectButton from 'primevue/selectbutton';
import Calendar from "primevue/calendar";
import { useTransactionStore } from '@/stores/transactionStore';


import { reactive, ref, computed, toRefs } from 'vue';
import { useToast } from 'vue-toastification';


const toast = useToast();
const transactionStore = useTransactionStore();

const form = reactive({
    type: "expense",
    category: "",
    description: "",
    date: new Date(),
    amount: "",
});

const { date } = toRefs(form);
const formattedDate = computed(() => {
    if (!date.value) return "";
    return new Date(date.value).toLocaleDateString("en-GB");
});

const options = ref([
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" }
]);
let selectedOption = form.type;
const onOptionChange = (e) => {
    if (!e.value) {
        form.type = selectedOption
    } else {
        selectedOption = form.type;
    }
}

const AddNewTransaction = () => {
    form.date = formattedDate.value;
    transactionStore.addTransaction(form);
    toast.success("Transaction Added Successfully");
    router.push('/');
};

</script>
<template>
    <section class="bg-purple-50">
        <div class="container m-auto max-w-2xl py-10">
            <div class="bg-white px-6 py-8 mb-2 rounded-lg shadow-md m-2 md:m-0 border-b-4 border-purple-200">
                <form @submit.prevent="AddNewTransaction">
                    <h2 class="text-3xl text-center font-semibold text-purple-900 mb-6">Add Transaction</h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Transaction Type</label>
                        <SelectButton v-model="form.type" :options="options" optionLabel="label" option-value="value"
                            @change="onOptionChange" required />
                    </div>

                    <div class="mb-4">
                        <label for="category" class="block text-gray-700 font-bold mb-2">Transaction Category</label>
                        <select v-if="form.type === 'expense'" v-model="form.category" id="category" name="category"
                            class="border rounded w-full py-2 px-3" required>
                            <option value="" disabled hidden selected>Select</option>
                            <option value="education">Education</option>
                            <option value="food">Food</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="shopping">Shopping</option>
                            <option value="bills">Bills</option>
                            <option value="transportation">Transportation</option>
                            <option value="other">Other</option>
                        </select>
                        <select v-if="form.type === 'income'" v-model="form.category" id="category" name="category"
                            class="border rounded w-full py-2 px-3" required>
                            <option value="" disabled hidden selected>Select</option>
                            <option value="salary">Salary</option>
                            <option value="bounus">Bounus</option>
                            <option value="sideHustle">Side Hustle</option>
                            <option value="rentalIncome">Rental Income</option>
                            <option value="others">Others</option>
                        </select>

                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Transaction Description</label>
                        <input v-model="form.description" type="text" id="description" name="description"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. grocery shopping" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Transaction Amount</label>
                        <input v-model="form.amount" type="text" id="amount" name="amount"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. 1000" required />
                    </div>

                    <div class="mb-4">
                        <label for="datePicker" class="block text-gray-700 font-bold mb-2">Transaction Date</label>
                        <Calendar v-model="form.date" showIcon dateFormat="dd/mm/yy" required placeholder="dd/mm/yy" />
                    </div>

                    <div>
                        <button
                            class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Add Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
:deep(.p-selectbutton .p-button.p-highlight) {
    background-color: #d2d9e1 !important;
    color: black !important;
    border-color: #d2d9e1 !important;
}

:deep(.p-calendar .p-button) {
    background-color: #d2d9e1 !important;
    color: black !important;
    border: none;
}

:deep(.p-calendar .p-button:hover) {
    background-color: #c6ccd3 !important;
}

:deep(.p-calendar .p-inputtext:focus) {
    border-color: #b8bec5 !important;
    box-shadow: 0 0 5px rgba(188, 193, 199, 0.5) !important;
}

:deep(.p-calendar .p-inputtext) {
    padding: 8px;
}
</style>