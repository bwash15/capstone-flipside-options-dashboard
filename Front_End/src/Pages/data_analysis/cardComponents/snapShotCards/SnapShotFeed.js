import SnapShotsCard from "./SnapShotCard";

const SnapShotFeed = ({ snapShots }) => {
    return (
        <>
            {snapShots.map(snapShot => (
                <SnapShotsCard key={snapShot.request_id} snapShot={snapShot} />
            ))}
        </>
    )
}

export default SnapShotFeed