import five from 'johnny-five';

const board = new five.Board({ port: 'COM3', debug: true });

board.on('ready', () => {
  // Create an Led on pin 13
  const led1 = new five.Led(13);
  const led2 = new five.Led(11);
  const led3 = new five.Led(9);
  const led4 = new five.Led(7);
  // Blink every half second
  led1.strobe(200);
  led2.strobe(160);
  led3.strobe(170);
  led4.strobe(180);
});
