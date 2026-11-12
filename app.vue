<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <RouteCurtain />
  </div>
</template>

<script setup>
// Put lang/dir on <html> so RTL/LTR CSS (fonts, logical spacing) applies
// document-wide and search engines get the correct language + hreflang tags.
const i18nHead = useLocaleHead({ addDirAttribute: true, addSeoAttributes: true });

useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs?.lang,
    dir: () => i18nHead.value.htmlAttrs?.dir,
  },
  link: () => i18nHead.value.link || [],
  meta: () => i18nHead.value.meta || [],
});
</script>
