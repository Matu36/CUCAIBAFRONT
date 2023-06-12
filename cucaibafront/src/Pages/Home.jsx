import "../assets/styles/style.css"

export const Home = () => {
  return (
    <div className="container-fluid container-lg my-3 my-lg-5 pb-5 mt-10">
    <div className="titulo-principal d-flex align-items-center mb-3">
        <div>
            <span className="fa-stack fa-2x">
              <i className="far fa-circle fa-stack-2x text-info"></i>
              <i className="fas fa-hospital-symbol fa-stack-1x text-muted"></i>
            </span>
        </div>
        <div>
            <h4 className="font-weight-bold text-muted text-uppercase mb-0">Ablaciones</h4>
            <h6 className="text-info mb-0">Bienvenido Cacho
            </h6>
        </div>
    </div>

</div>
  )
}
