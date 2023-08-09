AFRAME .registerComponent("enemy-bullets", {
    init : function () {

        setInterval(this.enemyShoot, 2000);
    },

    enemyShoot : function () {
        var enemies = document.querySelectorAll(".enemy");

        for(var i = 0; i < enemies.length; i++){

            var fireball = document.createElement("a-sphere");
            fireball.setAttribute("radius", 0.1);
            fireball.setAttribute("material", {color: "orange"})
            
            var pos = enemies[i].getAttribute("position")
            fireball.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z});

            var scene = document.querySelector("#scene");
            scene.appendChild(fireball);

            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            var player = document.querySelector("#weapon").object3D;
            var enemy_fireball = fireball.object3D;

            player.getWorldPosition(position1);
            enemy_fireball.getWorldPosition(position2);

            var direction = new THREE.Vector3();
            direction.subVectors(position1, position2).normalize;
            fireball.setAttribute("velocity", direction.multiplyScalar(20))

            fireball.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: 0,
            })

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value)

            fireball.addEventListener("collide", function (e) {
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife > 0){
                        playerLife -= 1;
                        element.setAttribute("text", {value: playerLife})
                    }

                    if(playerLife <= 0){
                        var text = document.querySelector("#over");
                        text.setAttribute("visible", true);
                        
                        var ogreElement = document.querySelectotAll(".enemy");
                        for(var i = 0; i < tankElement.length; i++){
                            scene.removeChild(ogreElement[i]);
                        }
                    }
                }
            })

        }

    },

})