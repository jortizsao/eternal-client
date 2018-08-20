export default {
  data() {
    return {
      slug: '',
      version: '',
      story: {
        content: {},
      },
    };
  },
  mounted() {
    if (this.$storyblok) {
      this.$storyblok.on('change', () => {
        this.setCmsVersion('draft');
        this.getCmsStory(this.getCmsStorySlug(), this.getCmsVersion());
      });

      this.$storyblok.pingEditor(() => {
        if (this.$storyblok.isInEditor() || process.env.NODE_ENV === 'development') {
          this.setCmsVersion('draft');
          this.getCmsStory(this.getCmsStorySlug(), this.getCmsVersion());
        } else {
          this.setCmsVersion('published');
          this.getCmsStory(this.getCmsStorySlug(), this.getCmsVersion());
        }
      });
    }
  },
  methods: {
    getCmsStory(slug, version) {
      this.$storyblok.get(
        {
          slug,
          version,
        },
        data => {
          this.$nextTick(() => {
            this.story = data.story;
          });
        },
      );
    },
    getCmsStorySlug() {
      return this.slug;
    },
    setCmsStorySlug(slug) {
      this.slug = slug;
    },
    getCmsVersion() {
      return this.version;
    },
    setCmsVersion(version) {
      this.version = version;
    },
  },
};
