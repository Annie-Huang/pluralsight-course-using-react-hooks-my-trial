import ImageToggleOnScroll from "./ImageToggleOnScroll";

const SpeakerDetail = ({
                           id,
                           firstName,
                           lastName,
                           favorite,
                           bio,
                           onHeartFavoriteHandler
                       }) => {

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
                            onHeartFavoriteHandler(e, !favorite);
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
};

export default SpeakerDetail;
