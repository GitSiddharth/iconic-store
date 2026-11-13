<script lang="ts">
  import { goto } from '$app/navigation';
  import { cart } from '$lib/cart.svelte';
  import { auth } from '$lib/auth.svelte';
  import { sdk } from '$lib/medusa';
  import { formatPrice } from '$lib/store';

  type Step = 'details' | 'shipping' | 'payment';
  let step = $state<Step>('details');
  let busy = $state(false);
  let error = $state<string | null>(null);

  let form = $state({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address_1: '',
    address_2: '',
    city: '',
    province: '',
    postal_code: ''
  });

  let shippingOptions = $state<any[]>([]);
  let shippingId = $state<string | null>(null);
  let providers = $state<any[]>([]);
  let providerId = $state<string | null>(null);

  // Pre-fill from the logged-in customer, once.
  let prefilled = false;
  $effect(() => {
    if (!prefilled && auth.customer) {
      prefilled = true;
      form.email = auth.customer.email ?? '';
      form.first_name = auth.customer.first_name ?? '';
      form.last_name = auth.customer.last_name ?? '';
      form.phone = auth.customer.phone ?? '';
    }
  });

  const money = (n?: number | null) => formatPrice(n ?? 0, cart.currency);

  function providerLabel(id: string) {
    if (id.includes('razorpay')) return 'Pay online (UPI, cards, netbanking)';
    if (id === 'pp_system_default') return 'Test payment (no money is taken)';
    return id;
  }

  async function submitDetails(e: SubmitEvent) {
    e.preventDefault();
    if (!cart.cart) return;
    busy = true;
    error = null;
    try {
      const address = {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address_1: form.address_1,
        address_2: form.address_2,
        city: form.city,
        province: form.province,
        postal_code: form.postal_code,
        country_code: 'in'
      };
      const { cart: updated } = await sdk.store.cart.update(cart.cart.id, {
        email: form.email,
        shipping_address: address,
        billing_address: address
      });
      cart.cart = updated;

      const { shipping_options } = await sdk.store.fulfillment.listCartOptions({ cart_id: updated.id });
      shippingOptions = shipping_options;
      shippingId = shipping_options[0]?.id ?? null;

      if (shipping_options.length === 0) {
        error = 'No delivery options are available for this address yet.';
      } else {
        step = 'shipping';
      }
    } catch (err: any) {
      error = err?.message ?? 'Could not save your details.';
    } finally {
      busy = false;
    }
  }

  async function submitShipping() {
    if (!cart.cart || !shippingId) return;
    busy = true;
    error = null;
    try {
      const { cart: updated } = await sdk.store.cart.addShippingMethod(cart.cart.id, {
        option_id: shippingId
      });
      cart.cart = updated;

      const { payment_providers } = await sdk.store.payment.listPaymentProviders({
        region_id: updated.region_id
      });
      providers = payment_providers;
      providerId = payment_providers[0]?.id ?? null;
      step = 'payment';
    } catch (err: any) {
      error = err?.message ?? 'Could not set the delivery option.';
    } finally {
      busy = false;
    }
  }

  async function placeOrder() {
    if (!cart.cart || !providerId) return;
    busy = true;
    error = null;
    try {
      await sdk.store.payment.initiatePaymentSession(cart.cart, { provider_id: providerId });

      // Razorpay is added here in the next step.

      const result: any = await sdk.store.cart.complete(cart.cart.id);
      if (result.type === 'order') {
        sessionStorage.setItem('iconic_last_order', JSON.stringify(result.order));
        cart.reset();
        goto('/order-confirmed');
      } else {
        error = result.error?.message ?? 'We could not complete your order. Please try again.';
      }
    } catch (err: any) {
      error = err?.message ?? 'Something went wrong while placing your order.';
    } finally {
      busy = false;
    }
  }

  const field = 'mt-2 w-full border-b border-white/30 bg-transparent py-2 outline-none focus:border-[#e2c48a]';
  const label = 'text-xs tracking-[0.3em] text-white/50 uppercase';
</script>

<svelte:head>
  <title>Checkout · Iconic</title>
</svelte:head>

