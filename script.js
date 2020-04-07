var nodes = [];
var openSet = [];
var closedSet = {};
var target;
var cameFrom = [];
var obstacle = {};
var obstacle_c = [];
var run_aStar = false;
var final = false;

function setup() {
  createCanvas(400, 400);
  for(let i = 0; i < 20; i++){
    nodes[i] = [];
    for(let j = 0; j < 20; j++){
      nodes[i][j] = new node(i,j);
    }
  }
  for (let i = 0; i < openSet.length; i++) {
      const os = openSet[i];
      os.customShow(151, 72, 217);
  }
//   nodes[0][0];
  
  tambahOpenSet(nodes[0][0]);
  target = nodes[19][19];
//   console.log(openSet[0]); 
}

function draw() {
    background(220);
    // noLoop();
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
          nodes[i][j].show();
        }
      }
      target.customShow(245, 145, 39);
      obstacle_c.forEach(function(o){
          o.customShow(160, 161, 159);
      })
      if(final) print_final();
}

function aStar(){
    while(openSet.length > 0){
        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 20; j++){
              nodes[i][j].show();
            }
          }
            var lowest_fScore = 0;
        for(let i = 0 ; i < openSet.length; i++){
            if(openSet[i].fScore <= openSet[lowest_fScore].fScore){
            lowest_fScore = i;
            }
        };
        //   console.log("jumlah openSet : "+openSet.length);
        let current = openSet[lowest_fScore];
        //   console.log('adsfjslkdf');
        //   console.log(current);
        
        //   openSet.splice(lowest_fScore, 1); //remove current from openSet
        hapusOpenSet(lowest_fScore);
        nodes[current.x][current.y].isOpen = false;
        //   console.log(closedSet.length);
        if(current.x == target.x && current.y == target.y){
            print_final();
            final = true;
            // console.log('done');
            return;
        }
        
        let neighbours = findNeighbours(current);
        //   console.log("neighbours length : "+neighbours.length);
        neighbours.forEach(function(neighbour){
            if(neighbour == null){
                return;
            }
            if(isInObstacle(neighbour) == true){
                return;
            };
            if(neighbour.isOpen == false){
                return;
            }

            let tentativ_gScore  = current.gScore + dist(current.x, current.y, neighbour.x, neighbour.y);
            //   console.log("tentative :"+tentativ_gScore);
            if(neighbour.gScore <= tentativ_gScore){
                //   console.log('you got it');
                neighbour.from = current;
                cameFrom.push(neighbour);
                neighbour.gScore = tentativ_gScore;
                neighbour.fScore = neighbour.gScore + heuristic(neighbour);
                //   console.log(isInCloseSet(neighbour));
                if(nodes[neighbour.x][neighbour.y].isOpen != false){
                    tambahOpenSet(neighbour);
                }
            }
        })
    }
}

function print_final(){
    // console.log("jumlah comefrom :"+cameFrom.length );
    cameFrom.forEach(function(n){
        n.from.customShow(color(255,255,0));
        // n.customShow(color(255,255,0));
    });
}

function tambahOpenSet(n){
    openSet.push(n);
    nodes[n.x][n.y].isOpen = true;
    // console.log('tambah openset '+n.x+', '+n.y);
}
function hapusOpenSet(index){
    var data = openSet[index];
    // console.log('hapusOpenSet '+index );
    nodes[data.x][data.y].isOpen = false;
    openSet.splice(index, 1);
    console.log('telah terhapus Openset : '+index);
    
}
function tambahCloseSet(n){
    closedSet[n.x+"|"+n.y] == true;
    nodes[n.x][n.y].isOpen = false;
}

class node{
  scale = 20;
  x = 0;
  y = 0;
  gScore = 1;
  hScore = 0;
  fScore = 1;
  isOpen = null;
  constructor(x,y){
      this.x = x;
      this.y = y;
  }
  set_fScore = function(){
    this.fScore = this.gScore + this.hScore;
  }
  show = function(){
    if(this.isOpen == true){
        fill(74, 249, 255);
    }else if(this.isOpen == false){
        fill(255, 86, 74);
    }else{
        fill(224, 222, 222);
    }
    // stroke(255)
    square(this.x * this.scale, this.y * this.scale, this.scale);
  }
  customShow = function(color){
        fill(color);
        square(this.x * this.scale, this.y * this.scale, this.scale);
  }
}

function findNeighbours(curr){
  let neighbours = [];
  
     if(curr.x - 1 >= 0){
        neighbours.push(nodes[curr.x - 1][curr.y]);
        if(curr.y - 1 >= 0){
        neighbours.push(nodes[curr.x - 1][curr.y - 1]);
        }
        if(curr.y + 1 <= 20){
        neighbours.push(nodes[curr.x - 1][curr.y + 1]);
        }
    }
    if(curr.x + 1 <= 20){
        neighbours.push(nodes[curr.x + 1][curr.y]);
        if(curr.y - 1 >= 0){
        neighbours.push(nodes[curr.x + 1][curr.y - 1]);
        }
        if(curr.y + 1 <= 20){
        neighbours.push(nodes[curr.x + 1][curr.y + 1]);
        }
    }
    if(curr.y - 1 >= 0){
        neighbours.push(nodes[curr.x][curr.y - 1]);
        if(curr.x - 1 >= 0){
        neighbours.push(nodes[curr.x - 1][curr.y - 1]);
        }
        if(curr.x + 1 <= 20){
        neighbours.push(nodes[curr.x + 1][curr.y - 1]);
        }
    }
    if(curr.y + 1 <= 20){
        neighbours.push(nodes[curr.x][curr.y + 1]);
        if(curr.x - 1 >= 0){
        neighbours.push(nodes[curr.x - 1][curr.y + 1]);
        }
        if(curr.x + 1 <= 20){
        neighbours.push(nodes[curr.x + 1][curr.y + 1]);
        }
    }
  
  return neighbours;
  
}

function heuristic(n){
    return dist(n.x, n.y, target.x, target.y);
}

function isInCloseSet(n){
    // let isInIt = false;
    // closedSet.forEach(function(cs){
    //     if(n.x == cs.x && cs.y == n.y) isInIt = true;
    // })
    // return isInIt;
    if(closedSet[n.x+"|"+n.y] == true){
        return true;
    }else{
        return false;
    }
}
function isInObstacle(n){
    // let isInIt = false;
    // obstacle.forEach(function(cs){
    //     if(n.x == cs.x && cs.y == n.y) isInIt = true;
    // })
    // return isInIt;
    if(n == null){
        return false;
    }
    if(obstacle[n.x+"|"+n.y] == true){
        return true;
    }else{
        return false;
    }
}


// interaction
function mouseClicked(){
    pos_x = ceil(mouseX / 20)-1;
    pos_y = ceil(mouseY / 20)-1;
    tambah_obstacle(pos_x, pos_y);

}
function mouseDragged() {
    pos_x = ceil(mouseX / 20)-1;
    pos_y = ceil(mouseY / 20)-1;
    tambah_obstacle(pos_x, pos_y);
    return false;
}
function tambah_obstacle(x,y){
    obstacle_c.push(new node(x,y));
    obstacle[x+"|"+y] = true;
}
function keyPressed(){
    if(keyCode == RETURN){
        aStar();
    }
}