AFRAME.registerComponent("player-movement", {
    init: function () {
      this.walk();
    },
    walk: function () {
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "W" ||
          e.key === "A" ||
          e.key === "S" ||
          e.key === "D" 
        ) {
          var entity = document.querySelector("#sound2");
          entity.components.sound.playSound();
        }
      });
    },
  });
  