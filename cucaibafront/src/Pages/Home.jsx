import "../assets/styles/style.css";
import Notificacion from "../components/UI/LandingNotificacion.jsx";

export const Home = () => {
  return (
    <div className="container-fluid container-lg  pb-5 mt-10">
      <div className="titulo-principal py-3 py-lg-5 d-flex align-items-center mb-3">
        <div>
          <span className="fa-stack fa-2x">
            <i className="far fa-circle fa-stack-2x text-info"></i>
            <i className="fas fa-hospital-symbol fa-stack-1x text-muted"></i>
          </span>
        </div>
        <div>
          <h4 className="font-weight-bold text-muted text-uppercase mb-0">
            Honorarios CUCAIBA
          </h4>
          <h5 className="text-info mb-0">Bienvenidos</h5>
        </div>
      </div>
      <div className="notificacion" style={{ marginBlockEnd: "0px" }}>
        <Notificacion />
      </div>
    </div>
  );
};
