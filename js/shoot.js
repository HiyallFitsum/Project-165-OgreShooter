AFRAME .registerComponent("bullets", {
    init : function () {
        this.shootBullets();
    },

    shootBullets : function () {
        window.addEventListener("keydown", (e)=>{
            if(e.key === "z"){
                var bullet = document.createElement("a-entity");

                bullet.setAttribute("geometry", {
                  primitive: "sphere",
                  radius: 0.2,
                });
        
                bullet.setAttribute("material", "color", "black");
        
                var cam = document.querySelector("#camera-rig");
        
                pos = cam.getAttribute("position");
        
                bullet.setAttribute("position", {
                  x: pos.x,
                  y: pos.y+1.6,
                  z: pos.z-4.4,
                });

                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction)

                bullet.setAttribute("velocity", direction.multiplyScalar(-50));

                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "50",
                })

                bullet.addEventListener("collide", this.removeBullets);

                var scene = document.querySelector("#scene");
                scene.appendChild(bullet);

                this.shootSound();
            }
        })

    },

    removeBullets : function (e) {

        console.log("it works")
        var scene = document.querySelector("#scene")

        element = e.detail.target.el;
        elementHit = e.detail.body.el;

        if(elementHit.id.includes("enemy")){
            console.log("it def works")
            var countOgreEl = document.querySelector("#countOgre");
            var ogreFired = parseInt(countOgreEl.getAttribute("text").value);
            ogreFired -= 1;
      
            countOgreEl.setAttribute("text", {
              value: ogreFired
            });
      
            if (ogreFired === 0) {
              var txt = document.querySelector("#completed");
              txt.setAttribute("visible", true);       
              
            }
            scene.removeChild(elementHit);
        }
        element.removeEventListener("collide", this.removeBullets);
        scene.removeChild(element);

    },

    shootSound: function () {
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
      },
})