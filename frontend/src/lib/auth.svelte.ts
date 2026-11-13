import { sdk } from './medusa';
import { cart } from './cart.svelte';

class AuthStore {
  customer = $state<any>(null);
  ready = $state(false);

  private started = false;

  // Called once from the layout: restores a logged-in session if there is one.
  async init() {
    if (this.started) return;
    this.started = true;
    try {
      const { customer } = await sdk.store.customer.retrieve();
      this.customer = customer;
    } catch {
      this.customer = null; // not logged in (a 401 in the console is normal)
    } finally {
      this.ready = true;
    }
  }

  private async afterLogin() {
    const { customer } = await sdk.store.customer.retrieve();
    this.customer = customer;
    // Attach any bag they built while logged out to their account.
    try {
      if (cart.cart) await sdk.store.cart.transferCart(cart.cart.id);
    } catch (e) {
      console.warn('Could not link bag to account', e);
    }
  }

  async login(email: string, password: string) {
    await sdk.auth.login('customer', 'emailpass', { email, password });
    await this.afterLogin();
  }

  async register(data: { email: string; password: string; first_name: string; last_name: string }) {
    await sdk.auth.register('customer', 'emailpass', { email: data.email, password: data.password });
    await sdk.store.customer.create({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name
    });
    await sdk.auth.login('customer', 'emailpass', { email: data.email, password: data.password });
    await this.afterLogin();
  }

  async logout() {
    try {
      await sdk.auth.logout();
    } finally {
      this.customer = null;
      cart.reset();
    }
  }
}

export const auth = new AuthStore();
