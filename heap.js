class minHeap{
    constructor(){
        this.heap = [null];
    }
    getMin(){
        return this.heap[1];
    }
    getParent(child){
        return this.heap[Math.floor(child/2)];
    }
    insert(new_element){
        this.heap.push(new_element);
        this.doSwap();
    }
    remove(index){
        this.heap.splice(index,1);
        this.doSwap();
    }
    doSwap(){
        if(this.heap.length > 1){
            let current = this.heap.length - 1;
            while(current > 1){
                if(this.heap[Math.floor(current/2)] > this.heap[current]){
                    let parrent = this.heap[Math.floor(current/2)];
                    this.heap[Math.floor(current/2)] = this.heap[current];
                    this.heap[current] = parrent;
                }
                current = Math.floor(current/2);
            }
        }
    }

}

let data = new minHeap();
for (let i = 0; i < 10000000; i++) {
    data.insert(Math.floor(Math.random() * 10000));
}
console.log(data.heap);
console.log("smallest data : "+data.getMin());