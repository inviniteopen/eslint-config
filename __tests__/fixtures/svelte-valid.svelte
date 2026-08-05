<script lang="ts">
  interface Props {
    count: number;
  }

  const { count }: Props = $props();

  const doubled = $derived(count * 2);
</script>

<p>{count} doubled is {doubled}</p>
