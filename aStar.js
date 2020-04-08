
function A_star(startNode, endNode){
    let openSet = new heapDataNode();
    let closeSet = [];
    openSet.insert(startNode);

    while(openSet.heap.length > 1){
        let currentNode = openSet.getSmallestGScore();
        // let currentNode = nodes[nodeSmallest.x][nodeSmallest.y];
        

        openSet.remove(1);
        closeSet.push(currentNode);

        if(isSameNode(currentNode, endNode)){
            retraceNode(startNode, currentNode);
            return;
        }
        console.log(openSet.heap);
        let neighbours = findNeighbours(currentNode);
        console.log(neighbours);
        neighbours.forEach(function(neighbour){
            // console.log(neighbour);
            if(isInNode(closeSet, neighbour) == true || isInNode(obstacle_c, neighbour) == true){
                //continue
                return;
            }

            let newCostToNeighbour = currentNode.gScore + distanceNode(currentNode, neighbour) ;
            if(newCostToNeighbour < neighbour.gScore || isInNode(openSet.heap, neighbour) == false){
                neighbour.gScore = newCostToNeighbour;
                neighbour.hScore = distanceNode(neighbour, endNode);
                neighbour.fScore = neighbour.gScore + neighbour.hScore;
                neighbour.parent = currentNode;
                // nodes[neighbour.x][neighbour.y] = neighbour;
                if(isInNode(openSet.heap, neighbour) == false){
                    openSet.insert(neighbour);
                }
            }
        })
    }
}


function heuristic(n){
    return dist(n.x, n.y, targetNode.x, targetNode.y);
}


function findNeighbours(curra){

    let neighbours = [];
    
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if(i == 0 && j == 0){
                continue;
            }
            // if(i == j){
            //     continue;
            // }

            let checkx = curra.x + i;
            let checky = curra.y + j;
            
            if(checkx >= 0 && checkx < 20 && checky >= 0 && checky < 20){
                neighbours.push(nodes[checkx][checky]);
            }
            
        }
        
    }
    
    return neighbours;
    
  }

function isInNode(data_array, data){
    for (let i = 0; i < data_array.length; i++) {
        const arr = data_array[i];
        if(arr == null) { continue};
        // console.log(data.x);
        if(arr.x == data.x && arr.y == data.y){
            return true;
        }
    }
    return false;
}
function distanceNode(node1, node2){
    return dist(node1.x, node1.y, node2.x, node2.y);
}
function isSameNode(node1, node2){
    return node1.x == node2.x && node1.y == node2.y;
}
function retraceNode(startNode, endNode){
    let limit = 0;
    let crnNode = endNode;
    console.log('done');
    console.log(endNode);
    while(crnNode.parent !== null){
        limit++;
        if(limit >= 1000) {
            console.log('fuck no !');
            break; 
        }
        truePath.push(crnNode);
        crnNode = crnNode.parent;
        console.log(crnNode);
    }
}