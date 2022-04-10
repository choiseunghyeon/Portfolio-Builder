import { Button, Typography } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Block from "../components/setup/blocks/Block";
import Drag from "../components/Drag";
import { handleItemValue } from "../store/root";
const SetupContainer = () => {
  const blocks = useSelector(state => state.blocks);
  const dispatch = useDispatch();
  // const [text, setText] = useState("11");
  const handleField = useCallback(
    (blockId, fieldId, valueId, value: any): void => {
      const payload = {
        blockId,
        fieldId,
        valueId,
        value,
      };
      dispatch(handleItemValue(payload));
    },
    [dispatch]
  );
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  // const handleTodo = () => {
  //   dispatch(addTodo({ completed: false, text: text }));
  // };
  return (
    <>
      {/* <Button onClick={handleTodo}>클릭</Button> */}
      {winReady && <Drag blocks={blocks} handleField={handleField} />}
    </>
  );
};

export default SetupContainer;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
