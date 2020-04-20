const Background = () => (
  <div className="background">
    <style jsx>{`
      .background {
        background-image: url('/static/back.png');
        width: 100%;
        height: 100%;
        position: fixed;
        background-size: cover;
      }
    `}</style>
  </div>
);

export default Background;
