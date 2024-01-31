const assert = require('assert');
const fs = require('fs');
const { getCompletionScript } = require('..');

describe('getCompletionScript gets the right completion script for', () => {
  for (const shell of ['bash', 'fish', 'zsh']) {
    it(shell, async () => {
      const received = await getCompletionScript({
        name: 'foo',
        completer: 'foo-complete',
        shell
      });
      const expected = fs.readFileSync(require.resolve(`../lib/templates/completion.${shell}`), 'utf8')
        .replace(/\{pkgname\}/g, 'foo')
        .replace(/{completer}/g, 'foo-complete')
        .replace(/\r?\n/g, '\n');
      assert.equal(received, expected);
    });
  }

  it('pwsh', async () => {
    const received = await getCompletionScript({
      name: 'foo',
      completer: 'foo-complete',
      shell: 'pwsh'
    });
    const expected = fs.readFileSync(require.resolve(`../lib/templates/completion.ps1`), 'utf8')
      .replace(/\{pkgname\}/g, 'foo')
      .replace(/{completer}/g, 'foo-complete')
      .replace(/\r?\n/g, '\n');
    assert.equal(received, expected);
  });
});
