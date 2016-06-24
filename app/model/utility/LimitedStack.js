"use strict";


class StackNode{

    constructor(value, after){
        this._value = value;
        this._before = undefined;
        if(after)
            after._before = this;
    }
}

class LimitedStack{

    constructor(size, firstValue){
        this._size = size;
        this._elements = 1;

        this._head = new StackNode(firstValue, undefined);
        this._tail = this._head;
    }

    add(value){
        if(this._elements >= this._size){
            this._tail = this._tail._before;
        }else{
            this._elements += 1;
        }

        this._head = new StackNode(value, this._head);
    }

    head(){
        return this._head._value;
    }

    get(position){
        if(position < this._size) {
            var current = this._tail;
            for (let i = 0; i < (this._size - position); i++) {
                current = current._before;
            }

            return current._value;
        }else{
            throw "Not in array";
        }
    }
}
module.exports = LimitedStack;