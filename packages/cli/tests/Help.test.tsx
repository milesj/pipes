import React from 'react';
import { Help } from '../src';
import { commands, options, params } from './__mocks__/args';
import { renderToString, renderToStrippedString } from './helpers';

describe('<Help />', () => {
  it('renders everything', async () => {
    expect(
      await renderToString(
        <Help
          config={{ description: 'I am a command that does cool things.', usage: '$ ink foo bar' }}
          commands={commands}
          options={options}
          params={params}
        />,
      ),
    ).toMatchSnapshot();
  });

  describe('config', () => {
    it('renders description', async () => {
      expect(
        await renderToString(
          <Help config={{ description: 'I am a command that does cool things.' }} />,
        ),
      ).toMatchSnapshot();
    });

    it('renders description with additional params', async () => {
      expect(
        await renderToString(
          <Help
            config={{ description: 'I am a command that does cool things.', deprecated: true }}
          />,
        ),
      ).toMatchSnapshot();
    });

    it('renders description with markdown', async () => {
      expect(
        await renderToString(
          <Help
            config={{
              description:
                'This is the top level command description.\nAll descriptions support markdown like **bold**, __strong__, *italics*, _emphasis_, and ~~strikethroughs~~.',
            }}
          />,
        ),
      ).toMatchSnapshot();
    });
  });

  describe('usage', () => {
    it('renders usage string', async () => {
      expect(
        await renderToString(<Help config={{ description: '', usage: '$ ink foo bar' }} />),
      ).toMatchSnapshot();
    });

    it('renders usage array', async () => {
      expect(
        await renderToString(
          <Help config={{ description: '', usage: ['$ ink foo bar', '$ test --foo -b'] }} />,
        ),
      ).toMatchSnapshot();
    });
  });

  describe('params', () => {
    it('doesnt render empty params', async () => {
      expect(await renderToString(<Help params={[]} />)).toMatchSnapshot();
    });

    it('renders params', async () => {
      expect(await renderToString(<Help params={params} />)).toMatchSnapshot();
    });

    it('renders params (stripped)', async () => {
      expect(await renderToStrippedString(<Help params={params} />)).toMatchSnapshot();
    });
  });

  describe('commands', () => {
    it('doesnt render empty commands', async () => {
      expect(await renderToString(<Help commands={{}} />)).toMatchSnapshot();
    });

    it('renders commands', async () => {
      expect(await renderToString(<Help commands={commands} />)).toMatchSnapshot();
    });

    it('renders commands (stripped)', async () => {
      expect(await renderToStrippedString(<Help commands={commands} />)).toMatchSnapshot();
    });
  });

  describe('options', () => {
    it('doesnt render empty options', async () => {
      expect(await renderToString(<Help options={{}} />)).toMatchSnapshot();
    });

    it('renders options', async () => {
      expect(await renderToString(<Help options={options} />)).toMatchSnapshot();
    });

    it('renders options (stripped)', async () => {
      expect(await renderToStrippedString(<Help options={options} />)).toMatchSnapshot();
    });
  });
});
