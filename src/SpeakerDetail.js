import ImageToggleOnScroll from "./ImageToggleOnScroll";

// C: Solution - When we define our speaker detail for export, we wrap our functional component in React.memo,
// and now that returns a cache, or a memoized version of our SpeakerDetail component to the calling component.
// Now browsing to the page again, favoring a speaker, look at that, only one speaker detail is rendered.
// const SpeakerDetail = ({
const SpeakerDetail = React.memo(
    // ({id, firstName, lastName, favorite, bio, onHeartFavoriteHandler }) => {
    ({id, firstName, lastName, sat, sun, favorite, bio, onHeartFavoriteHandler }) => {

    // Turns out our React program behind the scenes is not just updating the heart on our speaker image,
    // but turns out it's rerendering all speaker images, including all hearts, light and dark.
    console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);

    return (
        <div className="card col-4 cardmin">
            <ImageToggleOnScroll
                className="card-img-top"
                primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
                secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
                alt="{firstName} {lastName}"
            />
            <div className="card-body">
                <h4 className="card-title">
                    <button
                        data-sessionid={id}
                        className={favorite ? "heartredbutton" : "heartdarkbutton"}
                        onClick={e => {
                            // onHeartFavoriteHandler(e, !favorite);
                            onHeartFavoriteHandler(e, {
                                id,
                                firstName,
                                lastName,
                                favorite,
                                bio,
                                sat,
                                sun
                            });
                        }}
                    />
                    <span>
            {firstName} {lastName}
          </span>
                </h4>

                <span>{bio}</span>
            </div>
        </div>
    );
//};
});

export default SpeakerDetail;
