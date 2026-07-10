
<script>
  // Header background on scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
  // Signature hairline draw on load
  window.addEventListener('load', () => {
    document.getElementById('hairline').classList.add('draw');
  });
</script>
