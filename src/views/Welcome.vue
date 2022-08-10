<template>
    <div>
        <h1>{{ title }}</h1>
        <button @click="changeTitle">Change title</button>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            title: "Hello"
        };
    },
    methods: {
        changeTitle() {
            this.title = "Hi";
        }
    }
};
</script>