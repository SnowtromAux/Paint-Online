//Commections
let socket = io();
const URL = 'http://localhost:3000';

//Party Configuration
const MIN_PLAYER_NUMBER = 1;
const MAX_PLAYER_NUMBER = 10;

//Colors Configuration
const STARTING_COLORS = [
    "#800080",
    "#0000FF",
    "#FFC0CB",
    "#FF0000",
    "#FFA500",       
    "#FFFF00",
    "#008000",
    "#A52A2A",
    "#000000",
    "#FFFFFF",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
  ];
  

//Canvas Constants
const C_WIDTH = 400;
const C_HEIGHT = 300;

const LINE_SIZE = [1 , 2 , 4 , 8];

const DASH_LENGTH = 5;
const GAP_LENGTH = 5;

const PEN_THICKNESS = 1;
const BRUSH_THICKNESS = 3;
const RUBBER_THICKNESS = 5;


const NONE = "none";
const PEN = "pen";
const COLOR_PICKER = "color-picker";
const RUBBER = "rubber";
const TEXT = "text";
const BUCKET = "paint-bucket";
const SELECT = "select";

const BRUSH = "brush";
const SPRAY = "spray";

const LINE = "line";
const CIRCLE = "circle";
const TRIANGLE = "triangle";
const RECTANGLE = "rectangle";
const CURVED_LINE = "curved-line";
const CUSTOM_SHAPE = "polygon";


const game_canvas = document.getElementById("gameCanvas");
const game_ctx = game_canvas?.getContext("2d");