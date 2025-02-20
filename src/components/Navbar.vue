<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveRoute = (routePath) => {
    const route = useRoute();
    return route.path === routePath
}

</script>

<template>
    <nav class="bg-purple-700 border-b border-purple-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <div class="flex flex-shrink-0 items-center mr-4">
                        <i class="pi pi-wallet mr-2 text-white text-2xl font-bold ml-2"></i>
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">My<span
                                class="text-purple-900">FIN</span>Tracker</span>
                    </div>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/"
                                :class="[isActiveRoute('/') ? 'bg-purple-900' : 'hover:bg-purple-800 hover:text-white', 'text-white', 'rounded-md', 'px-3', 'py-2']">
                                My Transactions</RouterLink>
                            <RouterLink to="/dashboard"
                                :class="[isActiveRoute('/dashboard') ? 'bg-purple-900' : 'hover:bg-purple-800 hover:text-white', 'text-white', 'rounded-md', 'px-3', 'py-2']">
                                Dashboard
                            </RouterLink>
                            <RouterLink to="/myTransactions/add"
                                :class="[isActiveRoute('/myTransactions/add') ? 'bg-purple-900' : 'hover:bg-purple-800 hover:text-white', 'text-white', 'rounded-md', 'px-3', 'py-2']">
                                Add Transaction
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>