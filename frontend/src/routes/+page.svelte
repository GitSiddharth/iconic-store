<script lang="ts">
  import { onMount } from "svelte"
  import { sdk } from "$lib/medusa"

  let products = $state<any[]>([])

  onMount(async () => {
    const { products: fetched } = await sdk.store.product.list()
    products = fetched
  })
</script>

<h1>My Store</h1>

{#each products as product}
  <div>
    {#if product.thumbnail}
      <img src={product.thumbnail} alt={product.title} style="width: 200px" />
    {/if}
    <h2>{product.title}</h2>
    <p>{product.description}</p>
  </div>
{/each}