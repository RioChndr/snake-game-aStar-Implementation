class AStarAlgorithm {
    setSizeGrid(width, height) {
        this.gridWidth = width;
        this.gridHeight = height;
    }
    setObstacle(obst) {
        this.obstacle = obst;
    }
    setGrid(grid) {
        this.nodes = grid;
    }
    startSearch(startNode, endNode) {
        console.log(this.nodes);
        let openSet = new heapDataNode();
        let closeSet = [];
        openSet.insert(startNode);

        while (openSet.heap.length > 1) {
            let currentNode = openSet.getSmallestGScore();
            // let currentNode = nodes[nodeSmallest.x][nodeSmallest.y];


            openSet.remove(1);
            closeSet.push(currentNode);

            if (this.isSameNode(currentNode, endNode)) {
                return this.retraceNode(startNode, currentNode);
            }
            // console.log(openSet.heap);
            let neighbours = this.findNeighbours(currentNode);
            // console.log(neighbours);
            var _this = this;
            neighbours.forEach(function (neighbour) {
                // console.log(neighbour);
                if (_this.isInNode(closeSet, neighbour) == true || _this.isInNode(_this.obstacle, neighbour) == true) {
                    //continue
                    return;
                }

                let newCostToNeighbour = currentNode.gScore + _this.distanceNode(currentNode, neighbour);
                if (newCostToNeighbour < neighbour.gScore || _this.isInNode(openSet.heap, neighbour) == false) {
                    neighbour.gScore = newCostToNeighbour;
                    neighbour.hScore = _this.distanceNode(neighbour, endNode);
                    neighbour.fScore = neighbour.gScore + neighbour.hScore;
                    neighbour.parent = currentNode;
                    // nodes[neighbour.x][neighbour.y] = neighbour;
                    if (_this.isInNode(openSet.heap, neighbour) == false) {
                        openSet.insert(neighbour);
                    }
                }
            })
        }
        return false;
    }


    findNeighbours(curra) {

        let neighbours = [];

        let posNeighbours = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        for (let i = 0; i < posNeighbours.length; i++) {
            let posN = posNeighbours[i];
            let checkx = curra.x + posN[0];
            let checky = curra.y + posN[1];
            // console.log(`nodes : ${this.nodes[checkx][checky]}`)
            if (checkx >= 0 && checkx < this.gridWidth && checky >= 0 && checky < this.gridHeight) {
                neighbours.push(this.nodes[checkx][checky]);
            }
        }

        return neighbours;
    }

    isInNode(data_array, data) {
        for (let i = 0; i < data_array.length; i++) {
            const arr = data_array[i];
            if (arr == null) { continue };
            // console.log(data.x);
            if (arr.x == data.x && arr.y == data.y) {
                return true;
            }
        }
        return false;
    }
    distanceNode(node1, node2) {
        return dist(node1.x, node1.y, node2.x, node2.y);
    }
    isSameNode(node1, node2) {
        return node1.x == node2.x && node1.y == node2.y;
    }
    retraceNode(startNode, endNode) {
        let limit = 0;
        let truePath = [];
        let crnNode = endNode;
        console.log('done');
        console.log(endNode);
        while (crnNode.parent !== null) {
            limit++;
            if (limit >= 1000) {
                console.log('fuck no !');
                break;
            }
            truePath.push(crnNode);
            crnNode = crnNode.parent;
            console.log(crnNode);
        }
        truePath.reverse();
        return truePath;
    }

}    
