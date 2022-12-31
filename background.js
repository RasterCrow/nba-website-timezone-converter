//converts time from 12 hours to 24 hours

function convertTime(time, modifier) {
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "pm") {
    hours = parseInt(hours, 10) + 12;
  }
  return [hours, minutes];
}

function setTimes() {
  const gameTimes = document.querySelectorAll(
    '[class^="GameCardMatchupStatusText_gcsText"]'
  );
  gameTimes &&
    gameTimes.forEach((gameTime) => {
      const fullTime = gameTime.textContent.split(" ");
      if (fullTime.length != 3) return;
      //convert to 24hour
      const converted24Hour = convertTime(fullTime[0], fullTime[1]);
      //convert to gmt+1 and set on page
      gameTime.textContent = `${(converted24Hour[0] + 6) % 24}:${
        converted24Hour[1]
      } GMT+1`;
    });
}

// observer on games changed
var target = document.querySelector('[class*="GamesView_gameCardsContainer"]');
var observer = new MutationObserver(function (mutations) {
  setTimes();
});

observer.observe(target, { childList: true });
//first run
setTimes();
