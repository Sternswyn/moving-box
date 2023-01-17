import React from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";

export default function Container() {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);

  const refElementOne = useRef();
  const refElementTwo = useRef();
  const refElementThree = useRef();

  const [elementArray, setElementArray] = useState([]);

  /* When I mount my page, I want create the array of element for interact */
  const createArrayOfElement = () => {
    /*
      It doesn't work this way. 
      The array is empty after render. 
    */
/*     elementsArray.push(refElementOne.current.offsetLeft);
    elementsArray.push(refElementTwo.current.offsetLeft);
    elementsArray.push(refElementThree.current.offsetLeft); */

/*     elementsArray = [
      refElementOne.current.offsetLeft,
      refElementTwo.current.offsetLeft, 
      refElementThree.current.offsetLeft
    ] */

    /* You need set a State for don't lose the info */

    setElementArray([
      refElementOne.current.offsetLeft,
      refElementTwo.current.offsetLeft, 
      refElementThree.current.offsetLeft
    ])
  }

  useEffect(() => {
    // console.log("executing useEffect");
    createArrayOfElement();
  }, [refElementOne, refElementTwo, refElementThree]); // Condition the create to this changes of states. 

  /* When I click the button
  I want change de index and after do the effect of this change ... so
  */
  function changePosition() {
    setIndex((prevIndex) => prevIndex + 1);
  }

  /* Listen the change of state, and do the effects */
  useEffect(() => {
    // console.log("index ", index);
    // console.log("elementsArray ", elementArray);
    let coordinateX = elementArray[index];

    // console.log("Coordinate ", coordinateX)
    setBoxPosition((prevPosition) => {
      return {
        ...prevPosition,
        x: coordinateX,
      };
    });
  }, [index]);

  // console.log("render");

  return (
    <div className="container">
      <Box
        sx={{
          width: "150px",
          height: "150px",
          margin: "40px 0",
          backgroundColor: "blue",
          position: "absolute",
          transition: ".5s ease",
          borderRadius: "10px",
          zIndex: 10,
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        }}
      />

      <div className="area1">
        <h1 ref={refElementOne}>Element one</h1>
      </div>
      <div className="area2">
        <h1 ref={refElementTwo}>Element two</h1>
      </div>
      <div className="area3">
        <h1 ref={refElementThree}>Element three</h1>
      </div>

      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: "-84px",
        }}
        onClick={changePosition =() => index < elementArray.length ? setIndex((prevIndex) => prevIndex + 1) : setIndex(0) }
      >
        Change position
      </Button>
    </div>
  );
}