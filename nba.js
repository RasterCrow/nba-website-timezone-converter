//offset from ET to local time
const ETOffset = -300;
const hoursOffset = -((new Date().getTimezoneOffset() + ETOffset) / 60);

//converts time from 12 hours to 24 hours
const convertTo24HourTime = (time, modifier) => {
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "pm") {
    hours = parseInt(hours, 10) + 12;
  }
  return [hours, minutes];
};

//main function that changes game times
const setTimes = () => {
  const gameTimes = document.querySelectorAll(
    '[class^="GameCardMatchupStatusText_gcsText"]'
  );
  gameTimes &&
    gameTimes.forEach((gameTime) => {
      const fullTime = gameTime.textContent.split(" ");
      if (fullTime.length != 3) return;
      //convert to 24hour
      const converted24Hour = convertTo24HourTime(fullTime[0], fullTime[1]);
      //convert to local time
      gameTime.innerHTML = `${(converted24Hour[0] + hoursOffset) % 24}:${
        converted24Hour[1]
      } \n <p style="font-size:10px; color:gray;margin-top:3px;">local time</p>`;
    });
};

// observer on games changed
const target = document.querySelector(
  '[class*="GamesView_gameCardsContainer"]'
);
const observer = new MutationObserver(function (mutations) {
  setTimes();
});
observer.observe(target, { childList: true });

//first run
setTimes();
