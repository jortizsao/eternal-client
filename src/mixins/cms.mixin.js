import cmsService from '@/services/cms.service';

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
        if (this.$storyblok.isInEditor()) {
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
      return cmsService
        .getStory(slug, version)
        .then(story => {
          this.story = story;
        })
        .catch(err => {
          console.error(`Error getting CMS story with slug: ${slug}`, err);
        });
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
