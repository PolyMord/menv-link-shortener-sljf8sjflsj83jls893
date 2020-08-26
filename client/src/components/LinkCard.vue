<template>
  <div>
    <h2>Link</h2>

    <p>
      Your link:
      <a :href="link.to" target="_blank" rel="noopener noreferrer">
        {{ link.to }}
      </a>
    </p>
    <p>
      From:
      <a :href="link.from" target="_blank" rel="noopener noreferrer">
        {{ link.from }}
      </a>
    </p>
    <p>
      Count clicks on link:
      <strong>{{ link.clicks }}</strong>
    </p>
    <p>
      Create date:
      <strong>{{ new Date(link.date).toLocaleDateString() }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    link: Object
  }
}
</script>
