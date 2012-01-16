/*
 * At our agency we take
 * a break to cleanse your minds and recharge
 * by playing ping pong every day at 15:00 in our office.
 *
 * This plugins adds the commands !pingpong
 * (none of us actually use the "correct" term table-tennis).
 *
 * It shows timely information about the ping pong session.
 * And every day at 15:00 sharp it broadcast to all rooms
 * that it's time for some ping pong.
 */

var talker = require('../lib/talker');

var intervalId,
    hour = 15,
    minute = 0,
    now = new Date(),
    next = (now.getHours() > hour)
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute)
      : new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

// Setup an interval to broadcast at 15:00 next time.
// and after that it does so every 24th hour.
intervalId = setInterval(function () {
  talker.broadcast('Time for ping pong everyone!');
  clearInterval(intervalId);

  intervalId = setInterval(function () {
    talker.broadcast('Time for ping pong everyone!');
  }, 8640000);
}, next.getTime() - now.getTime());

talker.command('pingpong', function (data) {
  var now = new Date(),
      hours = now.getHours(),
      minutes = now.getMinutes();

  if (hours === 15 && minutes === 0) {
    talker.message(data.room, 'Stop, Hammer time!');
  } else if (hours >= 15) {
    talker.message(data.room, 'You\'re late, ping pong should have started ' + (hours - 15) + ' hours and ' + minutes + ' minutes ago.');
  } else if (hours < 15) {
    talker.message(data.room, (15 - hours) + ' hours and ' + (60 - minutes) + ' minutes left until the daily ping pong');
  }
});
