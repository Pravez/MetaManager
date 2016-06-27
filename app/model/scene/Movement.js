
var equation;

class Movement{
    static defineRectilignMovement(v0, x0){
        equation = function(t){ return v0*t+x0; };
    }

    static getPositionAt(t){
        return equation(t);
    }
}