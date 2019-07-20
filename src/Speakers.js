import React, {useState, useEffect, useContext, useReducer} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../static/site.css";
import {Header} from "../src/Header";
import {Menu} from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import {ConfigContext} from "./App";

const Speakers = ({}) => {
    const [speakingSaturday, setSpeakingSaturday] = useState(true);
    const [speakingSunday, setSpeakingSunday] = useState(true);

    // const [speakerList, setSpeakerList] = useState([]);

    // 1: The blow is exactly the same as above...
    // const [speakerList, setSpeakerList] = useReducer((state,action) => action, []);

    // // 2: Change "(state, action) => action" to...
    // function speakerReducer(state, action) {
    //     return action;
    // }
    // const [speakerList, setSpeakerList] = useReducer(speakerReducer, []);

    // 3: Further change to a reducer like logic...
    //    You can think of this as useState is just useReducer with only a default action type.
    function speakerReducer(state, action) {
        // action has:
        // {
        //     type:
        //     data:
        //     sessionId
        // }


        // inner function??? =|
        function updateFavorite(favoriteValue) {
            return state.map((item, index) => {
                if (item.id === action.sessionId) {
                    item.favorite = favoriteValue;
                    return item;
                }
                return item;
            });
        }
        switch (action.type) {
            case "setSpeakerList": {
                return action.data;
            }
            case "favorite": {
                return updateFavorite(true);
            }
            case "unfavorite": {
                return updateFavorite(false);
            }
            default:
                return state;
        }
        // return action;
    }
    const [speakerList, dispatch] = useReducer(speakerReducer, []);


    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(ConfigContext);

    useEffect(() => {
        setIsLoading(true);
        new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 1000);
        }).then(() => {
            setIsLoading(false);
            const speakerListServerFilter = SpeakerData.filter(({sat, sun}) => {
                return (speakingSaturday && sat) || (speakingSunday && sun);
            });

            // setSpeakerList(speakerListServerFilter);
            // 4: switch to dispatch - part 1
            dispatch({
                type: "setSpeakerList",
                data: speakerListServerFilter
            })
        });
        return () => {
            console.log("cleanup");
        };
    }, []); // [speakingSunday, speakingSaturday]);

    const handleChangeSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    };

    const speakerListFiltered = isLoading
        ? []
        : speakerList
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
            });

    const handleChangeSunday = () => {
        setSpeakingSunday(!speakingSunday);
    };

    const heartFavoriteHandler = (e, favoriteValue) => {
        e.preventDefault();
        const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
        // setSpeakerList(speakerList.map(item => {
        //     if (item.id === sessionId) {
        //         item.favorite = favoriteValue;
        //         return item;
        //     }
        //     return item;
        // }));
        // 5: switch to dispatch - part 2
        dispatch({
            type: favoriteValue ? "favorite" : "unfavorite",
            sessionId
        })

        //console.log("changing session favorte to " + favoriteValue);
    };

    if (isLoading) return <div>Loading...</div>;

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
                            ({id, firstName, lastName, bio, favorite}) => {
                                return (
                                    <SpeakerDetail
                                        key={id}
                                        id={id}
                                        favorite={favorite}
                                        onHeartFavoriteHandler={heartFavoriteHandler}
                                        firstName={firstName}
                                        lastName={lastName}
                                        bio={bio}
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
