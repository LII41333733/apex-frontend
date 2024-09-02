const OpenPositionPlaceholder: React.FC = () => {
  return (
    <div className="position mb-5">
      <div className="text-column column">
        <div className="text-top">SPY 565C 9/4</div>
        <div className="text-bottom text-xs">
          <span className="text-bottom-label font-normal">Cons</span>
          <span className="text-bottom-value mx-1">5000</span>
          <span className="text-bottom-label font-normal">Avg</span>
          <span className="text-bottom-value mx-1">2.30</span>
          <span className="text-bottom-label font-normal">Last</span>
          <span className="text-bottom-value ml-1">6.80</span>
        </div>
      </div>
      <div className="pl-column text-trade-green column">+$33000</div>
      <div className="perc-column text-trade-red column">-100%</div>
    </div>
  );
};

export default OpenPositionPlaceholder;
