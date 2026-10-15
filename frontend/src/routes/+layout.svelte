<script lang="ts">
  import './layout.css';
  import { onMount } from 'svelte';
  import { cart } from '$lib/cart.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CartDrawer from '$lib/components/CartDrawer.svelte';

  let { children } = $props();
  onMount(() => cart.init());
</script>

<Navbar />

{@render children()}

<Footer />

<CartDrawer />