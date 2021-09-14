export const isMobile = {
  data() {
    return {
      windowWidth: undefined,
      windowHeight: undefined
    };
  },
  computed: {
    isMobile() {
      return (
        (this.windowWidth <= 1240 && this.windowWidth <= this.windowHeight) ||
        this.windowWidth <= 720
      );
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.document.documentElement.clientWidth;
      this.windowHeight = window.document.documentElement.clientHeight;
    }
  },
  mounted() {
    this.windowWidth = window.document.documentElement.clientWidth;
    this.windowHeight = window.document.documentElement.clientHeight;
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
