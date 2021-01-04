document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM Loaded");
  }

  //selecting a workout to complete
  const thisOneBtn = document.querySelectorAll(".selectWO");
  thisOneBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      fetch(`api/workouts/${id}`, {
        method: "PUT",
      });
    });
  });

  //searching for workout
  const searchBtn = document.getElementById("search-form");

  if (searchBtn) {
    searchBtn.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("clicked");

      let searchedWO = {
        wu: document.getElementById("wu").value.trim(),
      };
      console.log(searchedWO);

      fetch(`/api/workouts/${wu}`, {
        methdo: "GET",
        headers: {
          Accept: "application.json",
          "Content-Type": "application.json",
        },
        body: JSON.stringify(searchedWO),
      }).then((response) => {
        document.getElementById("wu")[0].value = "";
        console.log(`Searched for workouts with ${searchedWO} WU length`);
        location.reload();
      });
    });
  }

  //adding a new workout
  const addWOBtn = document.getElementById("create-form");

  if (addWOBtn) {
    addWOBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      const newWorkout = {
        distance: document.getElementById("dist").value.trim(),
        category: document.getElementById("cat").value.trim(),
        wu: document.getElementById("wu").value.trim(),
        ms: document.getElementById("ms").value.trim(),
        cd: document.getElementById("cd").value.trim(),
      };
      console.log(newWorkout);

      fetch("/api/workouts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      }).then((response) => {
        document.getElementsByName("mainset")[0].value = "";
        console.log("New Workout Added");
        location.reload();
      });
    });
  }
});
