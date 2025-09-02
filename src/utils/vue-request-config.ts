import { setGlobalOptions } from 'vue-request';

const vueRequestConfig = () => {
  setGlobalOptions({
    manual: false,
  });
};

export default vueRequestConfig;
