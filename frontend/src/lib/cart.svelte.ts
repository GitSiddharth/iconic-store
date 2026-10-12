import { sdk } from './medusa';
import { getRegionId } from './store';

const KEY = 'iconic_cart_id';

class CartStore {
  cart = $state<any>(null);
  open = $state(false);
  busy = $state(false);
  error = $state<string | null>(null);

  items = $derived<any[]>(this.cart?.items ?? []);
  count = $derived(this.items.reduce((n, i) => n + i.quantity, 0));
  subtotal = $derived(this.items.reduce((s, i) => s + i.unit_price * i.quantity, 0));
  currency = $derived<string>(this.cart?.currency_code ?? 'inr');

  private loaded = false;

  // Called once in the layout: restores the cart this browser had before.
  async init() {
    if (this.loaded || typeof localStorage === 'undefined') return;
    this.loaded = true;
    const id = localStorage.getItem(KEY);
    if (!id) return;
    try {
      const { cart } = await sdk.store.cart.retrieve(id);
      if (cart.completed_at) localStorage.removeItem(KEY);
      else this.cart = cart;
    } catch {
      localStorage.removeItem(KEY);
    }
  }

  private async ensureCart(): Promise<string> {
    if (this.cart) return this.cart.id;
    const region_id = await getRegionId();
    const { cart } = await sdk.store.cart.create({ region_id });
    this.cart = cart;
    localStorage.setItem(KEY, cart.id);
    return cart.id;
  }

  private async refresh() {
    const { cart } = await sdk.store.cart.retrieve(this.cart.id);
    this.cart = cart;
  }

  async add(variantId: string, quantity = 1) {
    this.busy = true;
    this.error = null;
    try {
      const id = await this.ensureCart();
      const { cart } = await sdk.store.cart.createLineItem(id, { variant_id: variantId, quantity });
      this.cart = cart;
      this.open = true;
    } catch (e: any) {
      console.error(e);
      this.error = e?.message ?? "Couldn't add to cart";
    } finally {
      this.busy = false;
    }
  }

  async setQty(lineId: string, quantity: number) {
    if (quantity < 1) return this.remove(lineId);
    this.busy = true;
    try {
      const { cart } = await sdk.store.cart.updateLineItem(this.cart.id, lineId, { quantity });
      this.cart = cart;
    } catch (e) {
      console.error(e);
    } finally {
      this.busy = false;
    }
  }

  async remove(lineId: string) {
    this.busy = true;
    try {
      await sdk.store.cart.deleteLineItem(this.cart.id, lineId);
      await this.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      this.busy = false;
    }
  }
}

export const cart = new CartStore();