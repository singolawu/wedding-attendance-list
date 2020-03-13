import React, { Component } from 'react';
import Firebase from 'firebase';
import config from './config';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Firebase.initializeApp(config);
    this.getData()
  }

  getData = () => {
    let ref = Firebase.database().ref('/wedding-attendance');
    ref.on('value', snapshot => {
      const state = this.snapshotToArray(snapshot)
      console.log({ state })
      this.setState({
        data: state
      })
    });

  }

  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };

  transitionChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  indexChanged = index => {
    this.setState({ index });
  }

  render() {
    return (
      <div className="App">
        <table style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
          <thead style={{ textAlign: 'center' }}>
            <tr style={{ width: '100%'}}>
              <th colSpan={3}>
                Daftar Hadir Pernikahan
              </th>
            </tr>
            <tr>
              <th style={{ width: '20%' }}>
                Nama
              </th>
              <th style={{ width: '60%' }}>
                Ucapan/Doa
              </th>
              <th style={{ width: '20%' }}>
                Kehadiran
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) =>
              < tr >
                <td>
                  <text>
                    {item.name}
                  </text>
                </td>
                <td>
                  <text>
                    {item.words}
                  </text>
                </td>
                <td>
                  <text>
                    {item.attendance}
                  </text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );

  }

}

export default App;
