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

  // Estado do progresso ativo/inativo
  const [started, setStarted] = React.useState(false);
  // Porcentagem de progresso
  const [progress, setProgress] = React.useState(0);
  // Tempo de transição do efeito de progresso
  const [transitionTime, setTransitionTime] = React.useState(15);
  // Opacidade do elemento
  const [opacity, setOpacity] = React.useState(1);

  // Hook utilizado para iniciar a animação, é feito dessa forma para aguardar o reset do progresso
  React.useEffect(() => {

    if (started && progress === 0) {
      setTransitionTime(15);
      setProgress(90);
    }

  }, [started, progress]);

  const startRequest = () => {
    // Verifica se já tem um progresso ativo
    if (started) {
      return null;
    }

    // Reseta o progresso e inicializa o estado
    setTransitionTime(0);
    setProgress(0);
    setOpacity(1)
    setStarted(true);
  };

  const finishRequest = () => {
    // Seta progresso no máximo e finaliza o estado
    setTransitionTime(1);
    setProgress(100);
    setOpacity(0)
    setStarted(false);
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
        {started ? "Loading..." : "Start Request"}
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
