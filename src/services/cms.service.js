import axios from 'axios';

export default {
  getStory(slug, version) {
    const params = {
      version,
      token: process.env.CMS_ACCESS_TOKEN,
    };

    return axios.get(`/cms/stories/${slug}`, { params }).then(res => res.data);
  },
};
