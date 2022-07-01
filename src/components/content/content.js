import styles from "./content.module.css";
import { useEffect, useState } from "react";

const GeoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 64 64"
    className={styles.icon}
    onClick={() => props.onClick()}
  >
    <g id="Glyph_copy_2">
      <path d="M31.995,63.996l4.109-5.375c4.289-5.678,18.282-25.024,18.282-35.601C54.387,9.253,45.391,0.004,32,0.004   S9.613,9.253,9.613,23.021c0,11.39,16.432,33.166,18.301,35.605L31.995,63.996z M17.862,23.162c0-7.771,6.342-14.094,14.138-14.094   s14.138,6.323,14.138,14.094S39.796,37.256,32,37.256S17.862,30.934,17.862,23.162z" />
    </g>
  </svg>
);

const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    viewBox="0 0 50 50"
    className={styles.icon}
    onClick={() => props.onClick()}
  >
    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
  </svg>
);

export const Content = () => {
  const [data, setData] = useState({});
  const [faded, setFaded] = useState(false);

  async function getData(lat, lon) {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0df5d2477ef429b2414a9e052a0040f9`
      ).then((res) => res.json());
      setFaded(false);
      setData(data);
    } catch (e) {
      alert("An error occurred, please try again later.");
    }
  }

  async function updateData() {
    setFaded(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => await getData(pos.coords.latitude, pos.coords.longitude),
      async () => await getData(51, 0)
    );
  }

  async function search() {
    const city = prompt("Enter your city name (you can write on any language)");
    if (!city) return;
    setFaded(true);
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0df5d2477ef429b2414a9e052a0040f9&units=metric`
    ).then((res) => res.json());
    if (data.cod !== "404") {
      setData(data);
      setFaded(false);
    } else {
      setFaded(false);
      alert("Unknown city");
    }
  }

  useEffect(() => {
    async function use() {
      await updateData();
    }
    use();
  }, []);
  return (
    <div className={`${styles.wrap} ${faded && styles.faded}`}>
      {data?.main ? (
        <>
          <div className={styles.temperature_block}>
            <h1 className={styles.temperature}>
              {data.main.temp.toFixed(0)}
              <span style={{ fontSize: "30px" }}>℃</span>
            </h1>
            <p className={styles.geo}>
              {data.name}, {data.sys.country} <GeoIcon onClick={updateData} />{" "}
              <SearchIcon onClick={search} />
            </p>
          </div>
          <div className={styles.info_block}>
            <div>
              <p>
                Feels like <span>{data.main.feels_like.toFixed(0)} ℃</span>
              </p>
              <p>
                Wind speed <span>{data.wind.speed} M/S</span>
              </p>
            </div>
            <div>
              <p>
                Pressure <span>{data.main.pressure} hPa</span>
              </p>
              <p>
                Humidity <span>{data.main.humidity}%</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
};
