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

export const Solution = () => {

  // A state variable to track if the progress is started or not.
  const [progressState, setProgressState] = React.useState(false);
  // A state variable to track the progress percentage.
  const [progress, setProgress] = React.useState(0);
  // A state variable to track the transition time for the progress effect.
  const [transition, setTransition] = React.useState({ duration: 0 });
  // A state variable to track the opacity of the element.
  const [opacity, setOpacity] = React.useState(1);
  // Switch to enable/disable using breakPoints
  const [breakPointEnabled, setBreakPointEnabled] = React.useState(false)
  // Array of interruption points
  const [breakPointList, setBreakPointList] = React.useState([])
  // ID of interruptionPoint
  const [breakPointID, setBreakPointID] = React.useState(-1)


  // Hook used to start animation. This hook is used to wait the progress reset
  React.useEffect(() => {
    let timer;

    if (progressState) {
      if (!breakPointEnabled) {
        setTransition({ delay: 0, duration: 15 });
        setProgress(90);
      } else if (breakPointID !== -1) {
        const { percent, duration } = breakPointList[breakPointID]

        setTransition({ duration });
        setProgress(percent);

        if (breakPointList.length - 1 > breakPointID) {
          timer = setTimeout(() => {
            setBreakPointID(v => v + 1)
          }, duration * 1000)
        }
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [progressState, breakPointID, breakPointList, breakPointEnabled]);

  const startRequest = () => {
    // Validade if has any active progress 
    if (progressState) {
      return;
    }

    if (breakPointEnabled && breakPointList.length === 0) {
      alert("Enter a valid list of breakpoints!");
      return;
    }

    // Reset progress and set progress state to true
    setTransition({ duration: 0 });
    setProgress(0);
    setOpacity(1)
    setBreakPointID(0)
    setProgressState(true);
  };

  const finishRequest = () => {
    if (!progressState) {
      return;
    }

    // Set progress to max and finish the state
    setTransition({ duration: 1 });
    setProgress(100);
    setOpacity(0)
    setProgressState(false);
  };

  const setBreakpoints = (e) => {
    // remove al non number and comma
    const value = e.target.value.replace(/[^0-9,]/g, "")
    e.target.value = value

    const breakpoints = value.split(",")
      .map(v => {
        const breakPercent = +v.trim() || 0
        return {
          percent: breakPercent,
          duration: Math.random() * (breakPercent / 10)
        }
      }) // set percent and random duration based on the current percentage 
      .filter(v => v.percent > 0 && v.percent < 90) // remove invalids percentages values and value over 90
      .sort((a, b) => a.percent - b.percent) // sort by percent value
    breakpoints.push({ percent: 90, duration: 3 }) // set the final percentage to always break at 90%

    setBreakPointID(-1)
    setBreakPointList(breakpoints)
  }

  const toogleBreakpoint = () => {
    finishRequest()
    setBreakPointEnabled(v => !v)
  }

  return (
    <div className="progress-bar-exercice">
      <div
        data-testid="progress-bar"
        className="progress-bar"
        style={{
          transitionProperty: `width, opacity`,
          transitionDuration: `${transition.duration}s, ${!opacity ? 1 : 0}s`,
          transitionTimingFunction: "ease-in-out, ease-in",
          transitionDelay: `0s, ${!opacity ? 2 : 0}s`,
          width: progress + "%",
          opacity,
        }}
      ></div>


      <div className="button-container">
        <button
          style={{
            cursor: progressState ? "not-allowed" : "pointer"
          }}
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
      </div>


      <div className="breakpoint-container">

        <label>
          Use Breakpoints
          <input
            disabled={progressState}
            type="checkbox" checked={breakPointEnabled}
            onChange={toogleBreakpoint} />
        </label>

        {breakPointEnabled &&
          <input
            placeholder="0, 20, 40, 60, 90..."
            disabled={progressState}
            onChange={setBreakpoints}
          />}

      </div>

    </div >
  );
};
