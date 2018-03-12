import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLanguage } from '../store/index';

class Info extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    console.log(window.scrollY);
  }

  changeLanguage = () => {
    this.props.setLanguage(this.props.language == 'es' ? 'en' : 'es');
  };

  render = () => {
    const { lng: resources, language } = this.props;

    return (
      <div>
        <div className="infoPage">
          <div className="infoContainer">
            <div className="infoBig Left">{resources[language]['info1']}</div>
            <div className="infoBig Right">{resources[language]['info2']}</div>
            <div
              className="infoBig Left"
              dangerouslySetInnerHTML={{ __html: resources[language]['info3'] }}
            />
            <div
              className="infoBig Right"
              dangerouslySetInnerHTML={{ __html: resources[language]['info4'] }}
            />
            <div className="infoBig Left">{resources[language]['info5']}</div>
            <div
              className="infoBig Right"
              dangerouslySetInnerHTML={{ __html: resources[language]['info6'] }}
            />
            <div className="infoBig Left">{resources[language]['info7']}</div>
          </div>
        </div>
        <div onClick={this.changeLanguage} className="language">
          {language == 'en' ? 'es' : 'en'}
        </div>
        <style jsx>{`
          .infoPage {
            width: 100%;
            height: 100%;
            position: absolute;
          }

          .infoContainer {
            margin-left: 50%;
          }

          .infoBig {
            font-size: 1.6em;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 20px;
            color: black;
            box-shadow: 0px 0px 3px 0px;
          }

          .Left {
            margin: 40px 80px 400px 10px;
          }

          .Right {
            margin: 40px 10px 400px 80px;
          }

          @media (max-width: 1024px) {
            .infoBig {
              font-size: 1em;
            }
          }

          @media (max-width: 800px) {
            .infoContainer {
              margin-left: 0 !important;
            }
          }

          .language {
            cursor: pointer;
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 10px;
            color: white;
            font-size: 1em;
            background-color: rgba(0, 0, 0, 0.2);
          }

          .language:hover {
            background-color: rgba(0, 0, 0, 0.4);
          }

          .language:active {
            background-color: rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    lng: state.lng,
    language: state.language
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: bindActionCreators(setLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
