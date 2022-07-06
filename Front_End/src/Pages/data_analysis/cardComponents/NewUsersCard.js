import React from 'react'

const NewSnapShotCard = ({ handleUsersSubmit, setEmail, email, setFirstName, setLastName, firstName, lastName, selectedOptions, setSelectedOptions }) => {
    return (
        <main className='NewPost'>
            <h2>Add a User profile</h2>
            <form className='newPostForm' onSubmit={handleUsersSubmit}>
                <label htmlFor='firstname'>First Name:</label>
                <input
                    id="firstname"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='lastname'>Last Name:</label>
                <input
                    id="lastname"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor='email'>Email:</label>
                <input
                    id="email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='selectedOption'>Selected Options:</label>
                <input
                    id="selectedOption"
                    type="text"
                    required
                    value={selectedOptions}
                    onChange={(e) => setSelectedOptions(e.target.value)}
                />
                <button type="submit">Save Profile</button>
            </form>
        </main>
    )
}

export default NewSnapShotCard