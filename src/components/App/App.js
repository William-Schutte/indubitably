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
            citiesData: {},
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getCitiesData = this.getCitiesData.bind(this);
        this.createJobBlock = this.createJobBlock.bind(this);
        this.handleSortData = this.handleSortData.bind(this);
        this.handleResetData = this.handleResetData.bind(this);
        this.handleResultBlockToggle = this.handleResultBlockToggle.bind(this);
        this.handleResultBlockSelect = this.handleResultBlockSelect.bind(this);
        this.handleDBSearch = this.handleDBSearch.bind(this);
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

    handleDBSearch() {
        api.searchDb()
            .then((res) => {
                console.log('Search Status:', res.searchStatus);
                const formData = { what: 'All DB', where: 'All DB' };
                this.createJobBlock({ formData, jobCount: res.data.length, searchResults: res.data });
            })
    }

    getCitiesData(jobs) {
        const newCities = Array(coolList.length).fill(0);
        for (const job of jobs) {
            // Take a job and its coords
            const jobLong = job.jobLocation.longitude;
            const jobLat = job.jobLocation.latitude;
            // Compare to each coolCity [City, ST, Lat, Long, Radius]
            for (let i = 0; i < coolList.length; i++) {
                if (job.jobLocation.city === coolList[i].city && job.jobLocation.state === coolList[i].state) {
                    newCities[i] += 1;
                    continue;
                }
                const cityLat = coolList[i]['latitude'];
                const cityLong = coolList[i]['lonigtude'];
                const r = coolList[i]['r'] / 60;
                const deltaLat = Math.abs(jobLat - cityLat);
                const deltaLong = Math.abs(jobLong - cityLong);

                if ((deltaLat < r) && (deltaLong < r)) {
                    if (Math.sqrt(deltaLat * deltaLat + deltaLong * deltaLong) < (r * r)) {
                        // If the job city is within cool city radius
                        newCities[i] += 1;
                    }
                }
            }
        }

        for (let i = 0; i < newCities.length; i++) {
            coolList[i].count = newCities[i];
        }
        this.setState({ citiesData: coolList });
    }

    createJobBlock({ formData, jobCount, searchResults }) {
        const newJobs = searchResults;

        // console.log(formData)
        const newBlock = new ResultBlock({
            formData,
            total: jobCount,
            jobs: newJobs,
        });

        const newActiveJobs = [...newBlock.allJobsData, ...this.state.activeJobs];
        this.getCitiesData(newActiveJobs);
        this.setState({
            activeJobs: newActiveJobs,
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
        this.setState({ activeJobs: [], resultBlocks: [], citiesData: {} });
    }

    setNewJobsStateFromResultBlocks(resBlocks) {
        const newJobsList = [];
        for (const res of resBlocks) {
            if (res.isActive()) {
                newJobsList.push(...res.allJobsData);
            }
        }
        this.getCitiesData(newJobsList);
        this.setState({ activeJobs: newJobsList });
    }

    handleResultBlockToggle(state, id) {
        const resultBlockToToggle = this.state.resultBlocks[id];
        resultBlockToToggle.setActive(state);
        const newResultBlocks = this.state.resultBlocks.map((item, i) => {
            return i === id ? resultBlockToToggle : item;
        });

        console.log(newResultBlocks);
        this.setNewJobsStateFromResultBlocks(newResultBlocks);
        this.setState({ resultBlocks: newResultBlocks });
    }

    handleResultBlockSelect(state, id) {
        const resultBlockToSelect = this.state.resultBlocks[id];
        resultBlockToSelect.setSelected(state);
        const newResultBlocks = this.state.resultBlocks.map((item, i) => {
            return i === id ? resultBlockToSelect : item;
        });
        this.setState({ resultBlock: newResultBlocks });
    }

    render() {
        return (
            <div className="app">
                <Header resetData={this.handleResetData} />
                <Main
                    handleSearch={this.handleSearch}
                    handleDBSearch={this.handleDBSearch}
                    handleSortData={this.handleSortData}
                    handleResultBlockToggle={this.handleResultBlockToggle}
                    handleResultBlockSelect={this.handleResultBlockSelect}
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
