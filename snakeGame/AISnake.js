
class AISnake{
    constructor(screenWidth, screenHeight){
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.pathToFood = [];
        this.isRun = false;
        this.bodySnake = [];
        this.grid = [];
        this.step = 0;
    }

    /**
     * 
     * @param {array} bodySnake Badan ular berupa array
     */
    setBodySnake(bodySnake){
        this.bodySnake = bodySnake;
    }
    setFoodPos(foodPos){
        this.foodPos = new node(foodPos.x, foodPos.y);
    }
    setHeadSnake(headSnake){
        this.headSnake = new node(headSnake.x, headSnake.y);
    }

    setGrid(){
        if(this.grid.length > 0) return;
        for (let i = 0; i < this.screenHeight; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.screenWidth; j++) {
                this.grid[i][j] = new node(i,j);
            }
            
        }
    }


    /**
     * fungsi untuk mencari pola makanan
     * @param {Obj Class Node} startNode posisi pencarian makanan (kepala ular)
     * @param {Obj Class Node} endNode Posisi makanan(makanan)
     */
    findPath(){
        if(this.pathToFood.length > 0){
            return;
        }
        this.step = 0;
        var aStar = new AStarAlgorithm();
        this.setGrid();
        aStar.setSizeGrid(this.screenWidth, this.screenHeight);
        aStar.setGrid(this.grid);
        aStar.setObstacle(this.bodySnake);
        this.pathToFood = aStar.startSearch(this.headSnake, this.foodPos);
        if(this.pathToFood == false){
            return false;
        }
    }
    
    nextStep(){
        let nextPath = this.pathToFood[0];
        let arah = {
            x : nextPath.x - this.headSnake.x,
            y : nextPath.y - this.headSnake.y
        };
        this.pathToFood.shift();
        return arah;
    }

}