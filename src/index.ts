import five, { Button, Piezo } from 'johnny-five';
import debounce from './debounce';
import { alpha } from './morse-code-key';

const board = new five.Board({ port: 'COM3', debug: true });
board.on('ready', () => {
  // Create button and listen to events
  const button: Button = new five.Button(13);
  const piezo: Piezo = new five.Piezo(12);
  let count: number;
  let stringValue: string = '';

  const waitForInput = debounce(() => {
    // Output the character
    console.log(alpha[stringValue]);
    // Reset the value
    stringValue = '';
  }, 725);

  button.on('down', () => {
    // Start counting how long the button is held down
    piezo.tone(440, 999999);
    count = new Date().getTime();
  });

  button.on('up', () => {
    piezo.off();
    // Run our debounced function
    waitForInput();
    // Finish counting how long the button was held down for
    const interval = new Date().getTime() - count;
    // If it's held down for a long time make it a dash otherwise it's a dot
    stringValue = interval > 200 ? stringValue + '-' : stringValue + '.';
    count = 0;
  });

  board.repl.inject({
    button
  });
});
