var cols = 20;
var rows = cols;
var nodes = [];
var skala = 20;
var startNode;
var targetNode;
var obstacle_c =[];
var obstacle = {};
var pathToTarget = [];
var findingFunction;
var truePath = [];


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

    findingFunction = new AStarAlgorithm();
    findingFunction.setSizeGrid(skala, skala);
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
    displayNode(truePath, color(100,100,0));
}

function displayNode(thisNode, color){
    for (let i = 0; i < thisNode.length; i++) {
        const n = thisNode[i];
        n.customShow(color);
    }
}
