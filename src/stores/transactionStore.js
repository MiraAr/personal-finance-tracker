import { defineStore } from "pinia";
import transactionsData from "@/transactionsData.json";

export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    transactions: transactionsData.transactions,
  }),
  getters: {
    incomes() {
      return this.transactions.filter(
        (transaction) => transaction.type === "income"
      );
    },
    expenses() {
      return this.transactions.filter(
        (transaction) => transaction.type === "expense"
      );
    },
    totalIncome() {
      return this.incomes.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
      );
    },
    totalExpense() {
      return this.expenses.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
      );
    },
    balance() {
      return this.totalIncome - this.totalExpense;
    },
    getMonthsData() {
      return this.transactions.reduce((acc, item) => {
        const [day, month, year] = item.date.split("/");
        const monthKey = `${month}/${year}`;

        acc[monthKey] = acc[monthKey] || [];
        acc[monthKey].push(item);

        return acc;
      }, {});
    },
  },
  actions: {
    sortTransactionsAscending() {
      this.transactions.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateA - dateB;
      });
    },
    sortTransactionsDescending() {
      this.transactions.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateB - dateA;
      });
    },
    addTransaction(transaction) {
      const newTransaction = {
        ...transaction,
        id: this.transactions.length + 1,
      };
      this.transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },
    deleteTransactions(transactionId) {
      const index = this.transactions.findIndex(
        (transaction) => transaction.id === transactionId
      );
      if (index !== -1) {
        this.transactions.splice(index, 1);
      }
      console.log(this.transactions);
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },
    getIncomeByMonth() {
      return this.incomes.reduce(
        (acc, { amount, category, date, description, id, type }) => {
          const [day, month, year] = date.split("/");
          const monthKey = `${month}/${year}`;
          acc[monthKey] = (acc[monthKey] || 0) + Number(amount);
          return acc;
        },
        {}
      );
    },
    getExpenseByMonth() {
      return this.expenses.reduce(
        (acc, { amount, category, date, description, id, type }) => {
          const [day, month, year] = date.split("/");
          const monthKey = `${month}/${year}`;
          acc[monthKey] = (acc[monthKey] || 0) + Number(amount);
          return acc;
        },
        {}
      );
    },
  },
  persist: {
    enabled: true,
    storage: localStorage,
  },
});
