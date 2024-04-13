import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Coins.css';

export default class Coins extends Component {
  state = { loading: true }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let response;
    try {
      const base_url = 'https://api.hybrix.io/source/valuations/rate/smly/usd';
      response = await fetch(base_url);
      const result = await response.json();
      const proc_data = result.data;
      const proc_url = 'https://api.hybrix.io/proc/'+proc_data;
      response = await fetch(proc_url);
      const proc_result = await response.json();
      const value = {'USD': Math.round(proc_result.data*100000000)/100000000};
      this.setState({ loading: false, data: value})
    } catch (error) {
      console.log('Error fetching', error)
      this.setState({ error: true, loading: false })
    }
  }

  render() {
    const { listOpen } = this.state;
    const { data, loading, error } = this.state;

    if (loading) {
      return (<div>Loading</div>);
    }

    // if (error || !data) {}


    return (
      <div className="header__coins">
          {data && (
            <ul className="header__coins">
              <li className="header__coin">
                <p className="header__coin__title">SMLY/USD</p>
                <p>{data.USD} USD</p>
              </li>
              <li className="header__coin">
                <p className="header__coin__title">SMLY/BTC</p>
                <p>{data.BTC} BTC</p>
              </li>
              <li className="header__coin">
                <p className="header__coin__title">SMLY/DOGE</p>
                <p>{data.DOGE} DOGE</p>
              </li>
            </ul>
          )}
          </div>
    )
  }
}
