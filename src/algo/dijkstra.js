export function dijkstra(grid,startnode,finishnode)
{
    const inordernodes=[];
    startnode.distance=0;
    const unvisitednodes=getnodes(grid);
    while(!!unvisitednodes.length)
    {
        sortnodes(unvisitednodes);
        const nearestnode=unvisitednodes.shift();
        if(nearestnode.wall) continue;
        if(nearestnode.distance===Infinity) return inordernodes;
        nearestnode.visited=true;
        inordernodes.push(nearestnode);
        if(nearestnode===finishnode) return inordernodes;
        update_unvisited(nearestnode,grid);
    }
}
function sortnodes(unvisitednodes) {
    unvisitednodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  function update_unvisited(node, grid) {
    const unvisited = get_unvisited_neighbors(node, grid);
    for (const adjacent of unvisited) {
      adjacent.distance = node.distance + 1;
      adjacent.parent = node;
    }
  }
  function get_unvisited_neighbors(node, grid) {
    const adjacents= [];
    const { col, row } = node;
    if (row > 0) adjacents.push(grid[row - 1][col]);
    if (row < grid.length - 1) adjacents.push(grid[row + 1][col]);
    if (col > 0) adjacents.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) adjacents.push(grid[row][col + 1]);
    return adjacents.filter(adjacent => !adjacent.visited);
  }
  function getnodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  export function shortestpath(finishnode) {
    const shortestpatharray= [];
    let currentnode = finishnode;
    while (currentnode !== null) {
      shortestpatharray.unshift(currentnode);
      currentnode = currentnode.parent;
    }
    return shortestpatharray;
  }
  