<div class="min-h-screen bg-[#101012] px-6 pt-32 pb-24 text-white">
  <div class="mx-auto max-w-6xl">
    <h1 class="mb-10 font-script text-6xl">Checkout</h1>

    {#if !cart.ready}
      <p class="py-20 text-center text-white/50">Loading your bag…</p>
    {:else if cart.items.length === 0}
      <div class="py-20 text-center">
        <p class="font-display text-2xl text-white/60">Your bag is empty.</p>
        <a href="/" class="mt-6 inline-block text-xs tracking-[0.3em] text-[#e2c48a] uppercase hover:underline">Continue shopping</a>
      </div>
    {:else}
      <div class="grid gap-12 md:grid-cols-5">
        <!-- LEFT: steps -->
        <div class="md:col-span-3">
          {#if error}
            <p class="mb-6 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>
          {/if}

          <!-- 1. Details -->
          <section class="mb-10">
            <h2 class="mb-6 font-display text-3xl text-[#e2c48a]">1 · Delivery details</h2>

            {#if step === 'details'}
              <form onsubmit={submitDetails} class="grid gap-6">
                <label><span class={label}>Email</span><input bind:value={form.email} type="email" required autocomplete="email" class={field} /></label>
                <div class="grid grid-cols-2 gap-6">
                  <label><span class={label}>First name</span><input bind:value={form.first_name} required autocomplete="given-name" class={field} /></label>
                  <label><span class={label}>Last name</span><input bind:value={form.last_name} required autocomplete="family-name" class={field} /></label>
                </div>
                <label><span class={label}>Phone</span><input bind:value={form.phone} type="tel" required autocomplete="tel" class={field} /></label>
                <label><span class={label}>Address</span><input bind:value={form.address_1} required autocomplete="address-line1" class={field} /></label>
                <label><span class={label}>Apartment, landmark (optional)</span><input bind:value={form.address_2} autocomplete="address-line2" class={field} /></label>
                <div class="grid grid-cols-3 gap-6">
                  <label><span class={label}>City</span><input bind:value={form.city} required autocomplete="address-level2" class={field} /></label>
                  <label><span class={label}>State</span><input bind:value={form.province} required autocomplete="address-level1" class={field} /></label>
                  <label><span class={label}>PIN code</span><input bind:value={form.postal_code} required inputmode="numeric" autocomplete="postal-code" class={field} /></label>
                </div>
                <p class="text-xs text-white/40">We currently deliver within India.</p>
                <button disabled={busy} class="bg-[#e2c48a] py-4 text-sm tracking-[0.3em] text-black uppercase transition hover:brightness-110 disabled:opacity-60">
                  {busy ? 'Saving…' : 'Continue to delivery'}
                </button>
              </form>
            {:else}
              <div class="flex items-start justify-between gap-4 text-sm text-white/70">
                <p>
                  {form.first_name} {form.last_name}<br />
                  {form.address_1}{form.address_2 ? `, ${form.address_2}` : ''}<br />
                  {form.city}, {form.province} {form.postal_code}<br />
                  {form.email} · {form.phone}
                </p>
                <button onclick={() => (step = 'details')} class="text-xs tracking-widest text-[#e2c48a] uppercase hover:underline">Edit</button>
              </div>
            {/if}
          </section>

          <!-- 2. Shipping -->
          {#if step !== 'details'}
            <section class="mb-10">
              <h2 class="mb-6 font-display text-3xl text-[#e2c48a]">2 · Delivery method</h2>

              {#if step === 'shipping'}
                <div class="grid gap-3">
                  {#each shippingOptions as opt (opt.id)}
                    <label class="flex cursor-pointer items-center justify-between border p-4 {shippingId === opt.id ? 'border-[#e2c48a]' : 'border-white/15'}">
                      <span class="flex items-center gap-3">
                        <input type="radio" name="ship" value={opt.id} bind:group={shippingId} class="accent-[#e2c48a]" />
                        {opt.name}
                      </span>
                      <span class="text-[#e2c48a]">{opt.amount ? money(opt.amount) : 'Free'}</span>
                    </label>
                  {/each}
                </div>
                <button
                  onclick={submitShipping}
                  disabled={busy || !shippingId}
                  class="mt-6 w-full bg-[#e2c48a] py-4 text-sm tracking-[0.3em] text-black uppercase transition hover:brightness-110 disabled:opacity-60"
                >
                  {busy ? 'Saving…' : 'Continue to payment'}
                </button>
              {:else}
                <div class="flex items-center justify-between text-sm text-white/70">
                  <p>{shippingOptions.find((o) => o.id === shippingId)?.name}</p>
                  <button onclick={() => (step = 'shipping')} class="text-xs tracking-widest text-[#e2c48a] uppercase hover:underline">Edit</button>
                </div>
              {/if}
            </section>
          {/if}

          <!-- 3. Payment -->
          {#if step === 'payment'}
            <section>
              <h2 class="mb-6 font-display text-3xl text-[#e2c48a]">3 · Payment</h2>
              {#if providers.length === 0}
                <p class="text-white/60">No payment methods are available for your region yet.</p>
              {:else}
                <div class="grid gap-3">
                  {#each providers as p (p.id)}
                    <label class="flex cursor-pointer items-center gap-3 border p-4 {providerId === p.id ? 'border-[#e2c48a]' : 'border-white/15'}">
                      <input type="radio" name="pay" value={p.id} bind:group={providerId} class="accent-[#e2c48a]" />
                      {providerLabel(p.id)}
                    </label>
                  {/each}
                </div>
                <button
                  onclick={placeOrder}
                  disabled={busy || !providerId}
                  class="mt-6 w-full bg-[#e2c48a] py-4 text-sm tracking-[0.3em] text-black uppercase transition hover:brightness-110 disabled:opacity-60"
                >
                  {busy ? 'Placing order…' : 'Place order'}
                </button>
              {/if}
            </section>
          {/if}
        </div>

        <!-- RIGHT: summary -->
        <aside class="h-fit border border-white/10 p-6 md:col-span-2">
          <h2 class="mb-4 font-display text-2xl">Your bag</h2>
          <ul class="divide-y divide-white/10 text-sm">
            {#each cart.items as item (item.id)}
              <li class="flex justify-between gap-4 py-3">
                <span class="text-white/80">{item.quantity} × {item.product_title ?? item.title}</span>
                <span>{money(item.unit_price * item.quantity)}</span>
              </li>
            {/each}
          </ul>

          <dl class="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div class="flex justify-between"><dt class="text-white/60">Subtotal</dt><dd>{money(cart.cart?.subtotal ?? cart.subtotal)}</dd></div>
            <div class="flex justify-between">
              <dt class="text-white/60">Delivery</dt>
              <dd>{step === 'payment' ? (cart.cart?.shipping_total ? money(cart.cart.shipping_total) : 'Free') : '—'}</dd>
            </div>
            {#if cart.cart?.tax_total}
              <div class="flex justify-between"><dt class="text-white/60">Tax</dt><dd>{money(cart.cart.tax_total)}</dd></div>
            {/if}
            <div class="flex justify-between border-t border-white/10 pt-3 text-lg text-[#e2c48a]">
              <dt>Total</dt><dd>{money(cart.cart?.total ?? cart.subtotal)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    {/if}
  </div>
</div>