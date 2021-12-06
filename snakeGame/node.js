
function node(i,j){
    this.x = i;
    this.y = j;
    this.gScore;
    this.hScore;
    this.fScore;
    this.skala = 20;
    this.parent = null;
    this.show = function(){
        fill(217, 217, 217);
        square(this.x * this.skala, this.y * this.skala, this.skala );
    }
    this.customShow = function(color){
        fill(color);
        square(this.x * this.skala, this.y * this.skala, this.skala );
    }
    
}