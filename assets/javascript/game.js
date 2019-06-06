//TODO: Creating an array to store all character objects, with name, hp, att pwr, counter att pts
var character;
var isAttackerPicked = false;
var isDefenderPicked = false;
var attacker;
var defender;
var pickZone = $(".pick-zone");
var attZone = $(".att-zone");
var defZone = $(".def-zone");
var message = $("#message");
$(document).ready(function () {
    reset();

    //TODO: Add my available character to pick zone
    function reset(){
        pickZone.empty();
        attZone.empty();
        defZone.empty();
        isAttackerPicked = false;
        isDefenderPicked = false;
        character = [{name: "A", id: 0, hp: 200, att_pwr: 50, def_pwr: 50},
        {name: "B", id: 1, hp: 100, att_pwr: 10, def_pwr: 10},
        {name: "C", id: 2, hp: 100, att_pwr: 10, def_pwr: 10},
        {name: "D", id: 3, hp: 100, att_pwr: 10, def_pwr: 10},
        {name: "E", id: 4, hp: 100, att_pwr: 10, def_pwr: 10}];
        
        character.forEach(function (item){
            var newItem = $("<div>");
            var itemName = $("<span>");
            var itemImg = $("<img>");
            var itemHp = $("<span>");
            
            newItem.addClass(function() {
                return "ml-2 text-center itemBox item-" + item.id;
            });
            newItem.attr("value", item.id)
            itemName.html(item.name);
            itemImg.attr("src", function() {
                return "assets/images/p" + item.id + ".jpg";
            });
            itemImg.attr("class", "picture");
            itemImg.attr("width", 150);
            itemHp.attr("class", "itemHp");
            itemHp.html(item.hp);
            newItem.append(itemName, itemImg, itemHp);
            pickZone.append(newItem);

        });
        // console.log(pickZone);
        // console.log(isAttackerPicked,isDefenderPicked);
    }
    
    //TODO: Choose character and enemy
    // document.onclick = function(et) {
    //     console.log(et);
    // }
    
    $(".itemBox").on("click", function(event) {
        // console.log(event);
        if (isAttackerPicked) {
            if (isDefenderPicked) {
                
            }else {
                defender = $(event.currentTarget);
                if (defender.parent().attr("class")===pickZone.attr("class")) {
                    isDefenderPicked = true;
                    defender.detach();
                    defender.appendTo(defZone);
                    defender.css("background-color", "lightyellow");
                    defender.children(".picture").css("width", defender.width());
                }else {
                    alert("Pick one from character pool, please!");
                }
            }
            
        } else {
            isAttackerPicked = true;
            attacker = $(event.currentTarget);
            attacker.detach();
            attacker.appendTo(attZone);
            pickZone.children().css("background-color", "red");
            attacker.children(".picture").css("width", attacker.width());
            attacker.css("background-color", "chartreuse");
        }
    });
    function win() {
        if (pickZone.children().length > 0){
            isDefenderPicked = false;
            character[attacker.attr("value")].att_pwr += 20;
            defZone.empty();
        }else {
            message.text("WINNER!");
            defZone.empty();
        }
    }
    function lose() {
        message.text("GAME OVER!");
        reset();
    }
    
    
    //TODO: Attack button
    $("#fight-btn").on("click", function() {
        console.log(isAttackerPicked, isDefenderPicked);
        if (isAttackerPicked&&isDefenderPicked) {
            character[defender.attr("value")].hp -= character[attacker.attr("value")].att_pwr;
            character[attacker.attr("value")].hp -= character[defender.attr("value")].def_pwr;
            var att_hp = character[attacker.attr("value")].hp;
            var def_hp = character[defender.attr("value")].hp;
            attacker.children(".itemHp").html(att_hp);
            defender.children(".itemHp").html(def_hp);
            if (att_hp <= 0)
            lose();
            if (def_hp <= 0)
            win();
        }
    }
    )
    
    
    
    

    
    
    









});