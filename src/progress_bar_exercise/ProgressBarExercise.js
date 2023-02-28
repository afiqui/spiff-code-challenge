import React from "react";
import Exercise from "../exercise/Exercise";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {

  // A state variable to track if the progress is started or not.
  const [progressState, setProgressState] = React.useState(false);
  // A state variable to track the progress percentage.
  const [progress, setProgress] = React.useState(0);
  // A state variable to track the transition time for the progress effect.
  const [transitionTime, setTransitionTime] = React.useState(15);
  // A state variable to track the opacity of the element.
  const [opacity, setOpacity] = React.useState(1);

  // Hook used to start animation. This hook is used to wait the progress reset
  React.useEffect(() => {

    if (progressState && progress === 0) {
      setTransitionTime(15);
      setProgress(90);
    }

  }, [progressState, progress]);

  const startRequest = () => {
    // Validade if has any active progress 
    if (progressState) {
      return null;
    }

    // Reset progress and set progress state to true
    setTransitionTime(0);
    setProgress(0);
    setOpacity(1)
    setProgressState(true);
  };

  const finishRequest = () => {
    // Set progress to max and finish the state
    setTransitionTime(1);
    setProgress(100);
    setOpacity(0)
    setProgressState(false);
  };


  return (
    <div className="progress-bar-exercice">
      <div
        data-testid="progress-bar"
        className="progress-bar"
        style={{
          transitionProperty: `width, opacity`,
          transitionDuration: `${transitionTime}s, ${!opacity ? 1 : 0}s`,
          transitionTimingFunction: "ease-in-out, ease-in",
          transitionDelay: `0s, ${!opacity ? 2 : 0}s`,
          width: progress + "%",
          opacity,
          background: `linear-gradient(90deg, orange, red)`,
        }}
      ></div>
      <button
        className="button button-request"
        onClick={startRequest}
      >
        {progressState ? "Loading..." : "Start Request"}
      </button>
      {
        progress !== 0 && progress !== 100 && (
          <button
            className="button button-finish"
            onClick={finishRequest}
          >
            Finish Request
          </button>
        )
      }
    </div >
  );
};
