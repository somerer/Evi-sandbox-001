import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const startingRules = [
  { id: 1, name: 'Fill 24% Tax Bracket with Traditional IRA', detail: 'Use IRA withdrawals until the 24% bracket is full.' },
  { id: 2, name: 'Use Cash / Checking', detail: 'Use available cash reserves.' },
  { id: 3, name: 'Use PAL', detail: 'Borrow if needed after tax bracket target.' },
  { id: 4, name: 'Sell Taxable Investments', detail: 'Use taxable brokerage assets.' },
  { id: 5, name: 'Use Roth Accounts Last', detail: 'Preserve Roth for tax-free growth.' },
];

function App() {
  const [rules, setRules] = useState(startingRules);
  const [draggedId, setDraggedId] = useState(null);

  function moveRule(targetId) {
    if (!draggedId || draggedId === targetId) return;

    const dragged = rules.find((r) => r.id === draggedId);
    const withoutDragged = rules.filter((r) => r.id !== draggedId);
    const targetIndex = withoutDragged.findIndex((r) => r.id === targetId);

    const nextRules = [
      ...withoutDragged.slice(0, targetIndex),
      dragged,
      ...withoutDragged.slice(targetIndex),
    ];

    setRules(nextRules);
  }

  return (
    <div className="page">
      <aside className="sidebar">
        <div className="brand">◉ Evimero</div>
        <nav>
          <div>Dashboard</div>
          <div>People</div>
          <div>Accounts</div>
          <div>Income</div>
          <div>Expenses</div>
          <div className="active">Priority Strategies</div>
          <div>Scenarios</div>
          <div>Charts</div>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Priority Strategies › Edit Strategy</div>
            <h1>Create / Edit Priority Strategy</h1>
            <p>Drag rules to reorder how Evimero funds spending needs.</p>
          </div>
          <button>Save Strategy</button>
        </header>

        <section className="layout">
          <div className="library">
            <h3>Strategy Library</h3>
            <div className="strategy selected">Default Strategy<br /><span>2026–9999</span></div>
            <div className="strategy">Remodel Years<br /><span>2030–2035</span></div>
            <div className="strategy">RMD Phase<br /><span>2036–2045</span></div>
          </div>

          <div className="editor">
            <div className="form-row">
              <div>
                <label>Strategy Name</label>
                <div className="fake-input">Default Strategy</div>
              </div>
              <div>
                <label>Year Range</label>
                <div className="fake-input">2026 – 9999</div>
              </div>
            </div>

            <h3>Priority Order</h3>

            <div className="rules">
              {rules.map((rule, index) => (
                <div
                  key={rule.id}
                  className="rule"
                  draggable
                  onDragStart={() => setDraggedId(rule.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => moveRule(rule.id)}
                >
                  <div className="grab">⋮⋮</div>
                  <div className="rank">{index + 1}</div>
                  <div>
                    <strong>{rule.name}</strong>
                    <p>{rule.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hint">
              Each year, if expenses exceed income, Evimero follows this priority order until the shortfall is covered.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);