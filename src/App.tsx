import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.5vw;
  height: 30vh;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 4vw;
  height: 4vw;
  border-radius: 2vw;
  background-color: rgba(255, 255, 255, 1);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  padding: 10px;
  font-size: 24px;
  color: "rgba(50, 92, 255, 1)";
`;

const buttonVariants = {
  hover: {
    scale: 1.2,
    color: "rgba(252, 81, 61, 1)",
  },
};

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxHoverVariants = {
  hover: {
    scale: 1.1,
  },
  end: (n: string) => ({
    originX: n === "1" || n === "3" ? 1 : 0,
    originY: n === "1" || n === "2" ? 1 : 0,
  })
}

function App() {
  const [id, setId] = useState<null | string>(null);
  const [showing, setShowing] = useState(false);
  const switchCircle = () => setShowing((prev) => !prev);
  return (
    <div>
      <Wrapper>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <Box
              onClick={() => {setId(n)}} 
              custom={n}
              variants={boxHoverVariants}
              animate="end"
              layoutId={n}
              whileHover="hover"
              key={n}
            >
              {n === "2" && showing ? <Circle layoutId="circleSwap" /> : ""}
              {n === "3" && !showing ? <Circle layoutId="circleSwap" /> : ""}
            </Box>
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              variants={overlay}
              onClick={() => setId(null)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box 
                layoutId={id}
                style={{
                  width: "300px",
                  height: "300px", 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  transformOrigin: 
                    id === "1" 
                    ? "right bottom" 
                    : id === "2"
                    ? "left bottom"
                    : id === "3"
                    ? "right top"
                    : id === "4"
                    ? "right bottom"
                    : "",
                }}
              />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button  
          onClick={switchCircle}
          variants={buttonVariants}
          whileHover="hover"
        >
          Switch
        </Button>
      </div>
    </div>
  );
}
export default App;