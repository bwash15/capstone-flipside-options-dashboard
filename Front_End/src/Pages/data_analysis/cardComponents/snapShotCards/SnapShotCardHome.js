import SnapShotCardFeed from "./SnapShotFeed"

const SnapShotCardHome = ({ snapShots }) => {
    return (
        <main className="Home">
            {snapShots.length ? (
                <SnapShotCardFeed
                    snapShots={snapShots}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No SnapShots to display
                </p>
            )}
        </main>
    )
}

export default SnapShotCardHome