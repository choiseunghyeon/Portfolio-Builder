import { Button, Typography } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAccordion from "../components/CustomAccordion";
import Drag from "../components/Drag";
import DragAndDrop from "../components/DragAndDrop";
import { addTodo } from "../store/root";
const TestContainer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [text, setText] = useState("11");
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const handleTodo = () => {
    dispatch(addTodo({ completed: false, text: text }));
  };
  return (
    <>
      <Button onClick={handleTodo}>클릭</Button>
      <CustomAccordion title="프로필">
        {/* <Typography>123</Typography> */}
        {state.map(s => (
          <Typography key={s.text}>{s.text}</Typography>
        ))}
      </CustomAccordion>
      {winReady && <Drag />}
    </>
  );
};

export default TestContainer;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
