import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function arraysEqual(arrayOne, arrayTwo){
    if (arrayOne.length !== arrayTwo.length) {
        return false;
    }
    for (var i = 0; i < arrayOne.length; i++){
        if (arrayOne[i] != arrayTwo[i]){
            return false;
        }
    }
    return true;
}
class Tile extends React.Component {
    constructor(props){
    super(props);
}
render(){
    let isFood = arraysEqual(this.props.food, [this.props.X, this.props.Y])
    ? "food"
    : "";
  let isSnake = arraysEqual(this.props.snake, [this.props.X, this.props.Y])
    ? "snake"
    : "";
  let className = `tile ${isSnake} ${isFood}`;
    return(
        <div className={className}>
            ({this.props.X},{this.props.Y})
        </div>
    );
}
}



class Grid extends React.Component {
render(){
    const grid = Array(this.props.size[0]).fill(Array(this.props.size[1]).fill(null));
    return(
        <div className="grid">
            {grid.map((gridX, IndexX) => {
                return (
                    <div className="grid-row">
                        {grid.map((gridY,IndexY) => {
                            return (
                                <Tile
                                X={IndexX}
                                Y={IndexY}
                                snake={this.props.snake}
                                food={this.props.food}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
  }
}
class Game extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        gridSize: [7,7],
        snake:[],
        food:[],
    };
}
getMiddleGrid(gridSize){
    let xSize = gridSize[0];
    let ySize = gridSize[1];
    let xMiddle = parseInt(xSize /2);
    let yMiddle = parseInt(ySize /2);
    return [xMiddle,yMiddle];
}
ComponentDidMount(){
    let middleCoordinates = this.getMiddleGrid(this.state.gridSize)
    this.set.State({snake: middleCoordinates});
}
render(){
    return (
        <>
        <Grid
        size={this.state.gridSize}
        snake={this.state.snake}
        food={this.state.food}
        />
        </>
    );
}
}
    
ReactDOM.render(<Game />, document.getElementById("root"));