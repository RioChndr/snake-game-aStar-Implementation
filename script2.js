var cols = 20;
var rows = cols;
var nodes = [];
var skala = 20;
var startNode;
var targetNode;
var obstacle_c =[];
var obstacle = {};
var openSet = [];
var closeSet = [];
var cameFrom = [];

function node(i,j){
    this.x = i;
    this.y = j;
    this.gScore = 1;
    this.hScore = 1;
    this.fScore = 1;
    this.skala = 20;
    this.show = function(){
        fill(217, 217, 217);
        square(this.x * this.skala, this.y * this.skala, this.skala );
    }
    this.customShow = function(color){
        fill(color);
        square(this.x * this.skala, this.y * this.skala, this.skala );
    }
    
}


function setup(){
    createCanvas(400,400);
    for (let i = 0; i < rows; i++) {
        nodes[i] = [];
        for (let j = 0; j < cols; j++) {
            nodes[i][j] = new node(i,j);
        }
    }
    createObstacle();
    startNode = new node(0,0);
    targetNode = new node(skala-1, skala-1);
}

function draw(){
    background(200);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            nodes[i][j].show();
        }
    }
    startNode.customShow(color(67, 255, 54));
    targetNode.customShow(color(255, 0, 217));
    displayNode(obstacle_c, color(64, 64, 64));
    for (let i = 0; i < cameFrom.length; i++) {
        const cf  = cameFrom[i];
        // cf.customShow(color(247, 255, 25)); //yellow
        cf.cameFrom.customShow(color(255, 0, 0)); //red
        
    }
    // displayNode(closeSet, color(100,100,0));
}

function A_star(){
    openSet = new heapDataNode();
    openSet.insert(startNode);
    closeSet = [];
    cameFrom = [];
    console.log('run');
    
    function isInCloseSet(node){
        for (let i = 0; i < closeSet.length; i++) {
            if(closeSet.x == node.x && closeSet.y == node.y){
                return true;
            }
        }   
        return false;
    }
    function isInOpenSet(node){
        for (let i = 0; i < openSet.length; i++) {
            if(openSet.x == node.x && openSet.y == node.y){
                return true;
            }
        }   
        return false;
    }

    
    function isInObstacle(node){
        if(typeof node.x == undefined){
            return false;
        }
        for (let j = 0; j < obstacle_c.length; j++) {
            const obst = obstacle_c[j];
            if(obst.x == node.x && obst.y == node.y){
                return true;
            }
        }
        return false;
    }

    if(openSet.heap.length == 0){
        alert('wtf');
    }

    while(openSet.heap.length > 1){
        
        current = openSet.getSmallestGScore();
        if(current.x == targetNode.x && current.y == targetNode.y){
            console.log('done');
            return;
        }
        closeSet.push(current);
        openSet.remove(1); // hapus data terkecil

        let neighbours = findNeighbours(current);
        if(neighbours.length < 1){
            return;
        }
        neighbours.forEach(function(neighbour){
            console.log(`neighbour, x : ${neighbour.x}, y : ${neighbour.y}`);
            if(isInObstacle(neighbour)){
                //lanjukan jika ada obstacle
                return;
            }
            let tentative_gScore = current.gScore + dist(current.x, current.y, neighbour.x, neighbour.y);
            if(tentative_gScore < neighbour.gScore || isInOpenSet(neighbour) == false){
                neighbour.cameFrom = current;
                neighbour.gScore = tentative_gScore;
                neighbour.fScore = neighbour.gScore + heuristic(neighbour);
                cameFrom.push(neighbour);
                if(isInCloseSet(neighbour) == false){
                    openSet.insert(neighbour);
                }
            }
        })
    }
    
   
}

function displayNode(thisNode, color){
    for (let i = 0; i < thisNode.length; i++) {
        const n = thisNode[i];
        n.customShow(color);
    }
}

function heuristic(n){
    return dist(n.x, n.y, targetNode.x, targetNode.y);
}

function findNeighbours(curra){
    const curr = curra;
    let neighbours = [];
    
       if(curr.x - 1 >= 0){
          neighbours.push(nodes[curr.x - 1][curr.y]);
          if(curr.y - 1 >= 0){
          neighbours.push(nodes[curr.x - 1][curr.y - 1]);
          }
          if(curr.y + 1 < 20){
          neighbours.push(nodes[curr.x - 1][curr.y + 1]);
          }
      }
      if(curr.x + 1 < 20){
          neighbours.push(nodes[curr.x + 1][curr.y]);
          if(curr.y - 1 >= 0){
          neighbours.push(nodes[curr.x + 1][curr.y - 1]);
          }
          if(curr.y + 1 < 20){
          neighbours.push(nodes[curr.x + 1][curr.y + 1]);
          }
      }
      if(curr.y - 1 >= 0){
          neighbours.push(nodes[curr.x][curr.y - 1]);
          if(curr.x - 1 >= 0){
          neighbours.push(nodes[curr.x - 1][curr.y - 1]);
          }
          if(curr.x + 1 < 20){
          neighbours.push(nodes[curr.x + 1][curr.y - 1]);
          }
      }
      if(curr.y + 1 < 20){
          neighbours.push(nodes[curr.x][curr.y + 1]);
          if(curr.x - 1 >= 0){
          neighbours.push(nodes[curr.x - 1][curr.y + 1]);
          }
          if(curr.x + 1 < 20){
          neighbours.push(nodes[curr.x + 1][curr.y + 1]);
          }
      }
    
    return neighbours;
    
  }


class heapDataNode{
    constructor(){
        this.heap = [null];
    }
    insert(data){
        this.heap.push(data);
        this.doSwap();
    }
    remove(index){
        this.heap.splice(index, 1);
        this.doSwap();
    }
    getSmallestGScore(){
        return this.heap[1];
    }
    doSwap(){
        if(this.heap.length > 1){
            let current = this.heap.length -1;
            while(current > 1){
                if(this.heap[Math.floor(current/2)].fScore > this.heap[current].fScore){
                    let parrent = this.heap[Math.floor(current/2)];
                    this.heap[Math.floor(current/2)] = this.heap[current];
                    this.heap[current] = parrent;
                }
                current = Math.floor(current/2);
            }
        }
    }
}


// interaction
function mouseClicked(){
    pos_x = ceil(mouseX / 20)-1;
    pos_y = ceil(mouseY / 20)-1;
    tambah_obstacle(pos_x, pos_y);

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
    for (let i = 0; i < obstacle_c.length; i++) {
        const obst = obstacle_c[i];
        if(obst.x == x && obst.y == y){
            obstacle_c.splice(i, 1);
            return;
        }
    }
    obstacle_c.push(new node(x,y));
    // obstacle[x+"|"+y] = true;
}
function keyPressed(){
    if(keyCode == RETURN){
        A_star();
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