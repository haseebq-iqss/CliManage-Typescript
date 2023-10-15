import React from "react";
import { motion, MotionProps } from "framer-motion";

interface FadeInAnimatorProps extends MotionProps {
  children: React.ReactNode;
  time: number;
  delay?: number;
  repeating?: boolean;
  style?: any;
}

const FadeInAnimator: React.FC<FadeInAnimatorProps> = ({
  children,
  time,
  delay,
  repeating = false,
}) => {
  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: time,
        delay: delay || 0,
        repeat: repeating === true ? Infinity : 0,
        repeatDelay: time,
      }}
    >
      {children}
    </motion.div>
  );
};

const SlideInAnimator: React.FC<FadeInAnimatorProps> = ({
  children,
  time,
  delay,
  style
}) => {
  return (
    <motion.div
      layout="size"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: time, delay: delay || 0 }}
      style={style ? {...style} : { width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export { FadeInAnimator, SlideInAnimator };
