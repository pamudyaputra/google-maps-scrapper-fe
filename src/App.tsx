import { useState, useEffect } from "react";
import scrapped from "./data/data.json";

function App() {
  const [type, setType] = useState("attraction");
  const [pageTotal, setPageTotal] = useState(0);
  const [pageActive, setPageActive] = useState(0);
  const [data, setData] = useState(scrapped);

  const handlePageClick = (i: number) => {
    setPageActive(i)

    let temp: ;

    for(let i = (pageActive - 1 ) * 10; i < pageActive * 10; i++) {
      temp += data[i]
    }

    setData(data.slice((pageActive -1) * 10, pageActive * 10))

    console.log(data)
  }

  useEffect(() => {
    const filteredScrapped = scrapped.filter((r) => {
      return r.type === type;
    });

    setPageTotal(Math.ceil(filteredScrapped.length/10))

    setData(filteredScrapped);

    console.log(pageTotal);
    
  }, [type]);

  return (
    <>
      <div className="flex flex-col h-full">
        <nav className="navbar flex">
          <div className="navbar-start">
            <a href="#" className="text-4xl">
              Gmaps Scrapper
            </a>
          </div>
          <div className="navbar-end">
            <ul className="flex">
              <li className="text-2xl mr-8">
                <a
                  href="#"
                  onClick={() => {
                    setType("restaurant");
                  }}
                >
                  Restaurants
                </a>
              </li>
              <li className="text-2xl">
                <a
                  href="#"
                  onClick={() => {
                    setType("attraction");
                  }}
                >
                  Attractions
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex flex-col w-full">
          <div className="flex justify-between my-4">
            <div>
              <div className="join">
                {
                  [...Array(pageTotal)].map((e,i) => {
                    return (
                      <button className={`join-item btn ${pageActive === i+1 ? "btn-active" : ""}`} onClick={() => {handlePageClick(i)}}>{i+1}</button>
                    )
                  })
                }
              </div>
            </div>
            <p>search</p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Rrating</th>
                <th>Reviews</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Address</th>
                <th>Last Fetched</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((r) => {
                return (
                  <tr>
                    <td>{r.title}</td>
                    <td>{r.main_category}</td>
                    <td>{r.rating}</td>
                    <td>{r.reviews}</td>
                    <td>{r.latitude}</td>
                    <td>{r.longitude}</td>
                    <td>{r.address}</td>
                    <td>{r.last_fetched}</td>
                  </tr>
                );
              })} */
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
