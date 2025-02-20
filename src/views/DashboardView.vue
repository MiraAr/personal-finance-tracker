<script setup>
import Summary from '@/components/Summary.vue';
import Chart from 'primevue/chart';
import { ref, onMounted } from "vue";
import { useTransactionStore } from '@/stores/transactionStore';

const transactionStore = useTransactionStore();
const incomeByMonth = transactionStore.getIncomeByMonth();
const expenseByMonth = transactionStore.getExpenseByMonth();

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        datasets: [
            {
                label: 'Income',
                backgroundColor: documentStyle.getPropertyValue('#dbabf7'),
                borderColor: documentStyle.getPropertyValue('#dbabf7'),
                data: incomeByMonth
            },
            {
                label: 'Expense',
                backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                data: expenseByMonth
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

</script>
<template>
    <div class="bg-purple-50 min-h-screen">
        <Summary></Summary>
        <div
                class="border-b-4 border-purple-200 p-6 rounded-lg shadow-md text-center mx-auto bg-white max-w-lg">
                <h2 class="text-2xl text-purple-900">Your income Vs expense over the year</h2>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
            </div>

    </div>
</template>

