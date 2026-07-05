import "./Loader.css";
import busImage from "../../assets/images/school-bus.jpg";

export default function Loader() {
  return (
    <div className="loader-container">

      <div className="bus-wrapper">

        {/* Loading text on bus */}
        <div className="bus-text">
          Prakash Public School
        </div>

        <div className="bus-image-wrapper">
          <img
            src={busImage}
            alt="School Bus"
            className="bus-image"
          />
        </div>

        <div className="wheel front-wheel"></div>
        <div className="wheel back-wheel"></div>
        

      </div>

    </div>
  );
}
