import React from 'react';
// import { createStore } from 'redux';
// import allReducers from '../../reducers';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/api';
import ResultBlock from '../../utils/resultBlock';
import Footer from '../Footer/Footer';
import './App.css'

import { coolList } from '../../utils/selectcities';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            activeJobs: [],
            resultBlocks: [],
            loading: false,
            citiesData: coolList,
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getJobMainCity = this.getJobMainCity.bind(this);
        this.createJobBlock = this.createJobBlock.bind(this);
        this.handleSortData = this.handleSortData.bind(this);
        this.handleResetData = this.handleResetData.bind(this);
    }

    handleSearch(data) {
        this.setState({ loading: true });
        console.time("Req Start");

        api.searchJobs(data)
            .then((res) => {
                console.log('Search Status:', res.searchStatus);
                

                if (res.searchStatus === 'Search Successful') {
                    this.createJobBlock({ formData: data, jobCount: res.jobCount, searchResults: res.data });
                }

                console.timeEnd("Req Start");
                this.setState({ loading: false });
                // const blockId = res.jobId;
                // api.getSearchedJobs(blockId)
                //     .then((res) => {
                //         console.log(res.searchStatus);
                //         this.setState({ loading: false });
                //         // this.createJobBlock({ formData: data, res, blockId });
                //     })
            });
    }

    getJobMainCity(coords) {
        // Take a job and its coords [City, ST, Lat, Long]
        let jobLat = coords[0];
        let jobLong = coords[1];

        // Compare to each coolCity [City, ST, Lat, Long, Radius]
        // for (let i = 0; i < coolList.length; i++) {
        //     let cityLat = coolList[i][2];
        //     let cityLong = coolList[i][3];
        //     let r = coolList[i][4] / 60;
        //     let deltaLat = Math.abs(jobLat - cityLat);
        //     let deltaLong = Math.abs(jobLong - cityLong);

        //     if ((deltaLat < r) && (deltaLong < r)) {
        //         if (Math.sqrt(deltaLat * deltaLat + deltaLong * deltaLong) < (r * r)) {
        //             // If the city 
        //             let newCityCount = this.state.citiesData;
        //             newCityCount[i][5].count += 1;
        //             this.setState({ citiesData: newCityCount });

        //             return coolList[i].slice(0, 4);
        //         }
        //     }
        // }

        // return coords;
    }

    createJobBlock({ formData, jobCount, searchResults }) {
        const newJobs = searchResults;
        // const newJobs = searchResults.map(job => {
        //     if (job.jobLocation.length === 5) {
        //         // job.coords = this.getJobMainCity([job.jobLocation[2], job.jobLocation[3]]);
        //     } else {
        //     }
        //     return job;
        // });

        console.log(formData)
        const newBlock = new ResultBlock({
            formData,
            total: jobCount,
            jobs: newJobs,
        });

        this.setState({
            activeJobs: [...newBlock.allJobsData, ...this.state.activeJobs],
            resultBlocks: [newBlock, ...this.state.resultBlocks],
            loading: false
        });
    }

    handleSortData(sortType) {
        switch (sortType) {
            case "location": {
                const locSortJobs = this.state.activeJobs.sort((i, j) => {
                    const iState = i[sortType].slice(-2);
                    const jState = j[sortType].slice(-2);
                    if (iState < jState) {
                        return -1;
                    } else if (iState > jState) {
                        return 1;
                    } else {
                        if (i[sortType] < j[sortType]) {
                            return -1;
                        } else if (i[sortType] > j[sortType]) {
                            return 1;
                        }
                        return 0;
                    }
                });
                this.setState({ activeJobs: locSortJobs })
                break;
            }

            case "title": {
                const newActiveJobs = this.state.activeJobs.sort((i, j) => {
                    if (i[sortType] < j[sortType]) {
                        return -1;
                    } else if (i[sortType] > j[sortType]) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                this.setState({ activeJobs: newActiveJobs })
                break;
            }

            case "salary": {
                const newActiveJobs = this.state.activeJobs.sort((i, j) => {
                    if (i[sortType] > j[sortType]) {
                        return -1;
                    } else if (i[sortType] < j[sortType]) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                this.setState({ activeJobs: newActiveJobs })
                break;
            }
            default: { }
        }
    }

    handleResetData() {
        this.setState({ activeJobs: [], resultBlocks: [] })
    }

    render() {
        return (
            <div className="app">
                <Header resetData={this.handleResetData} />
                <Main
                    handleSearch={this.handleSearch}
                    handleSortData={this.handleSortData}
                    activeJobs={this.state.activeJobs}
                    citiesJobs={this.state.citiesData}
                    results={this.state.resultBlocks}
                    loading={this.state.loading} />
                <Footer />
            </div>
        );
    }
}

export default App;
