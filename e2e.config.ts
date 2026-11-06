import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  tests: 'tests/**/*.e2e.ts',
  workers: 1,
  targets: [{
    name: 'chromium',
    engine: web(),
    app: {
      url: 'http://127.0.0.1:4183',
      command: {
        executable: 'npm',
        args: ['run', 'preview', '--', '--port', '4183', '--strictPort'],
        log: '.e2e/logs/site.log',
      },
    },
  }, {
    name: 'mobile',
    engine: web({ viewport: { width: 390, height: 844 } }),
    app: { url: 'http://127.0.0.1:4183' },
  }],
} satisfies E2EConfig;
