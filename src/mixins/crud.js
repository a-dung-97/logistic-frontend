export default {
    data() {
        return {
            params: {},
            defaultParams: {}
        };
    },
    methods: {},
    created() {
        if (this.params) console.log(this.$route);
        // if (!Object.keys(this.$route.query).length == 0)
        //     this.params = { ...this.defaultParams };
        // else this.params = { ...this.$route.query };
    }
};
