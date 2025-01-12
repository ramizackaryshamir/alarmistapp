export const useConsoleColors = () => {
  // Foreground Colors
  const FgBlackConsole = (message: boolean) => {
    if (typeof message === 'string') {
      console.log('\x1b[30m%s\x1b[0m', `${message}`, message);
    }
    if (typeof message === 'boolean') {
      console.log('\x1b[30m%s\x1b[0m', `${message}`, message);
    }
  };

  const FgRedConsole = (message: string | boolean) => {
    if (typeof message === 'string') {
      console.log('\x1b[31m%s\x1b[0m', `${message}`, message);
    }
    if (typeof message === 'boolean') {
      console.log('\x1b[31m%s\x1b[0m', `${message}`, message);
    }
  };

  const FgGreenConsole = (message: string | boolean) => {
    if (typeof message === 'string') {
      console.log('\x1b[32m%s\x1b[0m', `${message}`, message);
    }
    if (typeof message === 'boolean') {
      console.log('\x1b[32m%s\x1b[0m', `${message}`, message);
    }
  };

  const FgYellowConsole = (message: string | boolean) => {
    if (typeof message === 'string') {
      console.log('\x1b[33m%s\x1b[0m', `${message}`, message);
    }
    if (typeof message === 'boolean') {
      console.log('\x1b[33m%s\x1b[0m', `${message}`, message);
    }
  };

  const FgBlueConsole = (message: string) => {
    console.log('\x1b[34m%s\x1b[0m', `${message}`, message);
  };

  const FgMagentaConsole = (message: string) => {
    console.log('\x1b[35m%s\x1b[0m', `${message}`, message);
  };

  const FgCyanConsole = (message: string) => {
    console.log('\x1b[36m%s\x1b[0m', `${message}`, message);
  };

  const FgWhiteConsole = (message: string) => {
    console.log('\x1b[37m%s\x1b[0m', `${message}`, message);
  };

  const FgGrayConsole = (message: string) => {
    console.log('\x1b[90m%s\x1b[0m', `${message}`, message);
  };

  // Background Colors
  const BgBlackConsole = (message: string) => {
    console.log('\x1b[40m%s\x1b[0m', `${message}`, message);
  };

  const BgRedConsole = (message: string) => {
    console.log('\x1b[41m%s\x1b[0m', `${message}`, message);
  };

  const BgGreenConsole = (message: string) => {
    console.log('\x1b[42m%s\x1b[0m', `${message}`, message);
  };

  const BgYellowConsole = (message: string) => {
    console.log('\x1b[43m%s\x1b[0m', `${message}`, message);
  };

  const BgBlueConsole = (message: string) => {
    console.log('\x1b[44m%s\x1b[0m', `${message}`, message);
  };

  const BgMagentaConsole = (message: string) => {
    console.log('\x1b[45m%s\x1b[0m', `${message}`, message);
  };

  const BgCyanConsole = (message: string) => {
    console.log('\x1b[46m%s\x1b[0m', `${message}`, message);
  };

  const BgWhiteConsole = (message: string) => {
    console.log('\x1b[47m%s\x1b[0m', `${message}`, message);
  };

  const BgGrayConsole = (message: string) => {
    console.log('\x1b[100m%s\x1b[0m', `${message}`, message);
  };

  return {
    FgBlackConsole,
    FgRedConsole,
    FgGreenConsole,
    FgYellowConsole,
    FgBlueConsole,
    FgMagentaConsole,
    FgCyanConsole,
    FgWhiteConsole,
    FgGrayConsole,
    BgBlackConsole,
    BgRedConsole,
    BgGreenConsole,
    BgYellowConsole,
    BgBlueConsole,
    BgMagentaConsole,
    BgCyanConsole,
    BgWhiteConsole,
    BgGrayConsole,
  };
};
