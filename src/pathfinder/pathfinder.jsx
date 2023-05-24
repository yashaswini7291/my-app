import React, { Component } from "react";
import Node from ".//node";
import { dijkstra, shortestpath } from "../algo/dijkstra";
import "./pathfinder.css";

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 49;

export default class pathfinder extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            grid: [],
            is_mouse_pressed: false
        };
    }

componentDidMount() {
    const grid = get_initial_grid();
    this.setState({ grid });
  }
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, is_mouse_pressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.is_mouse_pressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ is_mouse_pressed: false });
  }
  animateDijkstra(inordernodes, shortestpatharray) {
    for (let i = 0; i <= inordernodes.length; i++) {
      if (i === inordernodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestpatharray);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = inordernodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  animateShortestPath(shortestpatharray) {
    for (let i = 0; i < shortestpatharray.length; i++) {
      setTimeout(() => {
        const node = shortestpatharray[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startnode = grid[START_NODE_ROW][START_NODE_COL];
    const finishnode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const inordernodes = dijkstra(grid, startnode, finishnode);
    const shortestpatharray = shortestpath(finishnode);
    this.animateDijkstra(inordernodes, shortestpatharray);
  }
  render() {
    const { grid } = this.state;
    // console.log(nodes);
    return (
      <>
        <button class="button2" onClick={() => window.location.reload()}>
          Clear screen
        </button>
        <button class="button1" onClick={() => this.visualizeDijkstra()}>
          Visualize dijkstra
        </button>
        <h2> create walls using mouse</h2>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    col,
                    is_start,
                    is_finish,
                    wall,
                    onMouseDown,
                    onMouseEnter,
                    onMouseUp,
                    row
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      is_start={is_start}
                      is_finish={is_finish}
                      wall={wall}
                      //mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

  const get_initial_grid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentrow = [];
      for (let col = 0; col < 50; col++) {
        currentrow.push(create_node(col, row));
      }
      grid.push(currentrow);
    }
    return grid;
  };
  const create_node = (col, row) => {
    return {
      col,
      row,
      is_start: row === START_NODE_ROW && col === START_NODE_COL,
      is_finish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      visited: false,
      wall: false,
      parent: null
    };
  };
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      wall: !node.wall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };