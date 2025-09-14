import { Grid } from "smbls";

const getSquaresArray = () => {
  const squaresArray = [];

  for (let row = 1; row <= 15; row++) {
    for (let column = 1; column <= 30; column++) {
      squaresArray.push({
        isSelected: false,
        row: row,
        column: column,
      });
    }
  }

  const newSquaresArray = squaresArray.map((square, index) => {
    return { ...square, key: String(index) };
  });

  return newSquaresArray;
};

export const GridComponent = {
  extend: Grid,
  props: {
    grid: "mainLayout",
    gap: "A2",
    padding: "30px",
    borderRadius: "2px",
  },
  state: {
    selectedCoordinates: {
      row: "0",
      column: "0",
    },
    squares: getSquaresArray(),
  },

  header: {
    text: "Grid Selection",
    props: {
      fontFamily: "cursive",
      fontSize: "14px",
      fontWeight: "bold",
    },
  },

  Grid: (_element, state) => ({
    gap: "10px",
    rows: "repeat(15, 20px)",
    columns: "repeat(30, 20px)",
    children: state.squares,
    childrenAs: "state",

    childProps: (_el, st) => {
      const isSelected = state.squares.find(
        (square) => square.key === st.key
      )?.isSelected;

      return {
        background: isSelected ? "#3d7bd9" : "#e8f1ff",
        width: "25px",
        height: "25px",
        cursor: "pointer",
        borderRadius: "2px",
      };
    },

    onClick: (event, _element, state) => {
      const clickedSquare = state.squares.find(
        (square) => event.target.ref.key === square.key
      );

      if (!clickedSquare) return;

      const updatedSquares = state.squares.map((square) => {
        const isSquareSelected =
          square.row <= clickedSquare.row &&
          square.column <= clickedSquare.column;

        return {
          ...square,
          isSelected: isSquareSelected,
        };
      });

      const selectedCoordinates = {
        row: clickedSquare.row,
        column: clickedSquare.column,
      };

      requestAnimationFrame(
        state.update({
          squares: updatedSquares,
          selectedCoordinates: selectedCoordinates,
        })
      );
    },
  }),

  footer: {
    props: {
      display: "flex",
      justifyContent: "space-between",
    },

    coordinates: {
      Title: "Selection coordinates: ",
      span: {
        text: (_element, state) =>
          state.selectedCoordinates.column +
          "," +
          state.selectedCoordinates.row,
        props: {
          fontWeight: "bold",
        },
      },

      props: {
        fontSize: "12px",
        fontFamily: "cursive",
      },
    },

    totalCells: {
      Title: "Total cells selected: ",
      span: {
        text: (_element, state) =>
          state.selectedCoordinates.row * state.selectedCoordinates.column,
        props: {
          fontWeight: "bold",
        },
      },

      props: {
        fontSize: "12px",
        fontFamily: "cursive",
      },
    },
  },
};

export default {
  GridComponent,
};
