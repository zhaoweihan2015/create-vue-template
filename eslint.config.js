import antfu from '@antfu/eslint-config';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default antfu(
  {
    formatters: true,
    unocss: true,
    vue: true,
  },
  skipFormatting, // prettier覆盖eslint校验
);
