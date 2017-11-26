import chalk from 'chalk';
import Reporter from '../src/Reporter';
import Task from '../src/Task';
import { STATUS_PENDING, STATUS_RUNNING, STATUS_SKIPPED, STATUS_PASSED, STATUS_FAILED } from '../src/constants';

function createTaskWithStatus(title, status) {
  const task = new Task(title, value => value);

  task.status = status;

  return task;
}

describe('Reporter', () => {
  let reporter;

  beforeEach(() => {
    reporter = new Reporter();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('indent()', () => {
    it('indents with spaces', () => {
      expect(reporter.indent(0)).toBe('');
      expect(reporter.indent(1)).toBe('    ');
      expect(reporter.indent(3)).toBe('            ');
    });
  });

  describe('render()', () => {
    it('renders a results tree in a single output', () => {
      const git = createTaskWithStatus('Git', STATUS_RUNNING);
      git.subtasks = [
        createTaskWithStatus('Checking current branch', STATUS_PASSED),
        createTaskWithStatus('Checking for local changes', STATUS_PASSED),
        createTaskWithStatus('Checking for remote changes', STATUS_RUNNING),
      ];

      const statusChecks = createTaskWithStatus('Status checks', STATUS_PASSED);
      statusChecks.subtasks = [
        createTaskWithStatus('Checking for vulnerable dependencies', STATUS_PENDING),
      ];
      statusChecks.subroutines = [git];

      expect(reporter.render([statusChecks])).toBe(`${chalk.green('✔')} Status checks
    ${chalk.gray('⠙')} Git
        ${chalk.gray('⠙')} Checking for remote changes ${chalk.gray('[2/3]')}`);
    });
  });

  describe('renderTask()', () => {
    it('creates a STATUS_PENDING message', () => {
      expect(reporter.renderTask(createTaskWithStatus('Title', STATUS_PENDING))).toEqual([
        `${chalk.gray('●')} Title`,
      ]);
    });

    it('creates a STATUS_RUNNING message', () => {
      expect(reporter.renderTask(createTaskWithStatus('Title', STATUS_RUNNING))).toEqual([
        `${chalk.gray('⠙')} Title`,
      ]);
    });

    it('creates a STATUS_SKIPPED message', () => {
      expect(reporter.renderTask(createTaskWithStatus('Title', STATUS_SKIPPED))).toEqual([
        `${chalk.yellow('◌')} Title ${chalk.yellow('[skipped]')}`,
      ]);
    });

    it('creates a STATUS_PASSED message', () => {
      expect(reporter.renderTask(createTaskWithStatus('Title', STATUS_PASSED))).toEqual([
        `${chalk.green('✔')} Title`,
      ]);
    });

    it('creates a STATUS_FAILED message', () => {
      expect(reporter.renderTask(createTaskWithStatus('Title', STATUS_FAILED))).toEqual([
        `${chalk.red('✖')} Title ${chalk.red('[failed]')}`,
      ]);
    });

    it('indents the message', () => {
      expect(reporter.renderTask(createTaskWithStatus('Title', ''), 2)).toEqual([
        '         Title',
      ]);
    });

    describe('with tasks', () => {
      it('displays STATUS_PENDING tasks', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PENDING),
          createTaskWithStatus('Sub-task #2', STATUS_PENDING),
          createTaskWithStatus('Sub-task #3', STATUS_PENDING),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.gray('●')} Sub-task #1 ${chalk.gray('[0/3]')}`,
        ]);
      });

      it('displays STATUS_RUNNING tasks over STATUS_PENDING tasks', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PENDING),
          createTaskWithStatus('Sub-task #2', STATUS_PENDING),
          createTaskWithStatus('Sub-task #3', STATUS_RUNNING),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.gray('⠙')} Sub-task #3 ${chalk.gray('[0/3]')}`,
        ]);
      });

      it('displays STATUS_FAILED tasks over all others', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PASSED),
          createTaskWithStatus('Sub-task #2', STATUS_FAILED),
          createTaskWithStatus('Sub-task #3', STATUS_RUNNING),
          createTaskWithStatus('Sub-task #4', STATUS_FAILED),
          createTaskWithStatus('Sub-task #5', STATUS_PENDING),
          createTaskWithStatus('Sub-task #6', STATUS_SKIPPED),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.red('✖')} Sub-task #2 ${chalk.red('[failed]')}`,
        ]);
      });

      it('does not display STATUS_SKIPPED or STATUS_PASSED tasks', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PASSED),
          createTaskWithStatus('Sub-task #2', STATUS_SKIPPED),
          createTaskWithStatus('Sub-task #3', STATUS_SKIPPED),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
        ]);
      });

      it('does not display tasks if parent isnt STATUS_RUNNING', () => {
        const result = createTaskWithStatus('Title', STATUS_PASSED);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PENDING),
          createTaskWithStatus('Sub-task #2', STATUS_RUNNING),
          createTaskWithStatus('Sub-task #3', STATUS_PASSED),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.green('✔')} Title`,
        ]);
      });

      it('increases count for STATUS_PASSED tasks', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PASSED),
          createTaskWithStatus('Sub-task #2', STATUS_PENDING),
          createTaskWithStatus('Sub-task #3', STATUS_PASSED),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.gray('●')} Sub-task #2 ${chalk.gray('[2/3]')}`,
        ]);
      });
    });

    describe('with subroutines', () => {
      it('displays all sub-routines', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subroutines = [
          createTaskWithStatus('Sub-routine #1', STATUS_PENDING),
          createTaskWithStatus('Sub-routine #2', STATUS_PENDING),
          createTaskWithStatus('Sub-routine #3', STATUS_PENDING),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.gray('●')} Sub-routine #1`,
          `    ${chalk.gray('●')} Sub-routine #2`,
          `    ${chalk.gray('●')} Sub-routine #3`,
        ]);
      });

      it('displays different statuses', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subroutines = [
          createTaskWithStatus('Sub-routine #1', STATUS_RUNNING),
          createTaskWithStatus('Sub-routine #2', STATUS_FAILED),
          createTaskWithStatus('Sub-routine #3', STATUS_PASSED),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.gray('⠙')} Sub-routine #1`,
          `    ${chalk.red('✖')} Sub-routine #2 ${chalk.red('[failed]')}`,
          `    ${chalk.green('✔')} Sub-routine #3`,
        ]);
      });

      it('displays tasks above sub-routines', () => {
        const result = createTaskWithStatus('Title', STATUS_RUNNING);
        result.subtasks = [
          createTaskWithStatus('Sub-task #1', STATUS_PENDING),
          createTaskWithStatus('Sub-task #2', STATUS_PENDING),
          createTaskWithStatus('Sub-task #3', STATUS_RUNNING),
        ];
        result.subroutines = [
          createTaskWithStatus('Sub-routine #1', STATUS_RUNNING),
          createTaskWithStatus('Sub-routine #2', STATUS_SKIPPED),
          createTaskWithStatus('Sub-routine #3', STATUS_PASSED),
        ];

        expect(reporter.renderTask(result)).toEqual([
          `${chalk.gray('⠙')} Title`,
          `    ${chalk.gray('⠙')} Sub-task #3 ${chalk.gray('[0/3]')}`,
          `    ${chalk.gray('⠙')} Sub-routine #1`,
          `    ${chalk.yellow('◌')} Sub-routine #2 ${chalk.yellow('[skipped]')}`,
          `    ${chalk.green('✔')} Sub-routine #3`,
        ]);
      });
    });
  });

  describe('renderStatus()', () => {
    it('renders a bullet for STATUS_PENDING', () => {
      expect(reporter.renderStatus(createTaskWithStatus('title', STATUS_PENDING))).toBe(chalk.gray('●'));
    });

    it('renders a spinner for STATUS_RUNNING', () => {
      expect(reporter.renderStatus(createTaskWithStatus('title', STATUS_RUNNING))).toBe(chalk.gray('⠙'));
    });

    it('renders a dotted circle for STATUS_SKIPPED', () => {
      expect(reporter.renderStatus(createTaskWithStatus('title', STATUS_SKIPPED))).toBe(chalk.yellow('◌'));
    });

    it('renders a tick for STATUS_PASSED', () => {
      expect(reporter.renderStatus(createTaskWithStatus('title', STATUS_PASSED))).toBe(chalk.green('✔'));
    });

    it('renders a cross for STATUS_FAILED', () => {
      expect(reporter.renderStatus(createTaskWithStatus('title', STATUS_FAILED))).toBe(chalk.red('✖'));
    });
  });
});