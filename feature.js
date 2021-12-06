
// interaction
function mouseClicked(){
    pos_x = ceil(mouseX / 20)-1;
    pos_y = ceil(mouseY / 20)-1;
    tambah_obstacle(pos_x, pos_y);
    console.log(nodes[pos_x][pos_y]);
}
// var prev_x = 0;
// var prev_y = 0;
// function mouseDragged() {
//     pos_x = ceil(mouseX / 20)-1;
//     pos_y = ceil(mouseY / 20)-1;
//     if(pos_x != prev_x && pos_y != prev_y){
//         prev_x = pos_x;
//         prev_y = pos_y;
//         tambah_obstacle(pos_x, pos_y);
//     }
//     return false;
// }
function tambah_obstacle(x,y){
    let data = [];
    for (let i = 0; i < obstacle_c.length; i++) {
        const obst = obstacle_c[i];
        if(obst.x == x && obst.y == y){
            obstacle_c.splice(i, 1);
            return;
        }
        data.push([obst.x, obst.y]);
    }
    // console.log(data);
    obstacle_c.push(new node(x,y));
    // obstacle[x+"|"+y] = true;
}
function keyPressed(){
    if(keyCode == RETURN){
        truePath = findingFunction.startSearch(startNode, targetNode);
    }
}
function createObstacle(){
    var prob = 0.9;
    for (let i = 0; i < skala / 2; i++) {
        y = i * 2;
        for (let j = 0; j < Math.floor(Math.random() * 18 ) + 15; j++) {
            let is_obst = Math.floor(Math.random() * 2);
            if(is_obst % 2 == 0){
                obstacle_c.push(new node(j, y));
            }
            
        }
    }
}
