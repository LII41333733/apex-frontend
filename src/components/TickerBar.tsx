const TickerBar: React.FC = () => {
  return (
    <div id="ticker-bar" className="mt-2">
      <hr />
      <section>
        <span className="green">▲ SPY 563.68 +5.33</span>
        <span className="red">▼ QQQ 563.68 +5.33</span>
        <span className="green">▲ IWM 563.68 +5.33</span>
      </section>
      <hr />
    </div>
  );
};

export default TickerBar;
