import React from 'react';
import { IndexHelp, Help } from '../src';
import { renderComponent } from '../src/test';
import { commands, options, params } from './__mocks__/args';

jest.mock('term-size');

const banner = ` _____ _____ _____ _____ _____
| __  |     |     |   __|_   _|
| __ -|  |  |  |  |__   | | |
|_____|_____|_____|_____| |_|`;

describe('<IndexHelp />', () => {
  const props = {
    bin: 'boost',
    name: 'Boost',
    version: '1.2.3',
  };

  it('renders with base props', async () => {
    expect(await renderComponent(<IndexHelp {...props} />)).toMatchSnapshot();
  });

  it('renders a banner', async () => {
    expect(await renderComponent(<IndexHelp {...props} banner={banner} />)).toMatchSnapshot();
  });

  it('renders a header', async () => {
    expect(
      await renderComponent(
        <IndexHelp {...props} header="For more information, see https://github.com/milesj/boost" />,
      ),
    ).toMatchSnapshot();
  });

  it('renders a footer', async () => {
    expect(
      await renderComponent(<IndexHelp {...props} footer="Powered by Boost CLI v1.2.3" />),
    ).toMatchSnapshot();
  });

  it('renders children', async () => {
    expect(
      await renderComponent(
        <IndexHelp {...props}>
          <Help
            header="test"
            config={{
              description: 'I am a command that does cool things.',
              usage: '$ ink foo bar',
            }}
            commands={commands}
            options={options}
            params={params}
          />
        </IndexHelp>,
      ),
    ).toMatchSnapshot();
  });

  it('renders with everything', async () => {
    expect(
      await renderComponent(
        <IndexHelp
          {...props}
          banner={banner}
          header="For more information, see https://github.com/milesj/boost"
          footer="Powered by Boost CLI v1.2.3"
        >
          <Help
            header="test"
            config={{
              description: 'I am a command that does cool things.',
              usage: '$ ink foo bar',
            }}
            commands={commands}
          />
        </IndexHelp>,
      ),
    ).toMatchSnapshot();
  });
});
