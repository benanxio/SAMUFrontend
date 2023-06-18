import { ProgressBar } from "primereact/progressbar";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#ffffff", // Color de fondo de la pantalla de carga
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ width: "200px" }}>
        <img className="mb-3" src="https://www.onsv.gob.pe/img/logosamu.jpg" alt="" />

        <ProgressBar
          mode="indeterminate"
          style={{ height: "3px",background:"white" }}
         color="red" 
                  
        ></ProgressBar>
      </div>
    </div>
  );
};

export default LoadingScreen;
