import AnalysisListItem from './AnalysisListItem';

const AnalysisList = ({ posts, snapShots, users }) => {
    return (
        <ul>
            {posts.map(post => (
                <AnalysisListItem key={post.id} post={post} />
            ))}

        </ul>
    )
}

export default AnalysisList