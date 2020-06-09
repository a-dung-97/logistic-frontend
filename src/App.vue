<template>
    <router-view />
</template>

<script>
export default {
    name: "App"
};
</script>
<style lang="scss">
::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    // border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: #eee;
}
</style>
