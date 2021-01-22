document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM Loaded");
  }

  //selecting a workout to complete
  const thisOneBtn = document.getElementById("thisOneBtn");

  if (thisOneBtn) {
    thisOneBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Clicked");
      const id = e.target.getAttribute("data-id");

      fetch(`/api/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Selected Workout Loading...");
          location.reload();
        })
        .catch((error) => console.error(error));
    });
  }

  //searching for workout
  const searchBtn = document.getElementById("searchBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("clicked");

      let searchedWO = {
        category: document.getElementById("searchCat").value.trim(),
      };
      console.log(searchedWO);

      fetch(`/api/${searchedWO}`, {
        methdo: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Response:", response);
          document.getElementsByName("searchInput")[0].value = "";
          console.log(`Searched for workouts with ${searchedWO} Category`);
          location.reload();
        })
        .catch((error) => console.error(error));
    });
  }

  //adding a new workout
  const addWOBtn = document.getElementById("addWO");

  if (addWOBtn) {
    addWOBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const newWorkout = {
        distance: document.getElementById("dist").value.trim(),
        category: document.getElementById("cat").value.trim(),
        wu: document.getElementById("wu").value.trim(),
        ms: document.getElementById("ms").value.trim(),
        cd: document.getElementById("cd").value.trim(),
      };

      fetch("/api/workouts/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      })
        .then((response) => {
          //clearing the forms
          document.getElementsByName("mainset")[0].value = "";
          console.log("New Workout Added");
          location.reload();
        })
        .catch((error) => console.error(error));
    });
  }

  const deleteBtn = document.querySelectorAll(".deleteWO");
  if (deleteBtn) {
    deleteBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");

        // Send the delete request
        fetch(`/api/workouts/${id}`, {
          method: "DELETE",
        }).then((res) => {
          console.log(res);
          console.log(`Deleted workout ID: ${id}`);

          // Reload the page
          location.reload();
        });
      });
    });
  }
});
