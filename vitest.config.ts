import { defineConfig } from 'vitest/config';

/* An workaround for the termination Error described on
 * official document here: https://vitest.dev/guide/common-errors.html#failed-to-terminate-worker.
 * This issue is tracked at: https://github.com/vitest-dev/vitest/issues/3077
 */

export default defineConfig({
  test: {
    pool: "forks"
  }
})
