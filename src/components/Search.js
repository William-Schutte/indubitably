import React from 'react';
import { useForm } from "react-hook-form";

export default function Search(props) {

    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        props.handleSearch(data);
    }
    
    return (
        <section className="search">
            <div className="search__text">
                <label className="search__label" for="what">What</label>
                <input className="search__input" ref={register} name="what" placeholder="Job title, keywords, etc"></input>
            </div>
            <div className="search__text">
                <label className="search__label">Where</label>
                <input className="search__input" ref={register} name="where" placeholder="City, state, zip code, etc"></input>
            </div>
            <label className="search__toggle">
                <input className="search__toggle-input" ref={register} name="entry" type="checkbox" />
                <span className="search__toggle-text">Entry Level</span>
            </label>
            <label className="search__toggle">
                <input className="search__toggle-input" ref={register} name="newer" type="checkbox" />
                <span className="search__toggle-text">Newly Posted</span>
            </label>
            <button className="search__submit" onClick={handleSubmit(onSubmit)}>Find jobs</button>
        </section>
    );
}