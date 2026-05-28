import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/people')
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  return (
    <div className="app">
      <div className="header">
        <div>
          <div className="eyebrow">EVIMERO</div>
          <h1>People</h1>
        </div>

        <button>Add Person</button>
      </div>

      <div className="card-grid">
        {people.map((p) => (
          <div className="card" key={p.id}>
            <div className="avatar">{p.name[0]}</div>
            <h2>{p.name}</h2>
            <p>{p.role}</p>
            <div className="meta">Age {p.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);