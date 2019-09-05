import * as d3 from 'd3';

const initialState = {
  graphTransform: d3.zoomIdentity,
  graphFidelity: 'high',
  mouseMode: 'move',
  drawerOpen: false,
  machineClasses: [],
  selectedMachine: null,
  openModals: 0,
  graphSourceNode: null,
  graphData: {
    edges: [],
    nodes: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GRAPH_DATA':
      const newNodes = new Set(action.payload.nodes);
      return {
        ...state,
        graphData: Object.assign({}, action.payload),
        //unset the graph source node if it has been deleted
        graphSourceNode: newNodes.has(state.graphSourceNode)
          ? state.graphSourceNode
          : null
      };
    case 'SET_GRAPH_TRANSFORM':
      return {
        ...state,
        graphTransform: action.payload
      };
    case 'SET_GRAPH_FIDELITY':
      return {
        ...state,
        graphFidelity: action.payload
      };
    case 'SET_MOUSE_MODE':
      return {
        ...state,
        mouseMode: action.payload
      };
    case 'SET_DRAG_START':
      return {
        ...state,
        dragStart: action.payload
      };
    case 'SET_DRAG_CURRENT':
      return {
        ...state,
        dragCurrent: action.payload
      };
    case 'SET_MACHINE_CLASSES':
      return {
        ...state,
        machineClasses: action.payload
      };
    case 'SET_SELECTED_MACHINE':
      return {
        ...state,
        selectedMachine: action.payload
      };
    case 'ADD_OPENED_MODAL_NODES':
      return {
        ...state,
        openModals: state.openModals + 1
      };
    case 'CLOSE_OPENED_MODAL_NODES':
      return {
        ...state,
        openModals: state.openModals - 1
      };
    case 'SET_GRAPH_SOURCE_NODE':
      return {
        ...state,
        graphSourceNode: action.payload
      };
    default:
      return state;
  }
};
