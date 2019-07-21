import React, {useState, useEffect, useContext, useReducer, useCallback, useMemo} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../static/site.css";
import {Header} from "../src/Header";
import {Menu} from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import {ConfigContext} from "./App";
import speakerReducer from "./speakerReducer";
import useAxiosFetch from "./useAxiosFetch";
import axios from 'axios';

const Speakers = ({}) => {
    // Part 3:
    const {
        data,
        isLoading,
        hasErrored,
        errorMessage,
        updateDataRecord
    } = useAxiosFetch("http://localhost:4000/speakers", []);

    const [speakingSaturday, setSpeakingSaturday] = useState(true);
    const [speakingSunday, setSpeakingSunday] = useState(true);

    // // Part 1: Comment out the following. Will use useAxiosFetch.js instead.
    // const [speakerList, dispatch] = useReducer(speakerReducer, []);
    // const [isLoading, setIsLoading] = useState(true);

    const context = useContext(ConfigContext);

    // // Part 2: Comment out this too.
    // useEffect(() => {
    //     setIsLoading(true);
    //     new Promise(function (resolve) {
    //         setTimeout(function () {
    //             resolve();
    //         }, 1000);
    //     }).then(() => {
    //         setIsLoading(false);
    //         const speakerListServerFilter = SpeakerData.filter(({sat, sun}) => {
    //             return (speakingSaturday && sat) || (speakingSunday && sun);
    //         });
    //
    //         dispatch({
    //             type: "setSpeakerList",
    //             data: speakerListServerFilter
    //         })
    //     });
    //     return () => {
    //         console.log("cleanup");
    //     };
    // }, []); // [speakingSunday, speakingSaturday]);

    const handleChangeSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    };
    const handleChangeSunday = () => {
        setSpeakingSunday(!speakingSunday);
    };
    // Part B:
    // const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    const heartFavoriteHandler = useCallback((e, speakerRec) => {
        e.preventDefault();
        // const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
        //
        // dispatch({
        //     type: favoriteValue ? "favorite" : "unfavorite",
        //     sessionId
        // })

        const toggledRec = { ...speakerRec, favorite: !speakerRec.favorite };
        axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledRec)
            .then(function(response) {
                updateDataRecord(toggledRec);
            })
            .catch(function(error) {
                console.log(error);
            });

        //console.log("changing session favorte to " + favoriteValue);
    }, []);

    // Part 4
    // const newSpeakerList = useMemo(() => speakerList
    const newSpeakerList = useMemo(() => data
        .filter(
            ({sat, sun}) => (speakingSaturday && sat) || (speakingSunday && sun)
        )
        .sort(function (a, b) {
            if (a.firstName < b.firstName) {
                return -1;
            }
            if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        // }), [speakingSaturday, speakingSunday, speakerList]);
        }), [speakingSaturday, speakingSunday, data]);
    const speakerListFiltered = isLoading
        ? []
        : newSpeakerList;

    // Part 5:
    if (hasErrored)
        return (
            <div>
                {errorMessage}&nbsp;"Make sure you have launched "npm run json-server"
            </div>
        );

    if (isLoading) return <div>Loading...</div>;

    // {speakerListFiltered.map(
    //     ({id, firstName, lastName, bio, favorite}) => {
    //         return (
    //             <SpeakerDetail
    //                 key={id}
    //                 id={id}
    //                 favorite={favorite}
    //                 onHeartFavoriteHandler={heartFavoriteHandler}
    //                 firstName={firstName}
    //                 lastName={lastName}
    //                 bio={bio}
    //             />
    //         );
    //     }
    // )}
    // Part A: Now though, we want to update not only what is displayed on the page, but also the full speaker record
    // by posting that full speaker record to our REST server, which means we need the full speaker record passed up
    // from the speakerDetail component. Previously, we passed all the attributes into the speaker record in our
    // render section of Speakers.js, except for the Booleans sat and sun, which are the attributes that indicate
    // whether the particular speaker is speaking on Saturday, Sunday, or both. We just need to add these here so
    // the SpeakerDetail page has them and can return them back from the click event on the speaker favorite button.
    return (
        <div>
            <Header/>
            <Menu/>
            <div className="container">
                <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
                    {context.showSpeakerSpeakingDays &&
                        <div className="hide">
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={handleChangeSaturday}
                                        checked={speakingSaturday}
                                    />
                                    Saturday Speakers
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={handleChangeSunday}
                                        checked={speakingSunday}
                                    />
                                    Sunday Speakers
                                </label>
                            </div>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="card-deck">
                        {speakerListFiltered.map(
                            ({id, firstName, sat, sun, lastName, bio, favorite}) => {
                                return (
                                    <SpeakerDetail
                                        key={id}
                                        id={id}
                                        favorite={favorite}
                                        onHeartFavoriteHandler={heartFavoriteHandler}
                                        firstName={firstName}
                                        lastName={lastName}
                                        bio={bio}
                                        sat={sat}
                                        sun={sun}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Speakers;
