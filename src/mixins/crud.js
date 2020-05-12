export default {
    data() {
        return {
            params: {},
            defaultParams: {}
        };
    },
    methods: {
        reset() {
            this.params = { ...this.defaultParams };
        }
    },
    created() {
        this.params = { ...this.defaultParams };
    }
};
