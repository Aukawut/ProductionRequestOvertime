import React from "react";
import animationData from "../../assets/json/loading/animate-02.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFoundAnimate: React.FC = () => {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isClickToPauseDisabled
      />
      <Link to="/" className="text-[14px] underline">Go to Home</Link>
    </div>
  );
};

export default NotFoundAnimate;
