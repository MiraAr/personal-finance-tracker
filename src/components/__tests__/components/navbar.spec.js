import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, it, expect, beforeEach } from 'vitest';
import Navbar from '@/components/Navbar.vue'; 

const routes = [
  { path: '/', name: 'myTransactions' },
  { path: '/dashboard', name: 'dashboard' },
  { path: '/myTransactions/add', name: 'addTransaction' },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe('Navbar', () => {
  let wrapper;

  beforeEach(async () => {
    router.push('/');
    await router.isReady();
    wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });
  });

  it('should render RouterLink components with correct to attribute', () => {
    const links = wrapper.findAllComponents({ name: 'RouterLink' });
    expect(links.length).toBe(3);
    expect(links[0].props('to')).toBe('/');
    expect(links[1].props('to')).toBe('/dashboard');
    expect(links[2].props('to')).toBe('/myTransactions/add');
  });

  it('should apply active class based on the current route (home)', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('a[href="/"]').classes()).toContain('bg-purple-900');
  });

});
