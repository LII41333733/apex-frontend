const TickerBar: React.FC = () => {
  return (
    <div id="ticker-bar" className="mt-2">
      <hr />
      <section>
        <span>▲ SPY 563.68 +5.33</span>
        <span>▼ QQQ 563.68 +5.33</span>
        <span>▲ IWM 563.68 +5.33</span>
      </section>
      <hr />
    </div>
  );
};

export default TickerBar;
