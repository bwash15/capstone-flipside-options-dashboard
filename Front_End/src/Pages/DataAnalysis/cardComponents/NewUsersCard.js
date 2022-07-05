import React from 'react'

const NewSnapShotCard = ({ handleSnapShotSubmit, setEmail, email, setName, name }) => {
    return (
        <main className='NewPost'>
            <h2>New Card</h2>
            <form className='newPostForm' onSubmit={handleSnapShotSubmit}>
                <label htmlFor='username'>Name:</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='useremail'>Email:</label>
                <input
                    id="useremail"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewSnapShotCard