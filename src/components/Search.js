import React from 'react';
import { useForm } from "react-hook-form";

export default function Search() {

    const {}
    function onSubmit(evt) {
        evt.preventDefault();
        console.log('Hi fam');
    
    }
    
    return (
        <section className="search">
            <div className="search__text">
                <label className="search__label" for="what">What</label>
                <input className="search__input" id="what" placeholder="Job title, keywords, etc"></input>
            </div>
            <div className="search__text">
                <label className="search__label">Where</label>
                <input className="search__input" placeholder="City, state, zip code, etc"></input>
            </div>
            <label className="search__toggle">
                <input className="search__toggle-input" type="checkbox" />
                <span className="search__toggle-text">Entry Level</span>
            </label>
            <label className="search__toggle">
                <input className="search__toggle-input" type="checkbox" />
                <span className="search__toggle-text">Newly Posted</span>
            </label>
            <button className="search__submit" onClick={onSubmit}>Find jobs</button>
        </section>
    );
}