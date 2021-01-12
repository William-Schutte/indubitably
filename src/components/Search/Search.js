import React from 'react';
import { useForm } from "react-hook-form";
import './Search.css';

export default function Search({ handleSearch, loading }) {

    const { register, handleSubmit, reset } = useForm();

    function resetForm() {
        reset({ what: "", where: "", entry: false, newer: false });
    }

    function onSubmit(data) {
        if (data.what === "") {
            return
        } else {
            handleSearch(data);
            resetForm();
        }
    }
    
    return (
        <section className={`search ${loading && `search_inactive`}`}>
            <div className="search__text">
                <label className="search__label">What</label>
                <input className="search__input" ref={register({ required: true })} name="what" placeholder="Job title, keywords, etc" required disabled={loading}></input>
            </div>
            <div className="search__text">
                <label className={`search__label ${loading && `search__label_inactive`}`}>Where</label>
                <input className="search__input" ref={register} name="where" placeholder="City, state, zip code, etc" disabled={loading}></input>
            </div>
            <label className={`search__toggle ${loading && `search__toggle_inactive`}`}>
                <input className="search__toggle-input" ref={register} name="entry" type="checkbox" disabled={loading}/>
                <span className="search__toggle-text">Entry Level</span>
            </label>
            <label className={`search__toggle ${loading && `search__toggle_inactive`}`}>
                <input className="search__toggle-input" ref={register} name="newer" type="checkbox" disabled={loading}/>
                <span className="search__toggle-text">Newly Posted</span>
            </label>
            <button className={!loading ? "search__submit" : "search__submit_inactive"} onClick={handleSubmit(onSubmit)}>Find jobs</button>
        </section>
    );
}