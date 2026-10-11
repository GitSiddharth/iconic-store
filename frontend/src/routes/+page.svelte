<script lang="ts">
  const doors = [
  { theme: 'shaan', word: 'Shaan', line: 'For him', href: '/shaan' },
  { theme: 'shringaar', word: 'Shringaar', line: 'For her', href: '/shringaar' },
  { theme: 'shauq', word: 'Shauq', line: 'For everyone', href: '/shauq' }
];
</script>

<main class="flex min-h-screen flex-col md:flex-row">
  {#each doors as door}
    <a
      href={door.href}
      data-theme={door.theme}
      class="group relative flex min-h-[33vh] flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center transition-[flex-grow] duration-700 ease-out md:min-h-screen md:hover:flex-[2]"
      style="background: radial-gradient(circle at 30% 20%, var(--surface), var(--bg) 70%);"
    >
      <span class="mb-3 text-xs tracking-[0.4em] text-metal uppercase">{door.line}</span>
      <h2 class="font-script text-6xl text-fg transition-transform duration-700 group-hover:scale-110 md:text-7xl lg:text-8xl">
        {door.word}
      </h2>
      <span class="mt-6 border-b border-metal pb-1 font-display text-lg text-metal opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        Enter
      </span>
    </a>
  {/each}
</main>