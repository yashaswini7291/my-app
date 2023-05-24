import React, { Component } from "react";

import "./node.css";

export default class node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render()
  {
    const
    {
      col,
      is_start,
      is_finish,
      wall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row
    }=this.props;
    const extraClassName = is_finish
    ? "node-finish"
    : is_start
    ? "node-start"
    : wall
    ? "node-wall"
    : "";
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      />
    );
   }
  }
  export const default_node = {
    row: 0,
    col: 0
  };
  