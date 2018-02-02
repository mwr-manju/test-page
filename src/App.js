import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SimpleLineChart extends React.Component{
  render() {
    let { data } = this.props;
    return (
      <LineChart width={300} height={200} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="1 1" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="QAC" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="QAA" stroke="#82ca9d" />
        <Line type="monotone" dataKey="QAH" stroke="#800000" />
      </LineChart>
    );
  }
};

class StackedBarChart extends React.Component{
  render() {
    const { data } = this.props;
    return (
      <BarChart width={300} height={200} data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="throughput" stackId="a" fill="#8884d8" />
        <Bar dataKey="latency" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState = () => {
    return {
      lineChartData: [
        { name: '12:10:00', QAA: 4000, QAC: 2400, QAH: 5800 },
        { name: '12:10:20', QAA: 3000, QAC: 1398, QAH: 2210 },
        { name: '12:10:30', QAA: 2000, QAC: 9800, QAH: 2548 },
        { name: '12:10:40', QAA: 2780, QAC: 3908, QAH: 2450 },
        { name: '12:10:50', QAA: 1890, QAC: 4800, QAH: 2181 },
        { name: '12:10:60', QAA: 2390, QAC: 3800, QAH: 7845 },
        { name: '12:11:00', QAA: 3490, QAC: 4300, QAH: 5846 },
      ],
      stackedChartData: [
        { name: 'QA-A', throughput: 4000, latency: 2400 },
        { name: 'QA-C', throughput: 3000, latency: 1398 },
        { name: 'QA-H', throughput: 2000, latency: 9800 },
      ],
      tableData: [
        { component: 'QA-A', data: '4500 MB' },
        { component: 'QA-C', data: '7500 MB' },
        { component: 'QA-H', data: '4000 MB' }
      ]
    };
  }

  render() {
    const { lineChartData, stackedChartData, tableData } = this.state;
    return (
      <div className="App">
        <p className="App-intro">
          <div>
            <button onClick={this._resetState}>Now</button>
            <button onClick={this._handleLastHour}>Last 1 hour</button>
          </div>
          <select>
            <option value="complete">Complete</option>
          </select>
          <div>Active QAs</div>
          <div className='qas'>
            <div className="highlight">A</div>
            <div>B</div>
            <div className="highlight">C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
            <div>G</div>
            <div className="highlight">H</div>
          </div>
          <div className="graph-container">
            <table className="summary">
              <tr>
                <th>Component</th>
                <th>Data transfer</th>
              </tr>
              <tbody>
                {
                  tableData.map((td) =>
                    <tr>
                      <td>{td.component}</td>
                      <td>{td.data}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <div>
              <div>Data transfer (MB)</div>
              <SimpleLineChart data={lineChartData}/>
            </div>
            <div>
              <div>Data throughput and latency</div>
              <StackedBarChart data={stackedChartData}/>
            </div>
          </div>
        </p>
      </div>
    );
  }

  _handleLastHour = () => {
    const { lineChartData, stackedChartData, tableData } = this.state;
    const updatedLineChartData = [
      { name: '11:11:20', QAA: 4490, QAC: 2500, QAH: 7600 },
      { name: '11:11:30', QAA: 5490, QAC: 8600, QAH: 5600 },
      ...lineChartData,
    ]

    const updatedStackedChartData = [
      { name: 'QA-A', QAA: 4490, QAC: 4300, QAH: 2250 },
      { name: 'QA-C', QAA: 1590, QAC: 8000, QAH: 4600 },
      { name: 'QA-H', QAA: 5490, QAC: 2300, QAH: 1600 },
    ];

    const updatedTableData = [
      { component: 'QA-A', data: '5500 MB' },
      { component: 'QA-C', data: '8500 MB' },
      { component: 'QA-H', data: '8000 MB' }
    ]
    this.setState({
      lineChartData: updatedLineChartData,
      stackedChartData: updatedStackedChartData,
      tableData: updatedTableData
    });
  }

  _resetState = () => {
    this.setState(this._getInitialState());
  }
}

export default App;
